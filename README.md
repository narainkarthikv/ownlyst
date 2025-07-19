

# 🎴 Sticky-Memo

Welcome to **Sticky-Memo**! This project lets you create and manage sticky notes using React.js, Vite, and MUI. It's a great way to practice your frontend skills, contribute to open source, and join a friendly community. Whether you're a beginner or a pro, your contribution is welcome! 🤍🤝

[![GitHub issues](https://img.shields.io/github/issues/narainkarthikv/sticky-memo?style=flat-square)](https://github.com/narainkarthikv/sticky-memo/issues)
[![GitHub forks](https://img.shields.io/github/forks/narainkarthikv/sticky-memo?style=flat-square)](https://github.com/narainkarthikv/sticky-memo/network)
[![GitHub stars](https://img.shields.io/github/stars/narainkarthikv/sticky-memo?style=flat-square)](https://github.com/narainkarthikv/sticky-memo/stargazers)
[![MIT License](https://img.shields.io/github/license/narainkarthikv/sticky-memo?style=flat-square)](./MIT-LICENSE.txt)

---

## 📚 Table of Contents

- [About](#about)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Project Structure](#project-structure)
- [Contributors](#contributors)
- [License](#license)

---

## 📝 About

**Sticky-Memo** lets you:
- Create, edit, and delete sticky notes on a digital board
- Organize notes by boards, tables, and categories
- Practice React, Vite, and MUI
- Collaborate with a friendly open-source community

---

## 🌐 Demo

👉 **[Live Preview](https://sticky-memo-dev.vercel.app/)**

---

## 🛠️ Tech Stack

- React.js
- Vite
- Material UI (MUI)
- JavaScript (ES6+)

---

## 🚀 Getting Started

Follow these steps to get started:

1. **Fork** this repository (top right of this page)
2. **Clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/sticky-memo.git
   cd sticky-memo
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. **Open** [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## 🤝 How to Contribute

We welcome all contributions! Here’s a quick guide:

1. **Fork** the repo and create your branch from `main` or `develop`.
2. **Make your changes** (add features, fix bugs, improve docs, etc).
3. **Check your changes**: Run the app locally and ensure everything works.
4. **Commit** and **push** your changes:
   ```bash
   git add .
   git commit -m "Describe your changes"
   git push origin <your-branch-name>
   ```
5. **Open a Pull Request** and fill out the PR template.

**Need help?** Open an [issue](https://github.com/narainkarthikv/sticky-memo/issues) or ask in the discussions!

---

## 📁 Project Structure

```plaintext
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Board/
│   │   ├── common/
│   │   ├── Loading/
│   │   ├── Note/
│   │   └── Table/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── themes/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

<p align="center">
  <b>Happy Contributing! 🎉</b>
</p>

---

## Installation

### Clone the Repository

1. **Fork the repository** by clicking the "Fork" button at the top right of the repository page on GitHub.
   ![Forking the Repository](https://user-images.githubusercontent.com/github-fork-button.png)
2. **Clone your forked repository** to your local machine:
    ```sh
    git clone https://github.com/your-username/Sticky-Memo.git
    ```
3. Navigate to the project directory:
    ```sh
    cd Sticky-Memo
    ```

### Frontend Installation

After cloning the repository:

1. **Install the dependencies**:
    ```sh
    npm install
    ```
2. **Start the development server**:
    ```sh
    npm run dev
    ```

<!-- ### Docker Installation

If you prefer using Docker:

1. **Pull the Docker image**:
    ```sh
    docker pull narainkarthik/stickymemo:v1.0.0
    ```
2. **Run the Docker container**:
    ```sh
    docker run -d -p 3000:3000 narainkarthik/stickymemo:v1.0.0
    ``` -->

## Project Structure

The `frontend` directory contains the React application.

```
frontend/
├── public/                 # Public assets
├── src/                    # Source code
│   ├── assets/             # Static assets
│   ├── components/         # Reusable UI components
│   ├── pages/              # Application pages
│   ├── styles/             # Styling files
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main component that sets up routes
│   └── main.jsx            # Entry point of the React application
├── index.html              # HTML template
├── package.json            # Project metadata and dependencies
└── vite.config.js          # Vite configuration
```

## Contributing

We welcome contributions! To contribute to Sticky-Memo, follow these steps:

### Forking the Repository

1. Fork the repository by clicking the "Fork" button at the top right of the repository page on GitHub.
   ![Forking the Repository](https://user-images.githubusercontent.com/github-fork-button.png)

### Cloning the Repository

2. Clone your forked repository to your local machine:
    ```sh
    git clone https://github.com/your-username/Sticky-Memo.git
    ```
3. Navigate to the project directory:
    ```sh
    cd Sticky-Memo
    ```

### Creating a Branch

4. Create a new branch for your feature or bug fix (create a branch according to the issue working on):
    ```sh
    git switch -c your-branch-name
    ```

### Making Changes

5. Make your changes to the codebase. You can edit the files using your preferred code editor.

### Committing Changes

6. Add the changes to the staging area:
    ```sh
    git add .
    ```
7. Commit the changes with a descriptive message:
    ```sh
    git commit -m "Description of your changes"
    ```

### Pushing Changes

8. Push the changes to your forked repository:
    ```sh
    git push origin your-branch-name
    ```

### Creating a Pull Request

9. Create a pull request from your forked repository to the main repository. Go to the "Pull Requests" tab on the main repository, and click "New Pull Request". Follow the instructions to create your pull request.

## Development Standards

### Code Style
- We use ESLint and Prettier for code formatting and linting
- EditorConfig ensures consistent coding style across different editors
- All JavaScript/JSX files must follow the established ESLint rules
- Maximum line length is 100 characters
- Use 2 spaces for indentation

### Documentation
- All components, functions, and methods must have JSDoc documentation
- Include clear and concise descriptions for parameters and return values
- Document complex logic with inline comments
- Keep the README and other documentation up to date

### Git Workflow
- Create feature branches from `main` using format: `feature/description`
- Create bug fix branches using format: `fix/description`
- Follow conventional commits specification
- Submit PRs using the provided template
- Squash commits before merging

### Code Review Process
- All PRs require at least one review
- Address all comments and suggestions
- Ensure CI checks pass before merging
- Keep PRs focused and reasonably sized

### Testing
- Write unit tests for new features
- Maintain test coverage above 80%
- Test components in isolation
- Include both positive and negative test cases

## Contributors

We appreciate the contributions of the following individuals: [Contributors](https://github.com/narainkarthikv/Sticky-Memo/blob/main/Contributors.md)

This is just the beginning! I look forward to making more meaningful contributions and collaborating with this amazing community. Let's build something great together and make Sticky-Memo the best it can be! ❤️🤝

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/narainkarthikv/Sticky-Memo/blob/main/MIT-LICENSE.txt) file for details.
