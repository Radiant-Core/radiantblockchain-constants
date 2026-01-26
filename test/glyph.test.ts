import { describe, it, expect } from 'vitest';
import {
  GLYPH_MAGIC,
  GlyphVersion,
  GlyphProtocol,
  getProtocolName,
  PROTOCOL_REQUIREMENTS,
  PROTOCOL_EXCLUSIONS,
  PROTOCOLS_REQUIRE_BASE,
  validateProtocols,
  DmintAlgorithm,
  DaaMode,
  GlyphLimits,
  EnvelopeFlags,
  ContainerType,
  AuthorityType,
  UpdateOperation,
  StorageType,
  EncryptionAlgorithm,
  EncryptionMinimums,
  RecommendedMinDifficulty,
  PROTOCOL_REPS,
  GlyphDefaults,
} from '../src/glyph';

describe('Glyph v2 Constants', () => {
  describe('GLYPH_MAGIC', () => {
    it('should have ASCII representation as "gly"', () => {
      expect(GLYPH_MAGIC.ASCII).toBe('gly');
    });

    it('should have correct hex representation', () => {
      expect(GLYPH_MAGIC.HEX).toBe('676c79');
    });

    it('should have correct bytes', () => {
      expect(GLYPH_MAGIC.BYTES).toEqual(new Uint8Array([0x67, 0x6c, 0x79]));
    });
  });

  describe('GlyphVersion', () => {
    it('should have correct version values', () => {
      expect(GlyphVersion.V1).toBe(0x01);
      expect(GlyphVersion.V2).toBe(0x02);
    });
  });

  describe('GlyphProtocol', () => {
    it('should have all 11 protocol IDs', () => {
      expect(GlyphProtocol.GLYPH_FT).toBe(1);
      expect(GlyphProtocol.GLYPH_NFT).toBe(2);
      expect(GlyphProtocol.GLYPH_DAT).toBe(3);
      expect(GlyphProtocol.GLYPH_DMINT).toBe(4);
      expect(GlyphProtocol.GLYPH_MUT).toBe(5);
      expect(GlyphProtocol.GLYPH_BURN).toBe(6);
      expect(GlyphProtocol.GLYPH_CONTAINER).toBe(7);
      expect(GlyphProtocol.GLYPH_ENCRYPTED).toBe(8);
      expect(GlyphProtocol.GLYPH_TIMELOCK).toBe(9);
      expect(GlyphProtocol.GLYPH_AUTHORITY).toBe(10);
      expect(GlyphProtocol.GLYPH_WAVE).toBe(11);
    });

    it('should have sequential IDs from 1 to 11', () => {
      const values = Object.values(GlyphProtocol);
      expect(values).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });
  });

  describe('getProtocolName', () => {
    it('should return key names for all protocols', () => {
      expect(getProtocolName(1)).toBe('GLYPH_FT');
      expect(getProtocolName(2)).toBe('GLYPH_NFT');
      expect(getProtocolName(3)).toBe('GLYPH_DAT');
      expect(getProtocolName(4)).toBe('GLYPH_DMINT');
      expect(getProtocolName(5)).toBe('GLYPH_MUT');
      expect(getProtocolName(6)).toBe('GLYPH_BURN');
      expect(getProtocolName(7)).toBe('GLYPH_CONTAINER');
      expect(getProtocolName(8)).toBe('GLYPH_ENCRYPTED');
      expect(getProtocolName(9)).toBe('GLYPH_TIMELOCK');
      expect(getProtocolName(10)).toBe('GLYPH_AUTHORITY');
      expect(getProtocolName(11)).toBe('GLYPH_WAVE');
    });

    it('should return undefined for invalid protocol ID', () => {
      expect(getProtocolName(0)).toBeUndefined();
      expect(getProtocolName(12)).toBeUndefined();
      expect(getProtocolName(-1)).toBeUndefined();
    });
  });

  describe('DmintAlgorithm', () => {
    it('should have all algorithm IDs starting from 0', () => {
      expect(DmintAlgorithm.SHA256D).toBe(0x00);
      expect(DmintAlgorithm.BLAKE3).toBe(0x01);
      expect(DmintAlgorithm.K12).toBe(0x02);
      expect(DmintAlgorithm.ARGON2ID_LIGHT).toBe(0x03);
      expect(DmintAlgorithm.RANDOMX_LIGHT).toBe(0x04);
    });
  });

  describe('DaaMode', () => {
    it('should have all DAA mode IDs', () => {
      expect(DaaMode.FIXED).toBe(0x00);
      expect(DaaMode.EPOCH).toBe(0x01);
      expect(DaaMode.ASERT).toBe(0x02);
      expect(DaaMode.LWMA).toBe(0x03);
      expect(DaaMode.SCHEDULE).toBe(0x04);
    });
  });

  describe('GlyphLimits', () => {
    it('should have size limits', () => {
      expect(GlyphLimits.MAX_NAME_SIZE).toBe(256);
      expect(GlyphLimits.MAX_DESC_SIZE).toBe(4096);
      expect(GlyphLimits.MAX_PATH_SIZE).toBe(512);
      expect(GlyphLimits.MAX_MIME_SIZE).toBe(128);
    });

    it('should have metadata limits', () => {
      expect(GlyphLimits.MAX_METADATA_SIZE).toBe(262144);
      expect(GlyphLimits.MAX_COMMIT_ENVELOPE_SIZE).toBe(102400);
    });

    it('should have file limits', () => {
      expect(GlyphLimits.MAX_INLINE_FILE_SIZE).toBe(1048576);
      expect(GlyphLimits.MAX_TOTAL_INLINE_SIZE).toBe(10485760);
    });

    it('should have protocol limit', () => {
      expect(GlyphLimits.MAX_PROTOCOLS).toBe(16);
    });
  });

  describe('EnvelopeFlags', () => {
    it('should have correct bit flags', () => {
      expect(EnvelopeFlags.HAS_CONTENT_ROOT).toBe(1);
      expect(EnvelopeFlags.HAS_CONTROLLER).toBe(2);
      expect(EnvelopeFlags.HAS_PROFILE_HINT).toBe(4);
      expect(EnvelopeFlags.IS_REVEAL).toBe(128);
    });

    it('should allow combining flags', () => {
      const combined = EnvelopeFlags.HAS_CONTENT_ROOT | EnvelopeFlags.IS_REVEAL;
      expect(combined).toBe(129);
    });
  });

  describe('ContainerType', () => {
    it('should have all container types', () => {
      expect(ContainerType.COLLECTION).toBe('collection');
      expect(ContainerType.ALBUM).toBe('album');
      expect(ContainerType.BUNDLE).toBe('bundle');
      expect(ContainerType.SERIES).toBe('series');
    });
  });

  describe('AuthorityType', () => {
    it('should have all authority types', () => {
      expect(AuthorityType.ISSUER).toBe('issuer');
      expect(AuthorityType.MANAGER).toBe('manager');
      expect(AuthorityType.DELEGATE).toBe('delegate');
      expect(AuthorityType.BADGE).toBe('badge');
    });
  });

  describe('StorageType', () => {
    it('should have all storage types', () => {
      expect(StorageType.INLINE).toBe('inline');
      expect(StorageType.REF).toBe('ref');
      expect(StorageType.IPFS).toBe('ipfs');
    });
  });

  describe('UpdateOperation', () => {
    it('should have all update operations', () => {
      expect(UpdateOperation.REPLACE).toBe('replace');
      expect(UpdateOperation.MERGE).toBe('merge');
      expect(UpdateOperation.APPEND).toBe('append');
      expect(UpdateOperation.REMOVE).toBe('remove');
    });
  });

  describe('EncryptionAlgorithm', () => {
    it('should have AEAD algorithms', () => {
      expect(EncryptionAlgorithm.AEAD.AES_256_GCM).toBe('aes-256-gcm');
      expect(EncryptionAlgorithm.AEAD.XCHACHA20_POLY1305).toBe('xchacha20poly1305');
      expect(EncryptionAlgorithm.AEAD.CHACHA20_POLY1305).toBe('chacha20poly1305');
    });

    it('should have KDF algorithms', () => {
      expect(EncryptionAlgorithm.KDF.SCRYPT).toBe('scrypt');
      expect(EncryptionAlgorithm.KDF.HKDF_SHA256).toBe('hkdf-sha256');
    });

    it('should have key wrap algorithms', () => {
      expect(EncryptionAlgorithm.KEY_WRAP.X25519_HKDF_AES256GCM).toBe('x25519-hkdf-aes256gcm');
    });
  });

  describe('EncryptionMinimums', () => {
    it('should have scrypt parameters', () => {
      expect(EncryptionMinimums.SCRYPT.MIN_N).toBe(131072);
      expect(EncryptionMinimums.SCRYPT.RECOMMENDED_N).toBe(1048576);
      expect(EncryptionMinimums.SCRYPT.MIN_R).toBe(8);
      expect(EncryptionMinimums.SCRYPT.MIN_P).toBe(1);
    });

    it('should have nonce lengths', () => {
      expect(EncryptionMinimums.NONCE_LENGTHS.XCHACHA20_POLY1305).toBe(24);
      expect(EncryptionMinimums.NONCE_LENGTHS.AES_256_GCM).toBe(12);
    });
  });

  describe('GlyphDefaults', () => {
    it('should have sensible default values', () => {
      expect(GlyphDefaults.FT_DECIMALS).toBe(8);
      expect(GlyphDefaults.BURN_CONFIRMATIONS).toBe(6);
      expect(GlyphDefaults.ASERT_HALFLIFE).toBe(3600);
      expect(GlyphDefaults.TARGET_MINT_TIME).toBe(60);
    });
  });

  describe('PROTOCOL_REPS', () => {
    it('should have REP references for all protocols', () => {
      expect(PROTOCOL_REPS[GlyphProtocol.GLYPH_FT]).toBe('REP-3001');
      expect(PROTOCOL_REPS[GlyphProtocol.GLYPH_NFT]).toBe('REP-3001');
      expect(PROTOCOL_REPS[GlyphProtocol.GLYPH_DMINT]).toBe('REP-3010');
      expect(PROTOCOL_REPS[GlyphProtocol.GLYPH_MUT]).toBe('REP-3001');
      expect(PROTOCOL_REPS[GlyphProtocol.GLYPH_WAVE]).toBe('REP-3011');
    });
  });
});

