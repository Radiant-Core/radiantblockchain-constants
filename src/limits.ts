/**
 * @radiantblockchain/constants - Limits
 * 
 * Script and transaction limits for Radiant Blockchain.
 * These are consensus-critical values.
 * 
 * Reference: Radiant-Core src/script/script.h
 */

export const Limits = {
  /**
   * Maximum number of bytes pushable to the stack (legacy Bitcoin)
   */
  MAX_SCRIPT_ELEMENT_SIZE_LEGACY: 520,

  /**
   * Maximum number of bytes pushable to the stack (Radiant)
   */
  MAX_SCRIPT_ELEMENT_SIZE: 32_000_000,

  /**
   * Maximum number of non-push operations per script
   */
  MAX_OPS_PER_SCRIPT: 32_000_000,

  /**
   * Maximum number of public keys per multisig
   */
  MAX_PUBKEYS_PER_MULTISIG: 20,

  /**
   * Maximum script length in bytes
   */
  MAX_SCRIPT_SIZE: 32_000_000,

  /**
   * Maximum number of values on script interpreter stack
   */
  MAX_STACK_SIZE: 32_000_000,

  /**
   * Threshold for nLockTime: below this value it is interpreted as block number,
   * otherwise as UNIX timestamp. Threshold is Tue Nov 5 00:53:20 1985 UTC
   */
  LOCKTIME_THRESHOLD: 500_000_000,

  /**
   * Maximum size for CScriptNum (32-bit, pre-upgrade)
   */
  MAX_SCRIPTNUM_SIZE_32_BIT: 4,

  /**
   * Maximum size for CScriptNum (64-bit, post-upgrade)
   */
  MAX_SCRIPTNUM_SIZE_64_BIT: 8,

  /**
   * Maximum size for CScriptNum (current Radiant consensus)
   */
  MAX_SCRIPTNUM_SIZE: 8,

  /**
   * Maximum transaction size in bytes
   */
  MAX_TX_SIZE: 32_000_000,

  /**
   * Maximum block size in bytes
   */
  MAX_BLOCK_SIZE: 256_000_000,

  /**
   * Minimum transaction size in bytes
   */
  MIN_TX_SIZE: 100,

  /**
   * Size of a reference (36 bytes: 32-byte txid + 4-byte vout)
   */
  REF_SIZE: 36,

  /**
   * Size of a hash256 (32 bytes)
   */
  HASH256_SIZE: 32,

  /**
   * Size of a hash160 (20 bytes)
   */
  HASH160_SIZE: 20,

  /**
   * Size of a compressed public key (33 bytes)
   */
  COMPRESSED_PUBKEY_SIZE: 33,

  /**
   * Size of an uncompressed public key (65 bytes)
   */
  UNCOMPRESSED_PUBKEY_SIZE: 65,

  /**
   * Size of a signature (71-73 bytes typically, max 73)
   */
  MAX_SIGNATURE_SIZE: 73,

  /**
   * Dust threshold in photons (satoshis)
   */
  DUST_THRESHOLD: 546,

  /**
   * Coin value in photons (1 RXD = 100,000,000 photons)
   */
  COIN: 100_000_000,

  /**
   * Maximum money supply (21 billion RXD in photons)
   */
  MAX_MONEY: 2_100_000_000_000_000_000n,
} as const;

export type LimitName = keyof typeof Limits;
export type LimitValue = (typeof Limits)[keyof typeof Limits];

/**
 * Check if a value exceeds script element size limit
 */
export function exceedsElementSize(size: number): boolean {
  return size > Limits.MAX_SCRIPT_ELEMENT_SIZE;
}

/**
 * Check if a script exceeds the maximum script size
 */
export function exceedsScriptSize(size: number): boolean {
  return size > Limits.MAX_SCRIPT_SIZE;
}

/**
 * Check if stack depth exceeds maximum
 */
export function exceedsStackSize(depth: number): boolean {
  return depth > Limits.MAX_STACK_SIZE;
}

/**
 * Check if op count exceeds maximum
 */
export function exceedsOpCount(count: number): boolean {
  return count > Limits.MAX_OPS_PER_SCRIPT;
}

/**
 * Convert RXD to photons
 */
export function toPhotons(rxd: number): bigint {
  return BigInt(Math.round(rxd * Limits.COIN));
}

/**
 * Convert photons to RXD
 */
export function toRxd(photons: bigint): number {
  return Number(photons) / Limits.COIN;
}

export default Limits;
