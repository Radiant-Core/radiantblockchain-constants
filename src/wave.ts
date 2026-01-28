/**
 * @radiantblockchain/constants - WAVE Protocol Constants and Utilities
 * 
 * Reference implementation for WAVE: A Peer-to-Peer Radiant Blockchain Name System
 * 
 * @see REP-3011: WAVE Protocol Specification
 * @see https://github.com/Radiant-Core/WAVE-Protocol
 */

import { GlyphProtocol } from './glyph';

// =============================================================================
// Constants
// =============================================================================

/**
 * WAVE protocol character set (37 characters)
 * Index 0-25: a-z
 * Index 26-35: 0-9
 * Index 36: hyphen
 */
export const WAVE_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789-';

/**
 * Number of outputs required for a WAVE registration transaction
 * Output 0: Claim Token
 * Outputs 1-37: Branch outputs for child names
 */
export const WAVE_OUTPUT_COUNT = 38;

/**
 * WAVE name limits
 */
export const WaveLimits = {
  /** Minimum name length */
  MIN_NAME_LENGTH: 1,
  /** Maximum name length (matches DNS label limit) */
  MAX_NAME_LENGTH: 63,
  /** Maximum subdomain depth */
  MAX_SUBDOMAIN_DEPTH: 127,
  /** Total character set size */
  CHAR_COUNT: 37,
} as const;

/**
 * WAVE protocol identifiers for Glyph metadata
 */
export const WaveProtocols = {
  /** Standard WAVE name with mutable zone records */
  WAVE_NAME: [GlyphProtocol.GLYPH_NFT, GlyphProtocol.GLYPH_MUT, GlyphProtocol.GLYPH_WAVE],
  /** Immutable WAVE name (no zone updates) */
  WAVE_NAME_IMMUTABLE: [GlyphProtocol.GLYPH_NFT, GlyphProtocol.GLYPH_WAVE],
} as const;

/**
 * WAVE metadata schema identifiers
 */
export const WaveSchema = {
  NAMESPACE: 'rxd.wave',
  VERSION: 'wave_name_v1',
  TYPE: 'wave_name',
} as const;

/**
 * Standard zone record types
 */
export const ZoneRecordType = {
  /** Radiant payment address */
  ADDRESS: 'address',
  /** Avatar URL or content hash */
  AVATAR: 'avatar',
  /** Display name (can include Unicode) */
  DISPLAY: 'display',
  /** Profile description */
  DESCRIPTION: 'desc',
  /** Website URL */
  URL: 'url',
  /** Contact email */
  EMAIL: 'email',
  /** IPv4 address (A record) */
  A: 'A',
  /** IPv6 address (AAAA record) */
  AAAA: 'AAAA',
  /** Canonical name alias */
  CNAME: 'CNAME',
  /** Text records */
  TXT: 'TXT',
  /** Mail exchange records */
  MX: 'MX',
  /** Nameserver records */
  NS: 'NS',
} as const;

/**
 * WAVE permission types for subdomain delegation
 */
export const WavePermission = {
  /** Can register subdomains */
  REGISTER: 'register',
  /** Can update zone records */
  UPDATE: 'update',
  /** Can delegate to others */
  DELEGATE: 'delegate',
  /** Can transfer ownership */
  TRANSFER: 'transfer',
  /** Can revoke delegations */
  REVOKE: 'revoke',
} as const;

// =============================================================================
// Types
// =============================================================================

/**
 * WAVE zone record object
 */
export interface WaveZoneRecords {
  address?: string;
  avatar?: string;
  display?: string;
  desc?: string;
  url?: string;
  email?: string;
  A?: string;
  AAAA?: string;
  CNAME?: string;
  TXT?: string[];
  MX?: Array<{ priority: number; host: string }>;
  NS?: string[];
  [key: `x-${string}`]: unknown; // Custom records with x- prefix
}

/**
 * WAVE subdomain delegation
 */
export interface WaveDelegation {
  address: string;
  permissions: Array<keyof typeof WavePermission>;
}

