# Security Policy

## Our Commitment

The Sticky Memo project takes security seriously. We appreciate the security research community's efforts in responsibly disclosing vulnerabilities and are committed to working with security researchers to verify, reproduce, and respond to legitimate reported vulnerabilities.

## Supported Versions

We release security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

### For Critical Vulnerabilities

If you discover a critical security vulnerability, please use GitHub's Security Advisory feature:

1. Navigate to the [Security tab](https://github.com/narainkarthikv/sticky-memo/security/advisories)
2. Click **"Report a vulnerability"**
3. Fill out the security advisory form with as much detail as possible

### What to Include

When reporting a vulnerability, please include:

- **Description**: Clear description of the vulnerability
- **Impact**: Potential impact if exploited
- **Affected Components**: Which parts of the application are affected
- **Steps to Reproduce**: Detailed steps to reproduce the vulnerability
- **Proof of Concept**: If applicable (but avoid providing full exploit code publicly)
- **Suggested Fix**: If you have ideas on how to fix it
- **Your Contact Information**: So we can follow up with questions

### What NOT to Include

- Do **not** include exploit code in public reports
- Do **not** disclose the vulnerability publicly before we've had a chance to address it
- Do **not** include personally identifiable information (PII) from other users
- Do **not** include credentials, tokens, or sensitive configuration data

## Response Timeline

We will make our best effort to respond to security reports according to the following timeline:

- **Initial Response**: Within 48 hours of report submission
- **Status Update**: Within 7 days with either a fix plan or reason for dismissal
- **Resolution**: Varies based on complexity, but we aim for 30 days for critical issues

## Security Best Practices for Users

Since Sticky Memo is a client-side application that stores data locally:

1. **Keep Your Browser Updated**: Use the latest version of your browser
2. **Export Regularly**: Regularly export your notes as backups
3. **Use HTTPS**: Always access the application over HTTPS
4. **Browser Extensions**: Be cautious with browser extensions that may access page data
5. **Shared Devices**: Use private/incognito mode on shared devices or clear browser data after use
6. **Review Permissions**: Understand that notes are stored in browser localStorage/IndexedDB

## Known Security Considerations

- **Local Storage**: Notes are stored in browser localStorage/IndexedDB, which is accessible to JavaScript on the same origin
- **No Encryption**: Notes are not encrypted at rest in browser storage
- **No Server**: All data stays on your device; there is no server-side component
- **Export Files**: Exported JSON/CSV files contain unencrypted note data

## Security-Related Configuration

This project does not collect, transmit, or store data on external servers. All operations happen client-side in your browser.

## Public Disclosure Policy

After a security issue is fixed:

1. We will coordinate with the reporter on an appropriate disclosure timeline
2. We will publish a security advisory on GitHub
3. We will credit the reporter (unless they prefer to remain anonymous)
4. We will update the CHANGELOG with security fix details

## Scope

### In Scope
- Security vulnerabilities in the application code
- Client-side security issues (XSS, CSRF, etc.)
- Dependency vulnerabilities with active exploits
- Privacy leaks or data exposure issues

### Out of Scope
- Social engineering attacks
- Physical attacks on user devices
- Browser vulnerabilities (report to browser vendors)
- Issues in user-configured environments
- Denial of service attacks on the public demo (it's client-side only)

## Contact

For general security questions (non-vulnerabilities), you can:
- Open a [GitHub Discussion](https://github.com/narainkarthikv/sticky-memo/discussions)
- Email the maintainers (check repository for current contact)

## Recognition

We appreciate security researchers who help keep Sticky Memo secure. With your permission, we will acknowledge your contribution in:
- Security advisories
- CHANGELOG
- Contributors list

Thank you for helping keep Sticky Memo and its users safe!
