/**
 * @radiantblockchain/constants - Network Parameters
 * 
 * Network-specific parameters for Radiant Blockchain.
 * 
 * Reference: Radiant-Core src/chainparams.cpp
 */

export interface NetworkParams {
  name: string;
  alias: string;
  pubKeyHash: number;
  scriptHash: number;
  privateKey: number;
  xpubkey: number;
  xprivkey: number;
  networkMagic: Uint8Array;
  port: number;
  dnsSeeds: string[];
}

/**
 * Mainnet parameters
 */
export const mainnet: NetworkParams = {
  name: 'mainnet',
  alias: 'livenet',
  pubKeyHash: 0x00,
  scriptHash: 0x05,
  privateKey: 0x80,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  networkMagic: new Uint8Array([0xf9, 0xbe, 0xb4, 0xd9]),
  port: 7333,
  dnsSeeds: [
    'seed.radiantblockchain.org',
    'seed.radiant.ovh',
  ],
};

/**
 * Testnet parameters
 */
export const testnet: NetworkParams = {
  name: 'testnet',
  alias: 'testnet',
  pubKeyHash: 0x6f,
  scriptHash: 0xc4,
  privateKey: 0xef,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394,
  networkMagic: new Uint8Array([0x0b, 0x11, 0x09, 0x07]),
  port: 17333,
  dnsSeeds: [
    'testnet-seed.radiantblockchain.org',
  ],
};

/**
 * Regtest parameters
 */
export const regtest: NetworkParams = {
  name: 'regtest',
  alias: 'regtest',
  pubKeyHash: 0x6f,
  scriptHash: 0xc4,
  privateKey: 0xef,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394,
  networkMagic: new Uint8Array([0xfa, 0xbf, 0xb5, 0xda]),
  port: 18444,
  dnsSeeds: [],
};

/**
 * All networks
 */
export const Networks = {
  mainnet,
  testnet,
  regtest,
  livenet: mainnet,
} as const;

export type NetworkName = keyof typeof Networks;

/**
 * Get network by name
 */
export function getNetwork(name: string): NetworkParams | undefined {
  const normalizedName = name.toLowerCase();
  return Networks[normalizedName as NetworkName];
}

/**
 * Get network by magic bytes
 */
export function getNetworkByMagic(magic: Uint8Array): NetworkParams | undefined {
  for (const network of [mainnet, testnet, regtest]) {
    if (arraysEqual(network.networkMagic, magic)) {
      return network;
    }
  }
  return undefined;
}

function arraysEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Check if network is mainnet
 */
export function isMainnet(network: NetworkParams | string): boolean {
  if (typeof network === 'string') {
    return network === 'mainnet' || network === 'livenet';
  }
  return network.name === 'mainnet';
}

/**
 * Check if network is testnet
 */
export function isTestnet(network: NetworkParams | string): boolean {
  if (typeof network === 'string') {
    return network === 'testnet';
  }
  return network.name === 'testnet';
}

/**
 * Check if network is regtest
 */
export function isRegtest(network: NetworkParams | string): boolean {
  if (typeof network === 'string') {
    return network === 'regtest';
  }
  return network.name === 'regtest';
}

/**
 * Default Electrum servers for each network
 */
export const ElectrumServers = {
  mainnet: [
    { host: 'electrum.radiant.ovh', port: 50002, protocol: 'ssl' },
    { host: 'electrum.radiantblockchain.org', port: 50002, protocol: 'ssl' },
  ],
  testnet: [
    { host: 'testnet-electrum.radiant.ovh', port: 50002, protocol: 'ssl' },
  ],
  regtest: [],
} as const;

export default Networks;