/**
 * WAVE name metadata (app.data section)
 */
export interface WaveNameData {
  name: string;
  parent: string | null;
  registered?: number;
  zone: WaveZoneRecords;
  delegations?: Record<string, WaveDelegation>;
}

/**
 * Complete WAVE Glyph metadata
 */
export interface WaveMetadata {
  v: 2;
  type: 'wave_name';
  p: number[];
  name?: string;
  desc?: string;
  app: {
    namespace: 'rxd.wave';
    schema: 'wave_name_v1';
    data: WaveNameData;
  };
  mutable?: {
    allowed: boolean;
    controller?: string;
    fields: string[];
  };
}

/**
 * Path step in resolution proof
 */
export interface WavePathStep {
  char: string;
  txid: string;
  vout: number;
}

/**
 * Resolution proof structure
 */
export interface WaveResolutionProof {
  path: WavePathStep[];
  claim_tx: string;
  current_owner: string;
}

/**
 * Complete resolution result
 */
export interface WaveResolution {
  name: string;
  claim_ref: string;
  proof: WaveResolutionProof;
  zone: WaveZoneRecords;
  owner: string;
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Convert a character to its WAVE index (0-36)
 * @throws Error if character is invalid
 */
export function charToIndex(char: string): number {
  if (char.length !== 1) {
    throw new Error(`Expected single character, got: "${char}"`);
  }
  const idx = WAVE_CHARS.indexOf(char.toLowerCase());
  if (idx === -1) {
    throw new Error(`Invalid WAVE character: "${char}"`);
  }
  return idx;
}

/**
 * Convert a WAVE index (0-36) to its character
 * @throws Error if index is out of range
 */
export function indexToChar(index: number): string {
  if (index < 0 || index >= WAVE_CHARS.length) {
    throw new Error(`Invalid WAVE index: ${index} (must be 0-36)`);
  }
  return WAVE_CHARS[index];
}

/**
 * Get the output index for a character's branch
 * Branch outputs start at index 1 (index 0 is Claim Token)
 */
export function charToOutputIndex(char: string): number {
  return charToIndex(char) + 1;
}

/**
 * Get the character for a branch output index
 */
export function outputIndexToChar(outputIndex: number): string {
  if (outputIndex < 1 || outputIndex > 37) {
    throw new Error(`Invalid branch output index: ${outputIndex} (must be 1-37)`);
  }
  return indexToChar(outputIndex - 1);
}

/**
 * Validate a WAVE name
 */
export function validateWaveName(name: string): { valid: boolean; error?: string } {
  if (!name || name.length === 0) {
    return { valid: false, error: 'Name cannot be empty' };
  }

  if (name.length > WaveLimits.MAX_NAME_LENGTH) {
    return { valid: false, error: `Name exceeds maximum length of ${WaveLimits.MAX_NAME_LENGTH}` };
  }

  // Check for leading/trailing hyphens
  if (name.startsWith('-')) {
    return { valid: false, error: 'Name cannot start with hyphen' };
  }
  if (name.endsWith('-')) {
    return { valid: false, error: 'Name cannot end with hyphen' };
  }

  // Check for consecutive hyphens (except for Punycode prefix)
  if (name.includes('--') && !name.startsWith('xn--')) {
    return { valid: false, error: 'Name cannot contain consecutive hyphens (except Punycode prefix)' };
  }

  // Check all characters are valid
  const lowerName = name.toLowerCase();
  for (const char of lowerName) {
    if (!WAVE_CHARS.includes(char)) {
      return { valid: false, error: `Invalid character: "${char}"` };
    }
  }

  return { valid: true };
}

/**
 * Check if a name is a Punycode-encoded internationalized name
 */
export function isPunycode(name: string): boolean {
  return name.toLowerCase().startsWith('xn--');
}

/**
 * Parse a full domain into labels (e.g., "mail.alice" -> ["mail", "alice"])
 */
export function parseLabels(domain: string): string[] {
  return domain.split('.').filter(label => label.length > 0);
}

/**
 * Join labels into a full domain
 */
export function joinLabels(labels: string[]): string {
  return labels.join('.');
}

/**
 * Validate a full domain (including subdomains)
 */
export function validateDomain(domain: string): { valid: boolean; error?: string } {
  const labels = parseLabels(domain);

  if (labels.length === 0) {
    return { valid: false, error: 'Domain cannot be empty' };
  }

  if (labels.length > WaveLimits.MAX_SUBDOMAIN_DEPTH) {
    return { valid: false, error: `Domain exceeds maximum depth of ${WaveLimits.MAX_SUBDOMAIN_DEPTH}` };
  }

  for (const label of labels) {
    const result = validateWaveName(label);
    if (!result.valid) {
      return { valid: false, error: `Invalid label "${label}": ${result.error}` };
    }
  }

  return { valid: true };
}

/**
 * Create WAVE name Glyph metadata
 */
export function createWaveMetadata(
  name: string,
  parentRef: string | null,
  zone: WaveZoneRecords = {},
  options: {
    mutable?: boolean;
    controllerRef?: string;
    description?: string;
  } = {}
): WaveMetadata {
  const validation = validateWaveName(name);
  if (!validation.valid) {
    throw new Error(`Invalid name: ${validation.error}`);
  }

  const metadata: WaveMetadata = {
    v: 2,
    type: 'wave_name',
    p: options.mutable !== false ? [...WaveProtocols.WAVE_NAME] : [...WaveProtocols.WAVE_NAME_IMMUTABLE],
    name,
    app: {
      namespace: WaveSchema.NAMESPACE,
      schema: WaveSchema.VERSION,
      data: {
        name,
        parent: parentRef,
        zone,
      },
    },
  };

  if (options.description) {
    metadata.desc = options.description;
  }

  if (options.mutable !== false) {
    metadata.mutable = {
      allowed: true,
      fields: ['/app/data/zone'],
    };
    if (options.controllerRef) {
      metadata.mutable.controller = options.controllerRef;
    }
  }

  return metadata;
}

/**
 * Create zone record update payload
 */
export function createZoneUpdate(
  targetRef: string,
  updates: Partial<WaveZoneRecords>,
  controllerRef: string
): object {
  return {
    v: 2,
    schema: 'glyph_update_v1',
    target: targetRef,
    update: {
      op: 'merge',
      path: '/app/data/zone',
      value: updates,
    },
    auth: {
      controller: controllerRef,
    },
  };
}

/**
 * Calculate the character path for a name
 */
export function getCharacterPath(name: string): Array<{ char: string; index: number; outputIndex: number }> {
  const validation = validateWaveName(name);
  if (!validation.valid) {
    throw new Error(`Invalid name: ${validation.error}`);
  }

  return name.toLowerCase().split('').map(char => ({
    char,
    index: charToIndex(char),
    outputIndex: charToOutputIndex(char),
  }));
}

/**
 * Estimate the data size for name resolution
 * Based on REP-3011: ~1KB per transaction in path
 */
export function estimateResolutionSize(name: string, updateCount: number = 0): number {
  const baseSize = 1024; // 1KB per transaction
  const pathLength = name.length;
  const updateSize = updateCount * 500; // ~500 bytes per update tx

  return (pathLength + 1) * baseSize + updateSize;
}

// =============================================================================
// Exports
// =============================================================================

export default {
  // Constants
  WAVE_CHARS,
  WAVE_OUTPUT_COUNT,
  WaveLimits,
  WaveProtocols,
  WaveSchema,
  ZoneRecordType,
  WavePermission,

  // Functions
  charToIndex,
  indexToChar,
  charToOutputIndex,
  outputIndexToChar,
  validateWaveName,
  validateDomain,
  isPunycode,
  parseLabels,
  joinLabels,
  createWaveMetadata,
  createZoneUpdate,
  getCharacterPath,
  estimateResolutionSize,
};
