/**
 * WAVE Protocol Tests
 */

import { describe, test, expect } from 'vitest';
import {
  WAVE_CHARS,
  WAVE_OUTPUT_COUNT,
  WaveLimits,
  WaveProtocols,
  WaveSchema,
  charToIndex,
  indexToChar,
  charToOutputIndex,
  outputIndexToChar,
  validateWaveName,
  validateDomain,
  isPunycode,
  parseLabels,
  joinLabels,
  createWaveMetadata,
  createZoneUpdate,
  getCharacterPath,
  estimateResolutionSize,
} from '../src/wave';
import { GlyphProtocol } from '../src/glyph';

describe('WAVE Constants', () => {
  test('WAVE_CHARS has 37 characters', () => {
    expect(WAVE_CHARS.length).toBe(37);
    expect(WAVE_CHARS).toBe('abcdefghijklmnopqrstuvwxyz0123456789-');
  });

  test('WAVE_OUTPUT_COUNT is 38', () => {
    expect(WAVE_OUTPUT_COUNT).toBe(38);
  });

  test('WaveLimits are defined', () => {
    expect(WaveLimits.MIN_NAME_LENGTH).toBe(1);
    expect(WaveLimits.MAX_NAME_LENGTH).toBe(63);
    expect(WaveLimits.CHAR_COUNT).toBe(37);
  });

  test('WaveProtocols include correct protocol IDs', () => {
    expect(WaveProtocols.WAVE_NAME).toContain(GlyphProtocol.GLYPH_NFT);
    expect(WaveProtocols.WAVE_NAME).toContain(GlyphProtocol.GLYPH_MUT);
    expect(WaveProtocols.WAVE_NAME).toContain(GlyphProtocol.GLYPH_WAVE);
  });

  test('WaveSchema has correct values', () => {
    expect(WaveSchema.NAMESPACE).toBe('rxd.wave');
    expect(WaveSchema.VERSION).toBe('wave_name_v1');
    expect(WaveSchema.TYPE).toBe('wave_name');
  });
});

describe('Character Conversion', () => {
  test('charToIndex returns correct indices', () => {
    expect(charToIndex('a')).toBe(0);
    expect(charToIndex('z')).toBe(25);
    expect(charToIndex('0')).toBe(26);
    expect(charToIndex('9')).toBe(35);
    expect(charToIndex('-')).toBe(36);
  });

  test('charToIndex is case-insensitive', () => {
    expect(charToIndex('A')).toBe(0);
    expect(charToIndex('Z')).toBe(25);
  });

  test('charToIndex throws for invalid characters', () => {
    expect(() => charToIndex('!')).toThrow('Invalid WAVE character');
    expect(() => charToIndex(' ')).toThrow('Invalid WAVE character');
    expect(() => charToIndex('_')).toThrow('Invalid WAVE character');
  });

  test('charToIndex throws for multi-character input', () => {
    expect(() => charToIndex('ab')).toThrow('Expected single character');
  });

  test('indexToChar returns correct characters', () => {
    expect(indexToChar(0)).toBe('a');
    expect(indexToChar(25)).toBe('z');
    expect(indexToChar(26)).toBe('0');
    expect(indexToChar(35)).toBe('9');
    expect(indexToChar(36)).toBe('-');
  });

  test('indexToChar throws for invalid indices', () => {
    expect(() => indexToChar(-1)).toThrow('Invalid WAVE index');
    expect(() => indexToChar(37)).toThrow('Invalid WAVE index');
  });

  test('charToOutputIndex returns index + 1', () => {
    expect(charToOutputIndex('a')).toBe(1);
    expect(charToOutputIndex('-')).toBe(37);
  });

  test('outputIndexToChar is inverse of charToOutputIndex', () => {
    for (let i = 1; i <= 37; i++) {
      const char = outputIndexToChar(i);
      expect(charToOutputIndex(char)).toBe(i);
    }
  });

  test('outputIndexToChar throws for invalid indices', () => {
    expect(() => outputIndexToChar(0)).toThrow('Invalid branch output index');
    expect(() => outputIndexToChar(38)).toThrow('Invalid branch output index');
  });
});

describe('Name Validation', () => {
  test('valid names pass validation', () => {
    expect(validateWaveName('alice').valid).toBe(true);
    expect(validateWaveName('bob123').valid).toBe(true);
    expect(validateWaveName('my-name').valid).toBe(true);
    expect(validateWaveName('a').valid).toBe(true);
    expect(validateWaveName('0').valid).toBe(true);
  });

  test('empty name fails', () => {
    const result = validateWaveName('');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('empty');
  });

  test('name starting with hyphen fails', () => {
    const result = validateWaveName('-alice');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('start with hyphen');
  });

  test('name ending with hyphen fails', () => {
    const result = validateWaveName('alice-');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('end with hyphen');
  });

  test('consecutive hyphens fail (except Punycode)', () => {
    const result = validateWaveName('al--ice');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('consecutive hyphens');
  });

  test('Punycode names with -- are valid', () => {
    expect(validateWaveName('xn--wgv71a').valid).toBe(true);
  });

  test('invalid characters fail', () => {
    const result = validateWaveName('alice!');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Invalid character');
  });

  test('name exceeding max length fails', () => {
    const longName = 'a'.repeat(64);
    const result = validateWaveName(longName);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('exceeds maximum length');
  });

  test('max length name is valid', () => {
    const maxName = 'a'.repeat(63);
    expect(validateWaveName(maxName).valid).toBe(true);
  });
});

