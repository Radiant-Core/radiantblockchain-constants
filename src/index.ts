/**
 * @radiantblockchain/constants
 * 
 * Shared constants for Radiant Blockchain development tools.
 * This package provides opcodes, limits, flags, and network parameters
 * used across rxdeb, radiantjs, and RadiantScript.
 */

// Opcodes
export {
  Opcodes,
  OpcodeNames,
  getOpcodeName,
  isRadiantOpcode,
  isIntrospectionOpcode,
  isReferenceOpcode,
  isStateSeparatorOpcode,
  isPushOpcode,
  isReenabledOpcode,
} from './opcodes';
export type { OpcodeValue, OpcodeName } from './opcodes';

// Limits
export {
  Limits,
  exceedsElementSize,
  exceedsScriptSize,
  exceedsStackSize,
  exceedsOpCount,
  toPhotons,
  toRxd,
} from './limits';
export type { LimitName, LimitValue } from './limits';

// Flags
export {
  ScriptFlags,
  SigHashType,
  STANDARD_SCRIPT_VERIFY_FLAGS,
  MANDATORY_SCRIPT_VERIFY_FLAGS,
  DEFAULT_SIGHASH_TYPE,
  hasFlag,
  setFlag,
  clearFlag,
  getFlagNames,
} from './flags';
export type { ScriptFlagName, ScriptFlagValue, SigHashTypeName, SigHashTypeValue } from './flags';

// Networks
export {
  Networks,
  mainnet,
  testnet,
  regtest,
  getNetwork,
  getNetworkByMagic,
  isMainnet,
  isTestnet,
  isRegtest,
  ElectrumServers,
} from './networks';
export type { NetworkParams, NetworkName } from './networks';

// Glyph v2 Token Standard
export {
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
  AuthorityPermission,
  UpdateOperation,
  StorageType,
  EncryptionAlgorithm,
  EncryptionMinimums,
  RecommendedMinDifficulty,
  PROTOCOL_REPS,
  GlyphDefaults,
} from './glyph';
export type {
  GlyphVersionValue,
  GlyphProtocolId,
  GlyphProtocolName,
  DmintAlgorithmId,
  DaaModeId,
} from './glyph';

/**
 * Package version
 */
export const VERSION = '1.0.0';

/**
 * Useful constants for script building
 */
export const ScriptConstants = {
  /** Empty script */
  EMPTY_SCRIPT: new Uint8Array(0),
  
  /** OP_FALSE OP_RETURN prefix for unspendable outputs */
  OP_RETURN_PREFIX: new Uint8Array([0x00, 0x6a]),
  
  /** P2PKH script template size (25 bytes) */
  P2PKH_SCRIPT_SIZE: 25,
  
  /** P2SH script template size (23 bytes) */
  P2SH_SCRIPT_SIZE: 23,
} as const;