describe('Protocol Validation', () => {
  describe('PROTOCOL_REQUIREMENTS', () => {
    it('should require FT for DMINT', () => {
      expect(PROTOCOL_REQUIREMENTS[GlyphProtocol.GLYPH_DMINT]).toContain(
        GlyphProtocol.GLYPH_FT
      );
    });

    it('should require NFT for MUT', () => {
      expect(PROTOCOL_REQUIREMENTS[GlyphProtocol.GLYPH_MUT]).toContain(
        GlyphProtocol.GLYPH_NFT
      );
    });

    it('should require NFT for CONTAINER', () => {
      expect(PROTOCOL_REQUIREMENTS[GlyphProtocol.GLYPH_CONTAINER]).toContain(
        GlyphProtocol.GLYPH_NFT
      );
    });

    it('should require NFT and MUT for WAVE', () => {
      const waveReqs = PROTOCOL_REQUIREMENTS[GlyphProtocol.GLYPH_WAVE];
      expect(waveReqs).toContain(GlyphProtocol.GLYPH_NFT);
      expect(waveReqs).toContain(GlyphProtocol.GLYPH_MUT);
    });
  });

  describe('PROTOCOL_EXCLUSIONS', () => {
    it('should have FT and NFT as mutually exclusive', () => {
      const ftNftExclusion = PROTOCOL_EXCLUSIONS.find(
        (pair) =>
          pair.includes(GlyphProtocol.GLYPH_FT) &&
          pair.includes(GlyphProtocol.GLYPH_NFT)
      );
      expect(ftNftExclusion).toBeDefined();
    });
  });

  describe('PROTOCOLS_REQUIRE_BASE', () => {
    it('should list protocols that cannot exist alone', () => {
      expect(PROTOCOLS_REQUIRE_BASE).toContain(GlyphProtocol.GLYPH_DMINT);
      expect(PROTOCOLS_REQUIRE_BASE).toContain(GlyphProtocol.GLYPH_MUT);
      expect(PROTOCOLS_REQUIRE_BASE).toContain(GlyphProtocol.GLYPH_BURN);
      expect(PROTOCOLS_REQUIRE_BASE).toContain(GlyphProtocol.GLYPH_CONTAINER);
    });
  });

  describe('validateProtocols', () => {
    it('should accept valid FT protocol', () => {
      const result = validateProtocols([GlyphProtocol.GLYPH_FT]);
      expect(result.valid).toBe(true);
    });

    it('should accept valid NFT protocol', () => {
      const result = validateProtocols([GlyphProtocol.GLYPH_NFT]);
      expect(result.valid).toBe(true);
    });

    it('should accept FT + DMINT combination', () => {
      const result = validateProtocols([
        GlyphProtocol.GLYPH_FT,
        GlyphProtocol.GLYPH_DMINT,
      ]);
      expect(result.valid).toBe(true);
    });

    it('should accept NFT + MUT combination', () => {
      const result = validateProtocols([
        GlyphProtocol.GLYPH_NFT,
        GlyphProtocol.GLYPH_MUT,
      ]);
      expect(result.valid).toBe(true);
    });

    it('should accept NFT + CONTAINER combination', () => {
      const result = validateProtocols([
        GlyphProtocol.GLYPH_NFT,
        GlyphProtocol.GLYPH_CONTAINER,
      ]);
      expect(result.valid).toBe(true);
    });

    it('should accept NFT + MUT + WAVE combination', () => {
      const result = validateProtocols([
        GlyphProtocol.GLYPH_NFT,
        GlyphProtocol.GLYPH_MUT,
        GlyphProtocol.GLYPH_WAVE,
      ]);
      expect(result.valid).toBe(true);
    });

    it('should reject FT + NFT (mutually exclusive)', () => {
      const result = validateProtocols([
        GlyphProtocol.GLYPH_FT,
        GlyphProtocol.GLYPH_NFT,
      ]);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('mutually exclusive');
    });

    it('should reject DMINT alone (requires FT)', () => {
      const result = validateProtocols([GlyphProtocol.GLYPH_DMINT]);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('requires');
    });

    it('should reject MUT alone (requires NFT)', () => {
      const result = validateProtocols([GlyphProtocol.GLYPH_MUT]);
      expect(result.valid).toBe(false);
    });

    it('should reject WAVE without NFT and MUT', () => {
      const result = validateProtocols([
        GlyphProtocol.GLYPH_NFT,
        GlyphProtocol.GLYPH_WAVE,
      ]);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('requires');
    });

    it('should accept empty array (base case)', () => {
      // Empty array passes validation since no conflicts
      const result = validateProtocols([]);
      expect(result.valid).toBe(true);
    });

    it('should reject conflicting protocols in large array', () => {
      // Array with both FT and NFT will fail due to mutual exclusion
      const withConflict = [1, 2, 3, 4, 5]; // includes FT(1) and NFT(2)
      const result = validateProtocols(withConflict);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('mutually exclusive');
    });
  });
});