describe('Domain Validation', () => {
  test('simple domains pass', () => {
    expect(validateDomain('alice').valid).toBe(true);
    expect(validateDomain('mail.alice').valid).toBe(true);
    expect(validateDomain('dev.mail.alice').valid).toBe(true);
  });

  test('empty domain fails', () => {
    const result = validateDomain('');
    expect(result.valid).toBe(false);
  });

  test('domain with invalid label fails', () => {
    const result = validateDomain('-alice.bob');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Invalid label');
  });
});

describe('Label Parsing', () => {
  test('parseLabels splits correctly', () => {
    expect(parseLabels('alice')).toEqual(['alice']);
    expect(parseLabels('mail.alice')).toEqual(['mail', 'alice']);
    expect(parseLabels('a.b.c')).toEqual(['a', 'b', 'c']);
  });

  test('parseLabels handles empty parts', () => {
    expect(parseLabels('')).toEqual([]);
    expect(parseLabels('.')).toEqual([]);
    expect(parseLabels('a..b')).toEqual(['a', 'b']);
  });

  test('joinLabels joins correctly', () => {
    expect(joinLabels(['alice'])).toBe('alice');
    expect(joinLabels(['mail', 'alice'])).toBe('mail.alice');
  });
});

describe('Punycode Detection', () => {
  test('isPunycode detects Punycode names', () => {
    expect(isPunycode('xn--wgv71a')).toBe(true);
    expect(isPunycode('XN--WGV71A')).toBe(true);
  });

  test('isPunycode returns false for normal names', () => {
    expect(isPunycode('alice')).toBe(false);
    expect(isPunycode('xn-test')).toBe(false);
  });
});

describe('Metadata Creation', () => {
  test('createWaveMetadata creates valid structure', () => {
    const metadata = createWaveMetadata('alice', null, { address: '1Alice...' });

    expect(metadata.v).toBe(2);
    expect(metadata.type).toBe('wave_name');
    expect(metadata.p).toEqual([2, 5, 11]); // NFT, MUT, WAVE
    expect(metadata.name).toBe('alice');
    expect(metadata.app.namespace).toBe('rxd.wave');
    expect(metadata.app.data.name).toBe('alice');
    expect(metadata.app.data.parent).toBeNull();
    expect(metadata.app.data.zone.address).toBe('1Alice...');
  });

  test('createWaveMetadata with parent', () => {
    const metadata = createWaveMetadata('mail', 'parent-ref', {});
    expect(metadata.app.data.parent).toBe('parent-ref');
  });

  test('createWaveMetadata with description', () => {
    const metadata = createWaveMetadata('alice', null, {}, { description: 'My name' });
    expect(metadata.desc).toBe('My name');
  });

  test('createWaveMetadata immutable version', () => {
    const metadata = createWaveMetadata('alice', null, {}, { mutable: false });
    expect(metadata.p).toEqual([2, 11]); // NFT, WAVE (no MUT)
    expect(metadata.mutable).toBeUndefined();
  });

  test('createWaveMetadata throws for invalid name', () => {
    expect(() => createWaveMetadata('-invalid', null, {})).toThrow('Invalid name');
  });
});

describe('Zone Update', () => {
  test('createZoneUpdate creates valid structure', () => {
    const update = createZoneUpdate('claim-ref', { address: 'new-address' }, 'controller-ref');

    expect(update).toEqual({
      v: 2,
      schema: 'glyph_update_v1',
      target: 'claim-ref',
      update: {
        op: 'merge',
        path: '/app/data/zone',
        value: { address: 'new-address' },
      },
      auth: {
        controller: 'controller-ref',
      },
    });
  });
});

describe('Character Path', () => {
  test('getCharacterPath returns correct path for "alice"', () => {
    const path = getCharacterPath('alice');

    expect(path).toHaveLength(5);
    expect(path[0]).toEqual({ char: 'a', index: 0, outputIndex: 1 });
    expect(path[1]).toEqual({ char: 'l', index: 11, outputIndex: 12 });
    expect(path[2]).toEqual({ char: 'i', index: 8, outputIndex: 9 });
    expect(path[3]).toEqual({ char: 'c', index: 2, outputIndex: 3 });
    expect(path[4]).toEqual({ char: 'e', index: 4, outputIndex: 5 });
  });

  test('getCharacterPath normalizes to lowercase', () => {
    const path = getCharacterPath('ALICE');
    expect(path[0].char).toBe('a');
  });

  test('getCharacterPath throws for invalid name', () => {
    expect(() => getCharacterPath('-invalid')).toThrow();
  });
});

describe('Resolution Size Estimation', () => {
  test('estimateResolutionSize calculates correctly', () => {
    // 5-char name + 1 claim = 6 transactions * 1024 bytes = 6144
    expect(estimateResolutionSize('alice')).toBe(6144);
  });

  test('estimateResolutionSize includes updates', () => {
    // 6 transactions + 10 updates * 500 bytes
    expect(estimateResolutionSize('alice', 10)).toBe(6144 + 5000);
  });
});
