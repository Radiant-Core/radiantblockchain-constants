/**
 * @radiantblockchain/constants - Opcodes
 * 
 * Complete opcode definitions for Radiant Blockchain.
 * Includes all Bitcoin-compatible opcodes plus Radiant-specific extensions.
 * 
 * Reference: Radiant-Core src/script/script.h
 */

export const Opcodes = {
  // Push value
  OP_0: 0x00,
  OP_FALSE: 0x00,
  OP_PUSHDATA1: 0x4c,
  OP_PUSHDATA2: 0x4d,
  OP_PUSHDATA4: 0x4e,
  OP_1NEGATE: 0x4f,
  OP_RESERVED: 0x50,
  OP_1: 0x51,
  OP_TRUE: 0x51,
  OP_2: 0x52,
  OP_3: 0x53,
  OP_4: 0x54,
  OP_5: 0x55,
  OP_6: 0x56,
  OP_7: 0x57,
  OP_8: 0x58,
  OP_9: 0x59,
  OP_10: 0x5a,
  OP_11: 0x5b,
  OP_12: 0x5c,
  OP_13: 0x5d,
  OP_14: 0x5e,
  OP_15: 0x5f,
  OP_16: 0x60,

  // Control
  OP_NOP: 0x61,
  OP_VER: 0x62,
  OP_IF: 0x63,
  OP_NOTIF: 0x64,
  OP_VERIF: 0x65,
  OP_VERNOTIF: 0x66,
  OP_ELSE: 0x67,
  OP_ENDIF: 0x68,
  OP_VERIFY: 0x69,
  OP_RETURN: 0x6a,

  // Stack operations
  OP_TOALTSTACK: 0x6b,
  OP_FROMALTSTACK: 0x6c,
  OP_2DROP: 0x6d,
  OP_2DUP: 0x6e,
  OP_3DUP: 0x6f,
  OP_2OVER: 0x70,
  OP_2ROT: 0x71,
  OP_2SWAP: 0x72,
  OP_IFDUP: 0x73,
  OP_DEPTH: 0x74,
  OP_DROP: 0x75,
  OP_DUP: 0x76,
  OP_NIP: 0x77,
  OP_OVER: 0x78,
  OP_PICK: 0x79,
  OP_ROLL: 0x7a,
  OP_ROT: 0x7b,
  OP_SWAP: 0x7c,
  OP_TUCK: 0x7d,

  // Splice operations (re-enabled in Radiant)
  OP_CAT: 0x7e,
  OP_SPLIT: 0x7f,
  OP_NUM2BIN: 0x80,
  OP_BIN2NUM: 0x81,
  OP_SIZE: 0x82,

  // Bit logic
  OP_INVERT: 0x83,
  OP_AND: 0x84,
  OP_OR: 0x85,
  OP_XOR: 0x86,
  OP_EQUAL: 0x87,
  OP_EQUALVERIFY: 0x88,
  OP_RESERVED1: 0x89,
  OP_RESERVED2: 0x8a,

  // Numeric
  OP_1ADD: 0x8b,
  OP_1SUB: 0x8c,
  OP_2MUL: 0x8d,
  OP_2DIV: 0x8e,
  OP_NEGATE: 0x8f,
  OP_ABS: 0x90,
  OP_NOT: 0x91,
  OP_0NOTEQUAL: 0x92,
  OP_ADD: 0x93,
  OP_SUB: 0x94,
  OP_MUL: 0x95,
  OP_DIV: 0x96,
  OP_MOD: 0x97,
  OP_LSHIFT: 0x98,
  OP_RSHIFT: 0x99,
  OP_BOOLAND: 0x9a,
  OP_BOOLOR: 0x9b,
  OP_NUMEQUAL: 0x9c,
  OP_NUMEQUALVERIFY: 0x9d,
  OP_NUMNOTEQUAL: 0x9e,
  OP_LESSTHAN: 0x9f,
  OP_GREATERTHAN: 0xa0,
  OP_LESSTHANOREQUAL: 0xa1,
  OP_GREATERTHANOREQUAL: 0xa2,
  OP_MIN: 0xa3,
  OP_MAX: 0xa4,
  OP_WITHIN: 0xa5,

  // Crypto
  OP_RIPEMD160: 0xa6,
  OP_SHA1: 0xa7,
  OP_SHA256: 0xa8,
  OP_HASH160: 0xa9,
  OP_HASH256: 0xaa,
  OP_CODESEPARATOR: 0xab,
  OP_CHECKSIG: 0xac,
  OP_CHECKSIGVERIFY: 0xad,
  OP_CHECKMULTISIG: 0xae,
  OP_CHECKMULTISIGVERIFY: 0xaf,

  // Expansion
  OP_NOP1: 0xb0,
  OP_CHECKLOCKTIMEVERIFY: 0xb1,
  OP_NOP2: 0xb1,
  OP_CHECKSEQUENCEVERIFY: 0xb2,
  OP_NOP3: 0xb2,
  OP_NOP4: 0xb3,
  OP_NOP5: 0xb4,
  OP_NOP6: 0xb5,
  OP_NOP7: 0xb6,
  OP_NOP8: 0xb7,
  OP_NOP9: 0xb8,
  OP_NOP10: 0xb9,

  // More crypto (BCH-derived)
  OP_CHECKDATASIG: 0xba,
  OP_CHECKDATASIGVERIFY: 0xbb,

  // Additional byte string operations
  OP_REVERSEBYTES: 0xbc,

  // ========================================
  // RADIANT-SPECIFIC OPCODES
  // ========================================

  // State separator (0xBD-0xBF)
  OP_STATESEPARATOR: 0xbd,
  OP_STATESEPARATORINDEX_UTXO: 0xbe,
  OP_STATESEPARATORINDEX_OUTPUT: 0xbf,

  // Native Introspection (0xC0-0xCD)
  OP_INPUTINDEX: 0xc0,
  OP_ACTIVEBYTECODE: 0xc1,
  OP_TXVERSION: 0xc2,
  OP_TXINPUTCOUNT: 0xc3,
  OP_TXOUTPUTCOUNT: 0xc4,
  OP_TXLOCKTIME: 0xc5,
  OP_UTXOVALUE: 0xc6,
  OP_UTXOBYTECODE: 0xc7,
  OP_OUTPOINTTXHASH: 0xc8,
  OP_OUTPOINTINDEX: 0xc9,
  OP_INPUTBYTECODE: 0xca,
  OP_INPUTSEQUENCENUMBER: 0xcb,
  OP_OUTPUTVALUE: 0xcc,
  OP_OUTPUTBYTECODE: 0xcd,

  // SHA512/256 functions (0xCE-0xCF)
  OP_SHA512_256: 0xce,
  OP_HASH512_256: 0xcf,

  // Reference opcodes (0xD0-0xED)
  OP_PUSHINPUTREF: 0xd0,
  OP_REQUIREINPUTREF: 0xd1,
  OP_DISALLOWPUSHINPUTREF: 0xd2,
  OP_DISALLOWPUSHINPUTREFSIBLING: 0xd3,
  OP_REFHASHDATASUMMARY_UTXO: 0xd4,
  OP_REFHASHVALUESUM_UTXOS: 0xd5,
  OP_REFHASHDATASUMMARY_OUTPUT: 0xd6,
  OP_REFHASHVALUESUM_OUTPUTS: 0xd7,
  OP_PUSHINPUTREFSINGLETON: 0xd8,
  OP_REFTYPE_UTXO: 0xd9,
  OP_REFTYPE_OUTPUT: 0xda,
  OP_REFVALUESUM_UTXOS: 0xdb,
  OP_REFVALUESUM_OUTPUTS: 0xdc,
  OP_REFOUTPUTCOUNT_UTXOS: 0xdd,
  OP_REFOUTPUTCOUNT_OUTPUTS: 0xde,
  OP_REFOUTPUTCOUNTZEROVALUED_UTXOS: 0xdf,
  OP_REFOUTPUTCOUNTZEROVALUED_OUTPUTS: 0xe0,
  OP_REFDATASUMMARY_UTXO: 0xe1,
  OP_REFDATASUMMARY_OUTPUT: 0xe2,
  OP_CODESCRIPTHASHVALUESUM_UTXOS: 0xe3,
  OP_CODESCRIPTHASHVALUESUM_OUTPUTS: 0xe4,
  OP_CODESCRIPTHASHOUTPUTCOUNT_UTXOS: 0xe5,
  OP_CODESCRIPTHASHOUTPUTCOUNT_OUTPUTS: 0xe6,
  OP_CODESCRIPTHASHZEROVALUEDOUTPUTCOUNT_UTXOS: 0xe7,
  OP_CODESCRIPTHASHZEROVALUEDOUTPUTCOUNT_OUTPUTS: 0xe8,
  OP_CODESCRIPTBYTECODE_UTXO: 0xe9,
  OP_CODESCRIPTBYTECODE_OUTPUT: 0xea,
  OP_STATESCRIPTBYTECODE_UTXO: 0xeb,
  OP_STATESCRIPTBYTECODE_OUTPUT: 0xec,
  OP_PUSH_TX_STATE: 0xed,

  // Invalid
  INVALIDOPCODE: 0xff,
} as const;

