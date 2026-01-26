# Glyph v2 Constants Reference

This document provides a complete reference for Glyph v2 Token Standard constants exported by `@radiantblockchain/constants`.

## Installation

```bash
npm install @radiantblockchain/constants
```

## Import

```typescript
// Import everything
import * as constants from '@radiantblockchain/constants';

// Or import specific Glyph v2 exports
import {
  GLYPH_MAGIC,
  GlyphVersion,
  GlyphProtocol,
  validateProtocols,
  DmintAlgorithm,
  DaaMode,
  GlyphLimits,
  EnvelopeFlags,
} from '@radiantblockchain/constants';

// Or import from subpath
import * as glyph from '@radiantblockchain/constants/glyph';
```

## Magic Bytes

```typescript
import { GLYPH_MAGIC } from '@radiantblockchain/constants';

GLYPH_MAGIC.ASCII  // 'gly'
GLYPH_MAGIC.HEX    // '676c79'
GLYPH_MAGIC.BYTES  // Uint8Array([0x67, 0x6c, 0x79])
```

## Protocol Version

```typescript
import { GlyphVersion } from '@radiantblockchain/constants';

GlyphVersion.V1  // 0x01 (legacy)
GlyphVersion.V2  // 0x02 (current)
```

## Protocol IDs

```typescript
import { GlyphProtocol } from '@radiantblockchain/constants';

GlyphProtocol.GLYPH_FT         // 1 - Fungible Token
GlyphProtocol.GLYPH_NFT        // 2 - Non-Fungible Token
GlyphProtocol.GLYPH_DAT        // 3 - Data Storage
GlyphProtocol.GLYPH_DMINT      // 4 - Decentralized Minting
GlyphProtocol.GLYPH_MUT        // 5 - Mutable State
GlyphProtocol.GLYPH_BURN       // 6 - Explicit Burn
GlyphProtocol.GLYPH_CONTAINER  // 7 - Container/Collection
GlyphProtocol.GLYPH_ENCRYPTED  // 8 - Encrypted Content
GlyphProtocol.GLYPH_TIMELOCK   // 9 - Timelocked Reveal
GlyphProtocol.GLYPH_AUTHORITY  // 10 - Issuer Authority
GlyphProtocol.GLYPH_WAVE       // 11 - WAVE Naming
```

## Protocol Validation

```typescript
import { validateProtocols, getProtocolName } from '@radiantblockchain/constants';

// Validate a combination
const result = validateProtocols([1, 4]); // FT + DMINT
// { valid: true }

const invalid = validateProtocols([1, 2]); // FT + NFT
// { valid: false, error: 'Protocols GLYPH_FT and GLYPH_NFT are mutually exclusive' }

// Get protocol name
getProtocolName(1); // 'GLYPH_FT'
getProtocolName(4); // 'GLYPH_DMINT'
```

## Protocol Requirements

```typescript
import { PROTOCOL_REQUIREMENTS, PROTOCOL_EXCLUSIONS, PROTOCOLS_REQUIRE_BASE } from '@radiantblockchain/constants';

// Requirements - what protocols need other protocols
PROTOCOL_REQUIREMENTS[4]  // [1] - DMINT requires FT
PROTOCOL_REQUIREMENTS[5]  // [2] - MUT requires NFT
PROTOCOL_REQUIREMENTS[11] // [2, 5] - WAVE requires NFT + MUT

// Mutual exclusions
PROTOCOL_EXCLUSIONS // [[1, 2]] - FT and NFT are exclusive

// Protocols that can't exist alone
PROTOCOLS_REQUIRE_BASE // [4, 5, 6, 7, 11]
```

## dMint Algorithms

```typescript
import { DmintAlgorithm } from '@radiantblockchain/constants';

DmintAlgorithm.SHA256D        // 0x00 - SHA256d (backward compatible)
DmintAlgorithm.BLAKE3         // 0x01 - Blake3 (primary new)
DmintAlgorithm.K12            // 0x02 - KangarooTwelve
DmintAlgorithm.ARGON2ID_LIGHT // 0x03 - Argon2id-Light (memory-hard)
DmintAlgorithm.RANDOMX_LIGHT  // 0x04 - RandomX-Light (CPU-friendly)
```

## DAA Modes

```typescript
import { DaaMode } from '@radiantblockchain/constants';

DaaMode.FIXED    // 0x00 - Static difficulty
DaaMode.EPOCH    // 0x01 - Bitcoin-style periodic adjustment
DaaMode.ASERT    // 0x02 - Exponential moving average
DaaMode.LWMA     // 0x03 - Linear weighted moving average
DaaMode.SCHEDULE // 0x04 - Predetermined difficulty curve
```

## Size Limits

```typescript
import { GlyphLimits } from '@radiantblockchain/constants';

// Field limits
GlyphLimits.MAX_NAME_SIZE      // 256 bytes
GlyphLimits.MAX_DESC_SIZE      // 4096 bytes (4 KB)
GlyphLimits.MAX_PATH_SIZE      // 512 bytes
GlyphLimits.MAX_MIME_SIZE      // 128 bytes

// Envelope limits
GlyphLimits.MAX_METADATA_SIZE         // 262144 bytes (256 KB)
GlyphLimits.MAX_COMMIT_ENVELOPE_SIZE  // 102400 bytes (100 KB)
GlyphLimits.MAX_REVEAL_ENVELOPE_A_SIZE // 102400 bytes (100 KB)
GlyphLimits.MAX_REVEAL_ENVELOPE_B_SIZE // 12582912 bytes (12 MB)
GlyphLimits.MAX_UPDATE_ENVELOPE_SIZE  // 65536 bytes (64 KB)

// File limits
GlyphLimits.MAX_INLINE_FILE_SIZE  // 1048576 bytes (1 MB)
GlyphLimits.MAX_TOTAL_INLINE_SIZE // 10485760 bytes (10 MB)

// Protocol limit
GlyphLimits.MAX_PROTOCOLS // 16
```

