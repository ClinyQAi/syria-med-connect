# Contributing to Syria-Med Connect

Thank you for your interest in contributing to Syria-Med Connect! This document provides guidelines for contributions.

## 🔒 Review Process

All contributions require review and approval from the project maintainers before being merged.

- **All PRs must be approved** by a code owner before merging
- PRs that fail CI checks will not be merged
- Please be patient - we review contributions as quickly as possible

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/syria-med-connect.git
cd syria-med-connect

# Install dependencies
cd app
npm install

# Start development server
npm run dev
```

## 📝 Contribution Guidelines

### 1. Fork and Branch

1. Fork this repository
2. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### 2. Make Changes

- Follow existing code style
- Write meaningful commit messages
- Add/update tests if applicable
- Update documentation as needed

### 3. Commit Messages

Use clear, descriptive commit messages:

```
feat: add workshop waitlist notifications
fix: correct credit deduction on booking
docs: update README with new screenshots
style: format code with prettier
```

### 4. Submit a Pull Request

1. Push your branch to your fork
2. Open a Pull Request against `main`
3. Fill out the PR template
4. Wait for CI checks to pass
5. Address any review feedback

## 🧪 Running Tests

```bash
cd app
npm run build     # Verify build passes
npm run lint      # Check code style (if configured)
```

## 📋 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a positive community

## 🐛 Reporting Issues

Found a bug? Please open an issue with:

1. Description of the problem
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots if applicable

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Questions? Open an issue or contact the maintainers.