export type OpcodeValue = (typeof Opcodes)[keyof typeof Opcodes];
export type OpcodeName = keyof typeof Opcodes;

/**
 * Reverse mapping: opcode byte value -> name
 */
export const OpcodeNames: Record<number, string> = Object.fromEntries(
  Object.entries(Opcodes).map(([name, value]) => [value, name])
);

/**
 * Get opcode name from byte value
 */
export function getOpcodeName(opcode: number): string {
  return OpcodeNames[opcode] ?? `UNKNOWN_0x${opcode.toString(16).padStart(2, '0')}`;
}

/**
 * Check if opcode is a Radiant-specific opcode (not in Bitcoin)
 */
export function isRadiantOpcode(opcode: number): boolean {
  return (opcode >= 0xbd && opcode <= 0xed) || 
         opcode === Opcodes.OP_CHECKDATASIG ||
         opcode === Opcodes.OP_CHECKDATASIGVERIFY ||
         opcode === Opcodes.OP_REVERSEBYTES;
}

/**
 * Check if opcode is a native introspection opcode
 */
export function isIntrospectionOpcode(opcode: number): boolean {
  return opcode >= 0xc0 && opcode <= 0xcd;
}

/**
 * Check if opcode is a reference opcode
 */
export function isReferenceOpcode(opcode: number): boolean {
  return opcode >= 0xd0 && opcode <= 0xed;
}

/**
 * Check if opcode is a state separator opcode
 */
export function isStateSeparatorOpcode(opcode: number): boolean {
  return opcode >= 0xbd && opcode <= 0xbf;
}

/**
 * Check if opcode is a push data opcode (0x00-0x4e)
 */
export function isPushOpcode(opcode: number): boolean {
  return opcode <= 0x4e;
}

/**
 * Check if opcode is disabled in Bitcoin but enabled in Radiant
 */
export function isReenabledOpcode(opcode: number): boolean {
  const reenabledOpcodes: number[] = [
    Opcodes.OP_CAT,
    Opcodes.OP_SPLIT,
    Opcodes.OP_AND,
    Opcodes.OP_OR,
    Opcodes.OP_XOR,
    Opcodes.OP_DIV,
    Opcodes.OP_MOD,
    Opcodes.OP_MUL,
    Opcodes.OP_NUM2BIN,
    Opcodes.OP_BIN2NUM,
    Opcodes.OP_INVERT,
    Opcodes.OP_2MUL,
    Opcodes.OP_2DIV,
    Opcodes.OP_LSHIFT,
    Opcodes.OP_RSHIFT,
  ];
  return reenabledOpcodes.includes(opcode);
}

export default Opcodes;
