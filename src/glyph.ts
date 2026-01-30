/**
 * @radiantblockchain/constants - Glyph v2 Token Standard Constants
 * 
 * Protocol constants for the Glyph v2 token standard.
 * Reference: Glyph v2 Token Standard Whitepaper
 * 
 * @see https://github.com/Radiant-Core/Glyph-Token-Standards
 */

/**
 * Magic bytes identifying Glyph transactions
 */
export const GLYPH_MAGIC = {
  /** ASCII 'gly' */
  ASCII: 'gly',
  /** Hex representation */
  HEX: '676c79',
  /** Byte array */
  BYTES: new Uint8Array([0x67, 0x6c, 0x79]),
} as const;

/**
 * Glyph protocol versions
 */
export const GlyphVersion = {
  /** Legacy v1 */
  V1: 0x01,
  /** Current v2 */
  V2: 0x02,
} as const;

export type GlyphVersionValue = (typeof GlyphVersion)[keyof typeof GlyphVersion];

/**
 * Glyph Protocol IDs
 * 
 * Tokens specify protocols in the `p` array: { "p": [2, 5, 8] }
 */
export const GlyphProtocol = {
  /** Fungible Token */
  GLYPH_FT: 1,
  /** Non-Fungible Token */
  GLYPH_NFT: 2,
  /** Data Storage */
  GLYPH_DAT: 3,
  /** Decentralized Minting */
  GLYPH_DMINT: 4,
  /** Mutable State */
  GLYPH_MUT: 5,
  /** Explicit Burn */
  GLYPH_BURN: 6,
  /** Container/Collection */
  GLYPH_CONTAINER: 7,
  /** Encrypted Content */
  GLYPH_ENCRYPTED: 8,
  /** Timelocked Reveal */
  GLYPH_TIMELOCK: 9,
  /** Issuer Authority */
  GLYPH_AUTHORITY: 10,
  /** WAVE Naming */
  GLYPH_WAVE: 11,
} as const;

export type GlyphProtocolId = (typeof GlyphProtocol)[keyof typeof GlyphProtocol];
export type GlyphProtocolName = keyof typeof GlyphProtocol;

/**
 * Get protocol name from ID
 */
export function getProtocolName(id: number): GlyphProtocolName | undefined {
  for (const [name, value] of Object.entries(GlyphProtocol)) {
    if (value === id) {
      return name as GlyphProtocolName;
    }
  }
  return undefined;
}

/**
 * Valid protocol combinations
 * Some protocols require others to be present
 */
export const PROTOCOL_REQUIREMENTS: Record<number, number[]> = {
  [GlyphProtocol.GLYPH_DMINT]: [GlyphProtocol.GLYPH_FT], // dMint requires FT
  [GlyphProtocol.GLYPH_MUT]: [GlyphProtocol.GLYPH_NFT], // Mutable requires NFT
  [GlyphProtocol.GLYPH_CONTAINER]: [GlyphProtocol.GLYPH_NFT], // Container requires NFT
  [GlyphProtocol.GLYPH_ENCRYPTED]: [GlyphProtocol.GLYPH_NFT], // Encrypted requires NFT
  [GlyphProtocol.GLYPH_TIMELOCK]: [GlyphProtocol.GLYPH_ENCRYPTED], // Timelock requires Encrypted (v2 spec Section 3.5)
  [GlyphProtocol.GLYPH_AUTHORITY]: [GlyphProtocol.GLYPH_NFT], // Authority requires NFT
  [GlyphProtocol.GLYPH_WAVE]: [GlyphProtocol.GLYPH_NFT, GlyphProtocol.GLYPH_MUT], // WAVE requires NFT + Mutable
};

/**
 * Mutually exclusive protocols
 */
export const PROTOCOL_EXCLUSIONS: [number, number][] = [
  [GlyphProtocol.GLYPH_FT, GlyphProtocol.GLYPH_NFT], // FT and NFT are mutually exclusive
];

/**
 * Protocols that cannot exist alone (action markers or modifiers)
 */
export const PROTOCOLS_REQUIRE_BASE: number[] = [
  GlyphProtocol.GLYPH_DMINT,
  GlyphProtocol.GLYPH_MUT,
  GlyphProtocol.GLYPH_BURN, // BURN is an action marker, must accompany FT or NFT
  GlyphProtocol.GLYPH_CONTAINER,
  GlyphProtocol.GLYPH_ENCRYPTED,
  GlyphProtocol.GLYPH_TIMELOCK,
  GlyphProtocol.GLYPH_AUTHORITY,
  GlyphProtocol.GLYPH_WAVE,
];

/**
 * Validate protocol combination
 */
