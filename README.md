![License](https://img.shields.io/github/license/narainkarthikv/sticky-memo)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Last Commit](https://img.shields.io/github/last-commit/narainkarthikv/sticky-memo)
[![GitHub issues](https://img.shields.io/github/issues/narainkarthikv/sticky-memo)](https://github.com/narainkarthikv/sticky-memo/issues)
[![GitHub stars](https://img.shields.io/github/stars/narainkarthikv/sticky-memo)](https://github.com/narainkarthikv/sticky-memo/stargazers)

# Sticky Memo

**Privacy-first note-taking that runs entirely in your browser.**

Sticky Memo is a lightweight, local-first note management app. Create, organize, and search notes with complete privacy and zero backend dependency.

## ✨ Features

- **Multiple Views**: Notes grid, Kanban board, table view, and roadmap
- **Color Coding**: Organize notes by priority and status
- **Fast Search**: Instant note filtering and search
- **Dark Mode**: Built-in theme toggle
- **Drag & Drop**: Intuitive note organization
- **Import/Export**: Full data portability (JSON/CSV)
- **Responsive**: Works on desktop, tablet, and mobile
- **Offline Ready**: Works without internet after first load
- **No Tracking**: No analytics, no cookies, no telemetry

## 🔐 Privacy & Security First

- **Zero Server Dependency**: No backend, no cloud, no data transmission
- **Local Storage Only**: Notes stored in browser IndexedDB/localStorage
- **Full Data Control**: Export or clear data at any time
- **Open Source**: Transparent and auditable code

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher

### Local Installation

```bash
# Clone the repository
git clone https://github.com/narainkarthikv/sticky-memo.git
cd sticky-memo

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **http://localhost:5173** to see the app.

### Production Build

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **@hello-pangea/dnd** - Drag and drop
- **Lucide React** - Icons

<p align="center">
	<img src="https://skillicons.dev/icons?i=react,vite,ts,tailwind" alt="Tech Stack" />
</p>

## 📁 Project Structure

```
sticky-memo/
├── src/
│   ├── components/     # Reusable UI components
│   ├── constants/      # App constants and configs
│   ├── context/        # React context providers
│   ├── controllers/    # App-level controllers/providers
│   ├── data/           # Sample data
│   ├── hooks/          # Custom React hooks
│   ├── models/         # TypeScript types and validation
│   ├── pages/          # Page components
│   ├── services/       # Business logic and storage
│   ├── utils/          # Helpers (filtering, sorting, text)
│   └── views/          # View-specific components
├── public/             # Static assets
└── .github/            # GitHub templates and workflows
```

## 🔑 Environment Variables

Sticky Memo does not require any environment variables for local development.

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style Guidelines

- **Formatting**: Follow existing conventions and 2-space indentation
- **React**: Functional components with hooks
- **TypeScript**: Prefer typed props and models
- **Accessibility**: Semantic HTML and keyboard navigation

### Formatting (Prettier)

Run these from the repository root so Prettier checks both frontend and backend:

```bash
# Check formatting
npx prettier --check .

# Write formatting fixes
npx prettier --write .
```

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

1. **Read the Guidelines**: Check [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed instructions
2. **Pick an Issue**: Browse [open issues](https://github.com/narainkarthikv/sticky-memo/issues) or create a new one
3. **Fork & Branch**: Create a feature branch from your fork
4. **Code**: Follow our code style and commit conventions
5. **Test**: Ensure everything works locally
6. **Submit PR**: Open a pull request with a clear description

### Ways to Contribute

- 🐛 **Fix bugs** and improve stability
- ✨ **Add features** that enhance productivity
- 📚 **Improve documentation** and examples
- 🎨 **Enhance UI/UX** and accessibility
- ⚡ **Optimize performance**
- 🌍 **Add translations** and i18n support

## 💬 Community & Support

- **Issues**: [Report bugs or request features](https://github.com/narainkarthikv/sticky-memo/issues)
- **Discussions**: [Ask questions and share ideas](https://github.com/narainkarthikv/sticky-memo/discussions)
- **Pull Requests**: [Contribute code improvements](https://github.com/narainkarthikv/sticky-memo/pulls)

## 📖 Documentation

- [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- [Code of Conduct](./CODE_OF_CONDUCT.md) - Community guidelines
- [Security Policy](./SECURITY.md) - How to report vulnerabilities
- [Contributors](./Contributors.md) - Contributor list
- [License](./MIT-LICENSE.txt) - MIT License details

## 📜 License

This project is licensed under the **MIT License** - see [MIT-LICENSE.txt](./MIT-LICENSE.txt) for details.

**Summary:** You are free to use, modify, and distribute this software for any purpose, including commercial use.

## 🌟 Show Your Support

If Sticky Memo helps you stay organized:

- ⭐ Star the repository
- 🐛 Report issues you encounter
- 💡 Share your feature ideas
- 🤝 Contribute code or docs
- 📢 Tell others about the project

## 🔗 Links

- **Live Demo**: [https://wisdomfox-sticky-memo.netlify.app/](https://wisdomfox-sticky-memo.netlify.app/)
- **Repository**: [https://github.com/narainkarthikv/sticky-memo](https://github.com/narainkarthikv/sticky-memo)

---

**Built with ❤️ by the Wisdom Fox community**

Let's build the best privacy note-taking app together! 🚀
