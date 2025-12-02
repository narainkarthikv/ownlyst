# 🎴 Sticky-Memo

> **Your lightweight, fast, and intuitive sticky note app for organizing thoughts and ideas**

Welcome to **Sticky-Memo** — a modern React application for creating, managing, and organizing digital sticky notes. Built with **React + TypeScript**, **Vite**, **TailwindCSS**, and **Framer Motion**, this project is perfect for learning full-stack development, contributing to open source, and building productive note-taking solutions.

[![GitHub issues](https://img.shields.io/github/issues/narainkarthikv/sticky-memo?style=flat-square)](https://github.com/narainkarthikv/sticky-memo/issues)
[![GitHub forks](https://img.shields.io/github/forks/narainkarthikv/sticky-memo?style=flat-square)](https://github.com/narainkarthikv/sticky-memo/network)
[![GitHub stars](https://img.shields.io/github/stars/narainkarthikv/sticky-memo?style=flat-square)](https://github.com/narainkarthikv/sticky-memo/stargazers)
[![MIT License](https://img.shields.io/github/license/narainkarthikv/sticky-memo?style=flat-square)](./MIT-LICENSE.txt)

---

## 🌟 Why Sticky-Memo?

Sticky-Memo is a lightweight, single-page application designed to help you **capture ideas**, **organize thoughts**, and **boost productivity**. Whether you're a student, professional, or developer, Sticky-Memo provides an intuitive interface for note management with beautiful UI and smooth animations.

✨ **Key Features:**

- ✍️ **Create & Edit Notes** — Instantly create, edit, and delete sticky notes
- 🎨 **Customizable Themes** — Switch between light and dark themes
- 🎯 **Multiple Views** — Organize notes with Kanban, Table, and Roadmap views
- 📊 **Color Coding** — Assign colors to notes for better categorization
- 💾 **Local Storage** — All notes are saved locally in your browser
- ⚡ **Blazing Fast** — Powered by Vite for instant load times
- 📱 **Fully Responsive** — Works seamlessly on desktop, tablet, and mobile
- 🔗 **Drag & Drop** — Organize notes with smooth drag-and-drop functionality
- 🌐 **Multi-Page Experience** — Features, Pricing, Blog, Documentation, and Help Center pages

---

## 📑 Table of Contents

- [Why Sticky-Memo?](#-why-sticky-memo)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Environment Setup](#-environment-setup)
- [Development Standards](#-development-standards)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Contributors](#-contributors)
- [Support](#-support)
- [License](#-license)

---

## 🌐 Live Demo

👉 **[Live Preview](https://sticky-memo-dev.vercel.app/)** — Try Sticky-Memo now!

Experience the power of effortless note-taking with our live demo.

---

## 🛠️ Tech Stack

| Layer        | Technologies                                                      |
| ------------ | ----------------------------------------------------------------- |
| **Frontend** | React 18, TypeScript, Vite, TailwindCSS, Framer Motion, React Router |
| **Tooling**  | ESLint, Prettier, PostCSS, Autoprefixer                          |
| **Storage**  | Browser LocalStorage                                              |
| **Build**    | Vite (Fast build tool), Vercel (Deployment)                       |

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,typescript,vite,tailwind,javascript" />
</p>

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) — [Download here](https://nodejs.org/)
- **npm** (v9.0.0 or higher) — Usually comes with Node.js
- **Git** — [Download here](https://git-scm.com/)

To check your versions:

```bash
node --version
npm --version
git --version
```

### Installation

1. **Fork the repository**

   Click the **Fork** button on the top-right corner of the [GitHub repository](https://github.com/narainkarthikv/sticky-memo).

2. **Clone your fork**

   ```bash
   git clone https://github.com/<your-username>/sticky-memo.git
   cd sticky-memo
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Your app will be available at **[http://localhost:5173](http://localhost:5173)**

For production build:

```bash
npm run build
```

---

## 🗂️ Project Structure

```plaintext
sticky-memo/
├── public/
│   └── site.webmanifest
├── src/
│   ├── components/
│   │   ├── ColorPicker.tsx         # Color selection component
│   │   ├── KanbanView.tsx          # Kanban board layout
│   │   ├── Logo.tsx                # Logo component
│   │   ├── NoteModal.tsx           # Note creation/editing modal
│   │   ├── NotesView.tsx           # Default notes view
│   │   ├── RoadmapView.tsx         # Roadmap visualization
│   │   ├── TableView.tsx           # Table layout for notes
│   │   ├── ThemeProvider.tsx       # Theme context provider
│   │   └── ThemeToggle.tsx         # Dark/light mode toggle
│   ├── data/
│   │   └── sampleNotes.json        # Sample note data
│   ├── hooks/
│   │   ├── useLocalStorage.ts      # Custom hook for localStorage
│   │   └── useTheme.ts             # Custom theme hook
│   ├── pages/
│   │   ├── AboutPage.tsx           # About page
│   │   ├── BlogPage.tsx            # Blog page
│   │   ├── CommunityPage.tsx       # Community page
│   │   ├── ContactPage.tsx         # Contact page
│   │   ├── DocumentationPage.tsx   # Documentation
│   │   ├── FeaturesPage.tsx        # Features page
│   │   ├── HelpCenterPage.tsx      # Help center
│   │   ├── LandingPage.tsx         # Landing page
│   │   ├── NotesApp.tsx            # Main notes application
│   │   ├── PricingPage.tsx         # Pricing page
│   │   └── UpdatesPage.tsx         # Updates/changelog page
│   ├── types/
│   │   └── Note.ts                 # TypeScript type definitions
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Entry point
│   ├── index.css                   # Global styles
│   └── vite-env.d.ts               # Vite environment types
├── index.html
├── package.json
├── vite.config.js                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # TailwindCSS configuration
├── postcss.config.js               # PostCSS configuration
├── eslint.config.js                # ESLint configuration
└── README.md
```

---

## 📝 Available Scripts

### Development

```bash
# Start development server with hot reload
npm run dev
```

### Production

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Code Quality

```bash
# Run ESLint to check code style
npm run lint

# Fix linting issues automatically
npm run lint -- --fix
```

---

## 🔧 Development Standards

### Code Style

- **Formatting & Linting:**
  - ESLint for code quality
  - Prettier for consistent formatting
  - 2-space indentation
  - Max line length: 100 characters
  - Use semicolons in all statements

- **React Best Practices:**
  - Use functional components with React Hooks
  - Keep components small and reusable
  - Props validation with TypeScript
  - Proper error boundaries
  - Memoization for performance optimization

- **TypeScript:**
  - Strict mode enabled
  - Type all function parameters and returns
  - No implicit `any` types
  - Use interfaces for object shapes

- **Documentation:**
  - JSDoc comments for components and functions
  - Inline comments for complex logic
  - Keep README updated
  - Document component props and usage

### Git Workflow

- **Branch Naming:**
  - Features: `feature/description` (e.g., `feature/kanban-view`)
  - Bugs: `fix/description` (e.g., `fix/color-picker-bug`)
  - Docs: `docs/description` (e.g., `docs/update-readme`)
  - Chores: `chore/description` (e.g., `chore/update-dependencies`)

- **Commits:**
  - Follow [Conventional Commits](https://www.conventionalcommits.org/) specification
  - Examples:
    - `feat: add kanban board view`
    - `fix: resolve theme toggle not persisting`
    - `docs: update installation guide`
    - `refactor: optimize note filtering logic`
    - `style: format components with prettier`

- **Pull Requests:**
  - Keep PRs small and focused on one feature/fix
  - Link related issues using `Closes #123`
  - Provide clear description and context
  - Request reviews from maintainers
  - Ensure all checks pass before merging

### Testing (To be implemented)

- **Coverage Goals:**
  - Aim for ≥ 80% test coverage
  - Test all critical paths

- **Test Types:**
  - **Unit Tests:** Test individual functions and components
  - **Integration Tests:** Test component interactions
  - **E2E Tests:** Test critical user workflows

- **Tools:**
  - Vitest for unit testing
  - React Testing Library for component testing

### Code Review Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style guidelines
- [ ] Changes are well-documented with comments
- [ ] Tests added/updated (when applicable)
- [ ] No console.log() statements in production code
- [ ] No breaking changes without documentation
- [ ] Performance impact has been considered
- [ ] TypeScript types are properly defined
- [ ] Mobile responsiveness is maintained

---

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the correct URL.

```bash
# To find what's using port 5173
lsof -i :5173

# If needed, kill the process
kill -9 <PID>
```

### Dependencies Installation Issues

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules

# Reinstall dependencies
npm install
```

### Build Errors

```bash
# Check Node.js version (should be 18+)
node --version

# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall and rebuild
npm install
npm run build
```

### Hot Reload Not Working

```bash
# Ensure you're running the dev server correctly
npm run dev

# Check if file watchers are working
cat /proc/sys/fs/inotify/max_user_watches

# If limit is low, increase it (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Theme Not Persisting

Check your browser's LocalStorage is enabled:

```javascript
// In browser console
localStorage.getItem('theme')
```

---

## 🤝 Contributing

We ❤️ contributions! Here's how to get started:

1. **Fork the repository**

   Click the **Fork** button on [GitHub](https://github.com/narainkarthikv/sticky-memo).

2. **Clone your fork**

   ```bash
   git clone https://github.com/<your-username>/sticky-memo.git
   cd sticky-memo
   ```

3. **Create a feature branch**

   ```bash
   git switch -c feature/your-feature-name
   ```

4. **Make your changes**

   - Write clean, well-documented code
   - Follow the development standards above
   - Test your changes locally

5. **Stage and commit**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**

   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch and provide a clear description
   - Reference any related issues (e.g., "Closes #42")

### Types of Contributions We Welcome

- 🎯 **New Features** — Add functionality that improves productivity
- 🐛 **Bug Fixes** — Help us squash bugs
- 📖 **Documentation** — Improve guides, comments, and examples
- 🎨 **UI/UX Improvements** — Make the interface more beautiful and intuitive
- ♿ **Accessibility** — Ensure the app works for everyone
- ⚡ **Performance** — Optimize speed and efficiency
- 🌍 **Internationalization** — Add language support

---

## 👥 Contributors

Thanks to everyone who has helped make Sticky-Memo awesome! 💪

<a href="https://github.com/narainkarthikv/sticky-memo/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=narainkarthikv/sticky-memo" />
</a>

See the [Contributors Page](https://github.com/narainkarthikv/sticky-memo/blob/main/Contributors.md) for the full list.

### How to Add Yourself

When your PR is merged, add yourself to the `Contributors.md` file following the format in that file.

---

## 🙏 Support

If you find Sticky-Memo helpful:

- ⭐ **Star the repository** on GitHub
- 🐛 **Report bugs** through [Issues](https://github.com/narainkarthikv/sticky-memo/issues)
- 💡 **Suggest features** in [Discussions](https://github.com/narainkarthikv/sticky-memo/discussions)
- 📢 **Share** Sticky-Memo with your network
- 💬 **Participate** in community discussions

---

## 📜 License

This project is licensed under the **MIT License**.

See the [MIT-LICENSE.txt](https://github.com/narainkarthikv/sticky-memo/blob/main/MIT-LICENSE.txt) file for full details.

**Summary:** You are free to use, modify, and distribute this software for any purpose, including commercial use.

---

## 🔗 Quick Links

- **Website:** [sticky-memo-dev.vercel.app](https://sticky-memo-dev.vercel.app/)
- **GitHub Repository:** [narainkarthikv/sticky-memo](https://github.com/narainkarthikv/sticky-memo)
- **Issues:** [Report a bug or request a feature](https://github.com/narainkarthikv/sticky-memo/issues)
- **Discussions:** [Join the community](https://github.com/narainkarthikv/sticky-memo/discussions)
- **Contributing Guide:** [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 💡 Final Thoughts

We're building **Sticky-Memo** as a collaborative tool to help people organize their thoughts and boost productivity. Your code, ideas, and feedback make it stronger every day.

Whether you're fixing a typo, improving performance, adding a new view type, or building amazing features — **every contribution matters!** 🏗️💚

Let's build the best note-taking app together! 🚀

---

<p align="center">
  <strong>Made with ❤️ by the Sticky-Memo community</strong>
</p>

---