export function validateProtocols(protocols: number[]): { valid: boolean; error?: string } {
  // Check for mutually exclusive protocols
  for (const [a, b] of PROTOCOL_EXCLUSIONS) {
    if (protocols.includes(a) && protocols.includes(b)) {
      return {
        valid: false,
        error: `Protocols ${getProtocolName(a)} and ${getProtocolName(b)} are mutually exclusive`,
      };
    }
  }

  // Check for required base protocols
  for (const protocol of protocols) {
    const requirements = PROTOCOL_REQUIREMENTS[protocol];
    if (requirements) {
      for (const required of requirements) {
        if (!protocols.includes(required)) {
          return {
            valid: false,
            error: `Protocol ${getProtocolName(protocol)} requires ${getProtocolName(required)}`,
          };
        }
      }
    }
  }

  // Check for protocols that can't exist alone
  if (protocols.length === 1 && PROTOCOLS_REQUIRE_BASE.includes(protocols[0])) {
    return {
      valid: false,
      error: `Protocol ${getProtocolName(protocols[0])} cannot exist alone`,
    };
  }

  // BURN must accompany FT or NFT (it's an action marker)
  if (protocols.includes(GlyphProtocol.GLYPH_BURN)) {
    if (!protocols.includes(GlyphProtocol.GLYPH_FT) && !protocols.includes(GlyphProtocol.GLYPH_NFT)) {
      return {
        valid: false,
        error: 'BURN must accompany FT or NFT',
      };
    }
  }

  return { valid: true };
}

/**
 * dMint POW Algorithm IDs
 */
export const DmintAlgorithm = {
  /** SHA256d - Backward compatible */
  SHA256D: 0x00,
  /** Blake3 - Primary new algorithm */
  BLAKE3: 0x01,
  /** KangarooTwelve - Phase 3 */
  K12: 0x02,
  /** Argon2id-Light - Memory-hard, Phase 3 */
  ARGON2ID_LIGHT: 0x03,
  /** RandomX-Light - CLI only, deferred */
  RANDOMX_LIGHT: 0x04,
} as const;

export type DmintAlgorithmId = (typeof DmintAlgorithm)[keyof typeof DmintAlgorithm];

/**
 * DAA (Difficulty Adjustment Algorithm) Modes
 */
export const DaaMode = {
  /** Static difficulty */
  FIXED: 0x00,
  /** Bitcoin-style periodic adjustment */
  EPOCH: 0x01,
  /** Exponential moving average */
  ASERT: 0x02,
  /** Linear weighted moving average */
  LWMA: 0x03,
  /** Predetermined difficulty curve */
  SCHEDULE: 0x04,
} as const;

export type DaaModeId = (typeof DaaMode)[keyof typeof DaaMode];

/**
 * Glyph size limits (bytes)
 */
export const GlyphLimits = {
  /** Maximum name length */
  MAX_NAME_SIZE: 256,
  /** Maximum description length */
  MAX_DESC_SIZE: 4096, // 4 KB
  /** Maximum path length */
  MAX_PATH_SIZE: 512,
  /** Maximum MIME type length */
  MAX_MIME_SIZE: 128,
  /** Maximum total metadata size */
  MAX_METADATA_SIZE: 262144, // 256 KB
  /** Maximum commit envelope size */
  MAX_COMMIT_ENVELOPE_SIZE: 102400, // 100 KB
  /** Maximum reveal envelope size (Style A) */
  MAX_REVEAL_ENVELOPE_A_SIZE: 102400, // 100 KB
  /** Maximum reveal envelope size (Style B) - consensus limited */
  MAX_REVEAL_ENVELOPE_B_SIZE: 12582912, // 12 MB
  /** Maximum update envelope size */
  MAX_UPDATE_ENVELOPE_SIZE: 65536, // 64 KB
  /** Maximum single inline file size */
  MAX_INLINE_FILE_SIZE: 1048576, // 1 MB
  /** Maximum total inline content size */
  MAX_TOTAL_INLINE_SIZE: 10485760, // 10 MB
  /** Maximum protocol array items */
  MAX_PROTOCOLS: 16,
} as const;

/**
 * Envelope flags byte
 */
export const EnvelopeFlags = {
  /** Merkle root of content present */
  HAS_CONTENT_ROOT: 1 << 0,
  /** Mutable controller specified */
  HAS_CONTROLLER: 1 << 1,
  /** App profile hint included */
  HAS_PROFILE_HINT: 1 << 2,
  /** Style A: distinguish commit/reveal */
  IS_REVEAL: 1 << 7,
} as const;

/**
 * Container types
 */
export const ContainerType = {
  /** NFT collection with numbered items */
  COLLECTION: 'collection',
  /** Media album */
  ALBUM: 'album',
  /** Package of related assets */
  BUNDLE: 'bundle',
  /** Sequential releases */
  SERIES: 'series',
} as const;

/**
 * Authority types
 */
export const AuthorityType = {
  /** Right to mint new tokens */
  ISSUER: 'issuer',
  /** Right to manage existing tokens */
  MANAGER: 'manager',
  /** Temporary/limited authority */
  DELEGATE: 'delegate',
  /** Verification only, no permissions */
  BADGE: 'badge',
} as const;

