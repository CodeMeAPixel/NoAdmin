# Security Policy

## 🔒 Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

### How to Report

**Do NOT open a public issue for security vulnerabilities.**

Instead, please email the maintainers directly or use GitHub's private vulnerability reporting feature.

### What to Include

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes (if applicable)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution**: Depends on severity and complexity

## 🛡️ Security Considerations

This is a static educational website. However, we still take security seriously:

### What We Protect

- No user data is collected or stored
- No authentication systems
- No server-side processing of sensitive data

### Best Practices We Follow

- Dependencies are regularly updated
- No inline scripts that could be exploited
- CSP headers configured (when deployed)
- All external links use `rel="noopener noreferrer"`

## 📦 Dependency Security

We use [Dependabot](https://github.com/dependabot) and regular audits to keep dependencies secure.

To check for vulnerabilities locally:

```bash
npm audit
# or
bun audit
```

## 🙏 Acknowledgments

We appreciate security researchers who help keep this project safe. Responsible disclosures will be acknowledged in our README (with your permission).
