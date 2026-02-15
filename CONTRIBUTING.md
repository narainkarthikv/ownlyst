# Contributing to Sticky Memo

Thank you for your interest in contributing! Sticky Memo is built by volunteers like you, and we appreciate every contribution—no matter how small.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Community](#community)

## Code of Conduct

This project adheres to a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior through GitHub issues or contact the maintainers.

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Git** for version control
- A **GitHub account**
- A text editor or IDE (VS Code recommended)

### Local Setup

1. **Fork the repository**

   Click the "Fork" button at the top-right of the [repository page](https://github.com/narainkarthikv/sticky-memo).

2. **Clone your fork**

   ```bash
   git clone https://github.com/your-username/sticky-memo.git
   cd sticky-memo
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/narainkarthikv/sticky-memo.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

6. **Verify setup**

   Open http://localhost:5173 and verify the app runs correctly.

## How to Contribute

### Types of Contributions Welcome

- 🐛 **Bug Fixes**: Fix issues or unexpected behavior
- ✨ **Features**: Add new functionality
- 📚 **Documentation**: Improve guides, comments, or examples
- 🎨 **UI/UX**: Enhance design and user experience
- ♿ **Accessibility**: Improve keyboard navigation, screen readers, ARIA
- ⚡ **Performance**: Optimize speed and reduce bundle size
- 🧪 **Tests**: Add or improve test coverage
- 🌍 **i18n**: Add translations and internationalization

### Finding Something to Work On

- Browse [open issues](https://github.com/narainkarthikv/sticky-memo/issues)
- Look for `good first issue` or `help wanted` labels
- Check [discussions](https://github.com/narainkarthikv/sticky-memo/discussions) for ideas
- Propose your own ideas by opening an issue first

**Pro Tip**: Comment on an issue to let others know you're working on it.

## Development Workflow

### 1. Sync Your Fork

Always sync with the upstream repository before starting new work:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. Create a Feature Branch

Use descriptive branch names:

```bash
git checkout -b feature/add-export-pdf
git checkout -b fix/search-not-working
git checkout -b docs/update-readme
```

**Branch Naming Convention**:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `perf/` - Performance improvements
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 3. Make Your Changes

- Keep changes focused on a single issue
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly

### 4. Test Locally

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Test in multiple browsers if possible
```

### 5. Commit Your Changes

See [Commit Guidelines](#commit-guidelines) below.

### 6. Push and Create PR

```bash
git push origin feature/your-branch-name
```

Then open a Pull Request on GitHub.

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types; avoid `any`
- Use interfaces for object shapes
- Enable strict mode

```typescript
// Good
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

// Avoid
const note: any = { ... };
```

### React

- Use functional components with hooks
- Prefer named exports over default exports
- Keep components small and focused (< 200 lines)
- Extract complex logic into custom hooks
- Use descriptive prop names

```typescript
// Good
export const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  // ...
};

// Avoid overly complex components
```

### Styling

- Use TailwindCSS utility classes
- Keep custom CSS minimal
- Ensure responsive design (mobile-first)
- Test in light and dark modes
- Follow existing color schemes

### Code Organization

- Group related functionality together
- Use barrel exports (`index.ts`) for cleaner imports
- Keep files focused on a single responsibility
- Place reusable components in `components/shared/`

### Performance

- Memoize expensive computations with `useMemo`
- Use `useCallback` for callback functions passed as props
- Lazy load routes and heavy components
- Optimize images and assets
- Avoid unnecessary re-renders

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear, semantic commit messages.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style/formatting (no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `build`: Build system or dependencies
- `ci`: CI/CD changes
- `chore`: Maintenance tasks

### Examples

```bash
feat: add PDF export functionality

fix: resolve search not filtering by tags

docs: update installation instructions in README

refactor: extract filtering logic into custom hook

perf: optimize note rendering with virtualization

style: format code with prettier
```

### Commit Best Practices

- Use imperative mood ("add" not "added" or "adds")
- Keep subject line under 72 characters
- Capitalize the subject line
- Don't end subject with a period
- Separate subject from body with a blank line
- Explain _what_ and _why_ in the body, not _how_

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Self-reviewed your code
- [ ] Added comments for complex logic
- [ ] Updated documentation if needed
- [ ] No console.log statements in production code
- [ ] Tested locally in multiple scenarios
- [ ] All checks pass (lint, build)
- [ ] PR is focused on one feature/fix

### PR Description

Use the PR template to provide:

- Clear summary of changes
- Link to related issues (`Fixes #123`)
- Type of change (bug fix, feature, etc.)
- Testing steps
- Screenshots for UI changes
- Breaking changes (if any)

### Review Process

1. Maintainers will review your PR within 3-7 days
2. Address feedback by pushing new commits
3. Don't force push after review starts
4. Engage constructively with reviewers
5. Once approved, a maintainer will merge

### After Merge

- Delete your feature branch
- Sync your fork with upstream
- Celebrate your contribution! 🎉

## Reporting Bugs

Found a bug? Help us fix it!

1. **Check existing issues** first to avoid duplicates
2. **Use the bug report template** when creating an issue
3. **Provide details**:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS info
   - Screenshots if applicable
   - Console errors (F12 → Console)
4. **Be respectful** and patient

**Security Issues**: Do not report security vulnerabilities publicly. See [SECURITY.md](./SECURITY.md) for responsible disclosure.

## Suggesting Features

Have an idea? We'd love to hear it!

1. **Check existing issues and discussions** first
2. **Open a feature request** using the template
3. **Explain the use case**:
   - What problem does it solve?
   - Who would benefit?
   - How should it work?
4. **Be open to discussion** and alternative approaches

**Note**: Not all features will be accepted. We prioritize privacy, simplicity, and core functionality.

## Community

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions, ideas, and general chat
- **Code of Conduct**: Review our community standards

### Recognition

Contributors are recognized in:

- [Contributors.md](./Contributors.md) file
- GitHub contributors graph
- Release notes (for significant contributions)

### Tips for New Contributors

- Start with `good first issue` labels
- Don't hesitate to ask questions
- Small PRs are easier to review and merge
- Quality over quantity
- Read existing code to understand patterns
- Test your changes in different browsers
- Be patient and respectful

## Questions?

If you have questions not covered here:

- Open a [GitHub Discussion](https://github.com/narainkarthikv/sticky-memo/discussions)
- Comment on a related issue
- Reach out to maintainers

---

**Thank you for contributing to Sticky Memo!** 🚀

Every contribution makes this project better for everyone.