/**
 * Authority permissions
 */
export const AuthorityPermission = {
  MINT: 'mint',
  UPDATE: 'update',
  BURN: 'burn',
  DELEGATE: 'delegate',
} as const;

/**
 * Mutable update operations
 */
export const UpdateOperation = {
  /** Replace value at path */
  REPLACE: 'replace',
  /** Merge object at path */
  MERGE: 'merge',
  /** Append to array at path */
  APPEND: 'append',
  /** Remove value at path */
  REMOVE: 'remove',
} as const;

/**
 * Content storage types
 */
export const StorageType = {
  /** Embedded in reveal transaction */
  INLINE: 'inline',
  /** External with integrity hash */
  REF: 'ref',
  /** IPFS CID reference */
  IPFS: 'ipfs',
} as const;

/**
 * Supported encryption algorithms
 */
export const EncryptionAlgorithm = {
  /** AEAD algorithms */
  AEAD: {
    XCHACHA20_POLY1305: 'xchacha20poly1305',
    AES_256_GCM: 'aes-256-gcm',
    CHACHA20_POLY1305: 'chacha20poly1305',
  },
  /** KDF algorithms */
  KDF: {
    SCRYPT: 'scrypt',
    HKDF_SHA256: 'hkdf-sha256',
  },
  /** Key wrap algorithms */
  KEY_WRAP: {
    X25519_HKDF_AES256GCM: 'x25519-hkdf-aes256gcm',
  },
} as const;

/**
 * Minimum security parameters for encryption
 */
export const EncryptionMinimums = {
  /** Scrypt parameters */
  SCRYPT: {
    /** Minimum N (2^17) */
    MIN_N: 131072,
    /** Recommended N (2^20) */
    RECOMMENDED_N: 1048576,
    /** Minimum r */
    MIN_R: 8,
    /** Minimum p */
    MIN_P: 1,
    /** Minimum salt length (bytes) */
    MIN_SALT_LENGTH: 16,
    /** Recommended salt length (bytes) */
    RECOMMENDED_SALT_LENGTH: 32,
  },
  /** Nonce lengths (bytes) */
  NONCE_LENGTHS: {
    XCHACHA20_POLY1305: 24,
    AES_256_GCM: 12,
    CHACHA20_POLY1305: 12,
  },
} as const;

/**
 * Recommended minimum difficulty per algorithm
 * to prevent excessive collisions
 */
export const RecommendedMinDifficulty: Record<number, number> = {
  [DmintAlgorithm.SHA256D]: 500_000,
  [DmintAlgorithm.BLAKE3]: 2_500_000,
  [DmintAlgorithm.K12]: 2_000_000,
  [DmintAlgorithm.ARGON2ID_LIGHT]: 50_000,
};

/**
 * Related REPs for each protocol
 */
export const PROTOCOL_REPS: Record<number, string> = {
  [GlyphProtocol.GLYPH_FT]: 'REP-3001',
  [GlyphProtocol.GLYPH_NFT]: 'REP-3001',
  [GlyphProtocol.GLYPH_DAT]: 'REP-3001',
  [GlyphProtocol.GLYPH_DMINT]: 'REP-3010',
  [GlyphProtocol.GLYPH_MUT]: 'REP-3001',
  [GlyphProtocol.GLYPH_BURN]: 'REP-3014',
  [GlyphProtocol.GLYPH_CONTAINER]: 'REP-3013',
  [GlyphProtocol.GLYPH_ENCRYPTED]: 'REP-3006',
  [GlyphProtocol.GLYPH_TIMELOCK]: 'REP-3009',
  [GlyphProtocol.GLYPH_AUTHORITY]: 'REP-3015',
  [GlyphProtocol.GLYPH_WAVE]: 'REP-3011',
};

/**
 * Default values for token creation
 */
export const GlyphDefaults = {
  /** Default decimals for FT */
  FT_DECIMALS: 8,
  /** Default royalty confirmation blocks */
  BURN_CONFIRMATIONS: 6,
  /** Default ASERT halflife (seconds) */
  ASERT_HALFLIFE: 3600,
  /** Default target mint time (seconds) */
  TARGET_MINT_TIME: 60,
  /** Maximum subdomain depth */
  MAX_SUBDOMAIN_DEPTH: 5,
} as const;

export default {
  GLYPH_MAGIC,
  GlyphVersion,
  GlyphProtocol,
  DmintAlgorithm,
  DaaMode,
  GlyphLimits,
  EnvelopeFlags,
  ContainerType,
  AuthorityType,
  AuthorityPermission,
  UpdateOperation,
  StorageType,
  EncryptionAlgorithm,
  EncryptionMinimums,
  RecommendedMinDifficulty,
  PROTOCOL_REPS,
  GlyphDefaults,
};