## Envelope Flags

```typescript
import { EnvelopeFlags } from '@radiantblockchain/constants';

EnvelopeFlags.HAS_CONTENT_ROOT  // 1 (bit 0)
EnvelopeFlags.HAS_CONTROLLER    // 2 (bit 1)
EnvelopeFlags.HAS_PROFILE_HINT  // 4 (bit 2)
EnvelopeFlags.IS_REVEAL         // 128 (bit 7)

// Combine flags
const flags = EnvelopeFlags.HAS_CONTENT_ROOT | EnvelopeFlags.IS_REVEAL; // 129
```

## Container Types

```typescript
import { ContainerType } from '@radiantblockchain/constants';

ContainerType.COLLECTION // 'collection' - Numbered items
ContainerType.ALBUM      // 'album' - Media album
ContainerType.BUNDLE     // 'bundle' - Related assets
ContainerType.SERIES     // 'series' - Sequential releases
```

## Authority Types

```typescript
import { AuthorityType, AuthorityPermission } from '@radiantblockchain/constants';

// Types
AuthorityType.ISSUER   // 'issuer' - Right to mint
AuthorityType.MANAGER  // 'manager' - Right to manage
AuthorityType.DELEGATE // 'delegate' - Temporary authority
AuthorityType.BADGE    // 'badge' - Verification only

// Permissions
AuthorityPermission.MINT     // 'mint'
AuthorityPermission.UPDATE   // 'update'
AuthorityPermission.BURN     // 'burn'
AuthorityPermission.DELEGATE // 'delegate'
```

## Update Operations

```typescript
import { UpdateOperation } from '@radiantblockchain/constants';

UpdateOperation.REPLACE // 'replace' - Replace value at path
UpdateOperation.MERGE   // 'merge' - Merge object at path
UpdateOperation.APPEND  // 'append' - Append to array
UpdateOperation.REMOVE  // 'remove' - Remove value at path
```

## Storage Types

```typescript
import { StorageType } from '@radiantblockchain/constants';

StorageType.INLINE // 'inline' - Embedded in transaction
StorageType.REF    // 'ref' - External with integrity hash
StorageType.IPFS   // 'ipfs' - IPFS CID reference
```

## Encryption

```typescript
import { EncryptionAlgorithm, EncryptionMinimums } from '@radiantblockchain/constants';

// AEAD algorithms
EncryptionAlgorithm.AEAD.XCHACHA20_POLY1305 // 'xchacha20poly1305'
EncryptionAlgorithm.AEAD.AES_256_GCM        // 'aes-256-gcm'
EncryptionAlgorithm.AEAD.CHACHA20_POLY1305  // 'chacha20poly1305'

// KDF algorithms
EncryptionAlgorithm.KDF.SCRYPT      // 'scrypt'
EncryptionAlgorithm.KDF.HKDF_SHA256 // 'hkdf-sha256'

// Minimum parameters
EncryptionMinimums.SCRYPT.MIN_N           // 131072 (2^17)
EncryptionMinimums.SCRYPT.RECOMMENDED_N   // 1048576 (2^20)
EncryptionMinimums.NONCE_LENGTHS.XCHACHA20_POLY1305 // 24 bytes
EncryptionMinimums.NONCE_LENGTHS.AES_256_GCM        // 12 bytes
```

## Recommended Difficulty

```typescript
import { RecommendedMinDifficulty, DmintAlgorithm } from '@radiantblockchain/constants';

RecommendedMinDifficulty[DmintAlgorithm.SHA256D]       // 500_000
RecommendedMinDifficulty[DmintAlgorithm.BLAKE3]        // 2_500_000
RecommendedMinDifficulty[DmintAlgorithm.K12]           // 2_000_000
RecommendedMinDifficulty[DmintAlgorithm.ARGON2ID_LIGHT] // 50_000
```

## REP References

```typescript
import { PROTOCOL_REPS, GlyphProtocol } from '@radiantblockchain/constants';

PROTOCOL_REPS[GlyphProtocol.GLYPH_FT]    // 'REP-3001'
PROTOCOL_REPS[GlyphProtocol.GLYPH_DMINT] // 'REP-3010'
PROTOCOL_REPS[GlyphProtocol.GLYPH_MUT]   // 'REP-3001'
```

## Default Values

```typescript
import { GlyphDefaults } from '@radiantblockchain/constants';

GlyphDefaults.FT_DECIMALS        // 8 - Default token decimals
GlyphDefaults.BURN_CONFIRMATIONS // 6 - Confirmations for burn proof
GlyphDefaults.ASERT_HALFLIFE     // 3600 - ASERT halflife in seconds
GlyphDefaults.TARGET_MINT_TIME   // 60 - Target seconds per mint
GlyphDefaults.MAX_SUBDOMAIN_DEPTH // 5 - WAVE subdomain depth
```

## TypeScript Types

```typescript
import type {
  GlyphVersionValue,
  GlyphProtocolId,
  GlyphProtocolName,
  DmintAlgorithmId,
  DaaModeId,
} from '@radiantblockchain/constants';

const version: GlyphVersionValue = 2;
const protocol: GlyphProtocolId = 1;
const name: GlyphProtocolName = 'GLYPH_FT';
```

## Related Resources

- [Glyph v2 Whitepaper](https://github.com/Radiant-Core/Glyph-Token-Standards)
- [radiantjs Glyph Module](https://github.com/Radiant-Core/radiantjs)
- [RadiantScript Templates](https://github.com/Radiant-Core/RadiantScript)
- [REP Repository](https://github.com/Radiant-Core/REP)
