/**
 * @radiantblockchain/constants - Script Verification Flags
 * 
 * Flags that control script verification behavior.
 * These are consensus-critical values.
 * 
 * Reference: Radiant-Core src/script/script_flags.h
 */

export const ScriptFlags = {
  /**
   * No flags
   */
  SCRIPT_VERIFY_NONE: 0,

  /**
   * Evaluate P2SH subscripts (softfork safe, BIP16)
   */
  SCRIPT_VERIFY_P2SH: 1 << 0,

  /**
   * Passing a non-strict-DER signature or one with undefined hashtype
   * to a checksig operation causes script failure
   */
  SCRIPT_VERIFY_STRICTENC: 1 << 1,

  /**
   * Passing a non-strict-DER signature to a checksig operation
   * causes script failure (BIP62 rule 1)
   */
  SCRIPT_VERIFY_DERSIG: 1 << 2,

  /**
   * Passing a non-strict-DER signature or one with S > order/2
   * to a checksig operation causes script failure (BIP62 rule 5)
   */
  SCRIPT_VERIFY_LOW_S: 1 << 3,

  /**
   * Using a non-push operator in the scriptSig causes script failure
   * (BIP62 rule 2)
   */
  SCRIPT_VERIFY_SIGPUSHONLY: 1 << 5,

  /**
   * Require minimal encodings for all push operations
   * (BIP62 rule 3 and 4)
   */
  SCRIPT_VERIFY_MINIMALDATA: 1 << 6,

  /**
   * Discourage use of NOPs reserved for upgrades (NOP1-10)
   */
  SCRIPT_VERIFY_DISCOURAGE_UPGRADABLE_NOPS: 1 << 7,

  /**
   * Require that only a single stack element remains after evaluation
   * (BIP62 rule 6)
   */
  SCRIPT_VERIFY_CLEANSTACK: 1 << 8,

  /**
   * Verify CHECKLOCKTIMEVERIFY (BIP65)
   */
  SCRIPT_VERIFY_CHECKLOCKTIMEVERIFY: 1 << 9,

  /**
   * Support CHECKSEQUENCEVERIFY opcode (BIP112)
   */
  SCRIPT_VERIFY_CHECKSEQUENCEVERIFY: 1 << 10,

  /**
   * Require the argument of OP_IF/NOTIF to be exactly 0x01 or empty vector
   */
  SCRIPT_VERIFY_MINIMALIF: 1 << 13,

  /**
   * Signature(s) must be empty vector if a CHECK(MULTI)SIG operation failed
   */
  SCRIPT_VERIFY_NULLFAIL: 1 << 14,

  /**
   * Accept signature using SIGHASH_FORKID
   */
  SCRIPT_ENABLE_SIGHASH_FORKID: 1 << 16,

  /**
   * Disallow segwit recovery exception to CLEANSTACK and P2SH
   */
  SCRIPT_DISALLOW_SEGWIT_RECOVERY: 1 << 20,

  /**
   * Enable new OP_CHECKMULTISIG logic (Schnorr signatures)
   */
  SCRIPT_ENABLE_SCHNORR_MULTISIG: 1 << 21,

  /**
   * Require the number of sigchecks in an input to satisfy
   * a specific bound, defined by scriptSig length
   */
  SCRIPT_VERIFY_INPUT_SIGCHECKS: 1 << 22,

  /**
   * Enforce per-tx consensus sigcheck limit
   */
  SCRIPT_ENFORCE_SIGCHECKS: 1 << 23,

  /**
   * Enable 64-bit integer arithmetic
   */
  SCRIPT_64_BIT_INTEGERS: 1 << 24,

  /**
   * Enable native introspection opcodes
   */
  SCRIPT_NATIVE_INTROSPECTION: 1 << 25,

  /**
   * Enable enhanced reference opcodes
   */
  SCRIPT_ENHANCED_REFERENCES: 1 << 26,

  /**
   * Enable OP_PUSH_TX_STATE
   */
  SCRIPT_PUSH_TX_STATE: 1 << 27,
} as const;

export type ScriptFlagName = keyof typeof ScriptFlags;
export type ScriptFlagValue = (typeof ScriptFlags)[keyof typeof ScriptFlags];

/**
 * Standard script verification flags for Radiant mainnet
 */
export const STANDARD_SCRIPT_VERIFY_FLAGS =
  ScriptFlags.SCRIPT_VERIFY_P2SH |
  ScriptFlags.SCRIPT_VERIFY_STRICTENC |
  ScriptFlags.SCRIPT_VERIFY_DERSIG |
  ScriptFlags.SCRIPT_VERIFY_LOW_S |
  ScriptFlags.SCRIPT_VERIFY_SIGPUSHONLY |
  ScriptFlags.SCRIPT_VERIFY_MINIMALDATA |
  ScriptFlags.SCRIPT_VERIFY_DISCOURAGE_UPGRADABLE_NOPS |
  ScriptFlags.SCRIPT_VERIFY_CLEANSTACK |
  ScriptFlags.SCRIPT_VERIFY_CHECKLOCKTIMEVERIFY |
  ScriptFlags.SCRIPT_VERIFY_CHECKSEQUENCEVERIFY |
  ScriptFlags.SCRIPT_VERIFY_MINIMALIF |
  ScriptFlags.SCRIPT_VERIFY_NULLFAIL |
  ScriptFlags.SCRIPT_ENABLE_SIGHASH_FORKID |
  ScriptFlags.SCRIPT_64_BIT_INTEGERS |
  ScriptFlags.SCRIPT_NATIVE_INTROSPECTION |
  ScriptFlags.SCRIPT_ENHANCED_REFERENCES;

/**
 * Mandatory script verification flags (consensus)
 */
export const MANDATORY_SCRIPT_VERIFY_FLAGS =
  ScriptFlags.SCRIPT_VERIFY_P2SH |
  ScriptFlags.SCRIPT_ENABLE_SIGHASH_FORKID;

/**
 * Sighash types
 */
export const SigHashType = {
  SIGHASH_ALL: 0x01,
  SIGHASH_NONE: 0x02,
  SIGHASH_SINGLE: 0x03,
  SIGHASH_FORKID: 0x40,
  SIGHASH_ANYONECANPAY: 0x80,
} as const;

export type SigHashTypeName = keyof typeof SigHashType;
export type SigHashTypeValue = (typeof SigHashType)[keyof typeof SigHashType];

/**
 * Default sighash type for Radiant (ALL | FORKID)
 */
export const DEFAULT_SIGHASH_TYPE = SigHashType.SIGHASH_ALL | SigHashType.SIGHASH_FORKID;

/**
 * Check if a flag is set
 */
export function hasFlag(flags: number, flag: number): boolean {
  return (flags & flag) !== 0;
}

/**
 * Set a flag
 */
export function setFlag(flags: number, flag: number): number {
  return flags | flag;
}

/**
 * Clear a flag
 */
export function clearFlag(flags: number, flag: number): number {
  return flags & ~flag;
}

/**
 * Get human-readable flag names from a flags value
 */
export function getFlagNames(flags: number): string[] {
  const names: string[] = [];
  for (const [name, value] of Object.entries(ScriptFlags)) {
    if (value !== 0 && (flags & value) === value) {
      names.push(name);
    }
  }
  return names;
}

export default ScriptFlags;
