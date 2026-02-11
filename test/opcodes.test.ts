/**
 * Opcodes Tests — V2 Hard Fork opcode additions
 */

import { describe, it, expect } from 'vitest';
import {
  Opcodes,
  OpcodeNames,
  getOpcodeName,
  isRadiantOpcode,
  isReenabledOpcode,
} from '../src/opcodes';

describe('V2 Hard Fork Opcodes', () => {
  describe('OP_BLAKE3', () => {
    it('should have value 0xee (238)', () => {
      expect(Opcodes.OP_BLAKE3).toBe(0xee);
      expect(Opcodes.OP_BLAKE3).toBe(238);
    });

    it('should be recognized as a Radiant opcode', () => {
      expect(isRadiantOpcode(Opcodes.OP_BLAKE3)).toBe(true);
    });

    it('should have correct name mapping', () => {
      expect(getOpcodeName(0xee)).toBe('OP_BLAKE3');
      expect(OpcodeNames[0xee]).toBe('OP_BLAKE3');
    });
  });

  describe('OP_K12', () => {
    it('should have value 0xef (239)', () => {
      expect(Opcodes.OP_K12).toBe(0xef);
      expect(Opcodes.OP_K12).toBe(239);
    });

    it('should be recognized as a Radiant opcode', () => {
      expect(isRadiantOpcode(Opcodes.OP_K12)).toBe(true);
    });

    it('should have correct name mapping', () => {
      expect(getOpcodeName(0xef)).toBe('OP_K12');
      expect(OpcodeNames[0xef]).toBe('OP_K12');
    });
  });

  describe('OP_LSHIFT / OP_RSHIFT', () => {
    it('should have correct values', () => {
      expect(Opcodes.OP_LSHIFT).toBe(0x98);
      expect(Opcodes.OP_RSHIFT).toBe(0x99);
    });

    it('should be recognized as re-enabled opcodes', () => {
      expect(isReenabledOpcode(Opcodes.OP_LSHIFT)).toBe(true);
      expect(isReenabledOpcode(Opcodes.OP_RSHIFT)).toBe(true);
    });
  });

  describe('Opcode ordering', () => {
    it('OP_BLAKE3 should follow OP_PUSH_TX_STATE', () => {
      expect(Opcodes.OP_BLAKE3).toBe(Opcodes.OP_PUSH_TX_STATE + 1);
    });

    it('OP_K12 should follow OP_BLAKE3', () => {
      expect(Opcodes.OP_K12).toBe(Opcodes.OP_BLAKE3 + 1);
    });

    it('OP_K12 should be the last valid Radiant opcode before 0xf0', () => {
      expect(Opcodes.OP_K12).toBe(0xef);
      // 0xf0-0xfe are reserved for future use
    });
  });

  describe('Reverse mapping completeness', () => {
    it('should map all V2 opcodes to names', () => {
      expect(OpcodeNames[0xee]).toBeDefined();
      expect(OpcodeNames[0xef]).toBeDefined();
    });

    it('should return UNKNOWN for undefined opcodes', () => {
      expect(getOpcodeName(0xf0)).toContain('UNKNOWN');
      expect(getOpcodeName(0xfe)).toContain('UNKNOWN');
    });
  });

  describe('isRadiantOpcode range', () => {
    it('should include the full Radiant opcode range 0xbd-0xef', () => {
      for (let op = 0xbd; op <= 0xef; op++) {
        expect(isRadiantOpcode(op)).toBe(true);
      }
    });

    it('should exclude opcodes above 0xef (except special cases)', () => {
      expect(isRadiantOpcode(0xf0)).toBe(false);
      expect(isRadiantOpcode(0xfe)).toBe(false);
    });

    it('should include BCH-derived opcodes', () => {
      expect(isRadiantOpcode(Opcodes.OP_CHECKDATASIG)).toBe(true);
      expect(isRadiantOpcode(Opcodes.OP_CHECKDATASIGVERIFY)).toBe(true);
      expect(isRadiantOpcode(Opcodes.OP_REVERSEBYTES)).toBe(true);
    });
  });
});
