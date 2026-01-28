# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Email security concerns to the maintainers
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact

### Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days

## Security Considerations

This package provides constant values and protocol identifiers for the Radiant blockchain. Security considerations:

1. **Immutable Values:** Constants should never change after publication
2. **Validation Functions:** Use provided validation functions for protocol compliance
3. **Type Safety:** TypeScript types help prevent misuse

### Usage Guidelines

- Always use the latest version for up-to-date protocol constants
- Do not modify exported values at runtime
- Use validation functions rather than raw comparisons

---

*Last updated: January 2026*
