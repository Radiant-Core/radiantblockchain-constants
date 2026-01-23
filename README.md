# @radiantblockchain/constants

Shared constants for Radiant Blockchain development tools.

This package provides opcodes, limits, flags, and network parameters used across the Radiant ecosystem:
- **rxdeb** - Script debugger
- **radiantjs** - JavaScript SDK
- **RadiantScript** - Smart contract compiler

## Installation

```bash
npm install @radiantblockchain/constants
# or
yarn add @radiantblockchain/constants
```

## Usage

### Import Everything

```typescript
import {
  Opcodes,
  Limits,
  ScriptFlags,
  Networks,
  getOpcodeName,
  isRadiantOpcode,
} from '@radiantblockchain/constants';
```

### Import Specific Modules

```typescript
// Just opcodes
import { Opcodes, getOpcodeName } from '@radiantblockchain/constants/opcodes';

// Just limits
import { Limits, toPhotons } from '@radiantblockchain/constants/limits';

// Just flags
import { ScriptFlags, STANDARD_SCRIPT_VERIFY_FLAGS } from '@radiantblockchain/constants/flags';

// Just networks
import { mainnet, testnet, getNetwork } from '@radiantblockchain/constants/networks';
```

## API Reference

### Opcodes

```typescript
import { Opcodes, getOpcodeName, isRadiantOpcode } from '@radiantblockchain/constants';

// Get opcode value
console.log(Opcodes.OP_CHECKSIG);        // 0xac
console.log(Opcodes.OP_PUSHINPUTREF);    // 0xd0
console.log(Opcodes.OP_INPUTINDEX);      // 0xc0

// Get opcode name from value
console.log(getOpcodeName(0xac));        // "OP_CHECKSIG"
console.log(getOpcodeName(0xd0));        // "OP_PUSHINPUTREF"

// Check if opcode is Radiant-specific
console.log(isRadiantOpcode(0xac));      // false (Bitcoin opcode)
console.log(isRadiantOpcode(0xd0));      // true (Radiant opcode)
```

### Limits

```typescript
import { Limits, toPhotons, toRxd } from '@radiantblockchain/constants';

// Script limits
console.log(Limits.MAX_SCRIPT_SIZE);         // 32_000_000
console.log(Limits.MAX_STACK_SIZE);          // 32_000_000
console.log(Limits.MAX_SCRIPTNUM_SIZE);      // 8 (64-bit integers)

// Convert between RXD and photons
console.log(toPhotons(1.5));                 // 150000000n
console.log(toRxd(150000000n));              // 1.5
```

### Script Flags

```typescript
import { 
  ScriptFlags, 
  STANDARD_SCRIPT_VERIFY_FLAGS,
  hasFlag,
  getFlagNames 
} from '@radiantblockchain/constants';

// Check flags
const flags = STANDARD_SCRIPT_VERIFY_FLAGS;
console.log(hasFlag(flags, ScriptFlags.SCRIPT_64_BIT_INTEGERS));      // true
console.log(hasFlag(flags, ScriptFlags.SCRIPT_NATIVE_INTROSPECTION)); // true

// Get human-readable flag names
console.log(getFlagNames(flags));
// ["SCRIPT_VERIFY_P2SH", "SCRIPT_VERIFY_STRICTENC", ...]
```

### Networks

```typescript
import { mainnet, testnet, getNetwork, ElectrumServers } from '@radiantblockchain/constants';

// Network parameters
console.log(mainnet.port);           // 7333
console.log(mainnet.pubKeyHash);     // 0x00
console.log(testnet.pubKeyHash);     // 0x6f

// Get network by name
const network = getNetwork('mainnet');

// Electrum servers
console.log(ElectrumServers.mainnet);
// [{ host: 'electrum.radiant.ovh', port: 50002, protocol: 'ssl' }, ...]
```

## Radiant-Specific Opcodes

This package includes all Radiant-specific opcodes not found in Bitcoin:

### Native Introspection (0xC0-0xCD)
- `OP_INPUTINDEX` - Push current input index
- `OP_TXVERSION` - Push transaction version
- `OP_TXINPUTCOUNT` - Push number of inputs
- `OP_TXOUTPUTCOUNT` - Push number of outputs
- `OP_UTXOVALUE` - Push UTXO value at index
- `OP_UTXOBYTECODE` - Push UTXO script at index
- `OP_OUTPUTVALUE` - Push output value at index
- `OP_OUTPUTBYTECODE` - Push output script at index
- ... and more

### Reference Opcodes (0xD0-0xED)
- `OP_PUSHINPUTREF` - Push and track a reference
- `OP_REQUIREINPUTREF` - Require a reference exists
- `OP_REFVALUESUM_UTXOS` - Sum of values for a reference
- `OP_CODESCRIPTHASHVALUESUM_UTXOS` - Sum by code script hash
- ... and more

### State Separator (0xBD-0xBF)
- `OP_STATESEPARATOR` - Separates state from code script
- `OP_STATESEPARATORINDEX_UTXO` - Get separator index
- `OP_STATESEPARATORINDEX_OUTPUT` - Get separator index for output

## License

MIT
