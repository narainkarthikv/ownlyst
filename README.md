![License](https://img.shields.io/github/license/narainkarthikv/Sticky-Memo)
![Last Commit](https://img.shields.io/github/last-commit/narainkarthikv/Sticky-Memo)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

# Sticky-Memo

Sticky-Memo is a lightweight web application that allows users to create, edit, and manage sticky notes directly in the browser.

The application uses browser localStorage to persist notes across sessions, without requiring a backend or database. It is built using React.js, Vite, and Material UI for a fast and modern user experience.


## Tech Stack

<table>
    <tr>
     <td>Frontend</td>
     <td><img src="https://skillicons.dev/icons?i=react,mui,vite" /></td>
    </tr>
    <tr>
     <td>CI/CD</td>
     <td><img src="https://skillicons.dev/icons?i=netlify,githubactions" /></td>
    </tr>
</table>

## Table of Contents

- [Installation](#installation)
  - [Clone the Repository](#clone-the-repository)
  - [Frontend Installation](#frontend-installation)
- [Usage](#usage)
  <!-- - [Docker Installation](#docker-installation) -->
- [Project Structure](#project-structure)
- [Contributing](#contributing)
  - [Forking the Repository](#forking-the-repository)
  - [Cloning the Repository](#cloning-the-repository)
  - [Creating a Branch](#creating-a-branch)
  - [Making Changes](#making-changes)
  - [Committing Changes](#committing-changes)
  - [Pushing Changes](#pushing-changes)
  - [Creating a Pull Request](#creating-a-pull-request)
- [Contributors](#contributors)
- [License](#license)

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

## Usage

- Create a new sticky note using the add button.
- Edit notes directly by clicking on them.
- Delete notes when they are no longer needed.
- Notes are automatically saved in the browser using       localStorage.


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

> Please read the [CONTRIBUTING.md](./CONTRIBUTING.md) file before submitting issues or pull requests.

We welcome contributions!
To contribute to Sticky-Memo, follow these steps:


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

## Contributors

We appreciate the contributions of the following individuals: [Contributors](https://github.com/narainkarthikv/Sticky-Memo/blob/main/Contributors.md)

This is just the beginning! I look forward to making more meaningful contributions and collaborating with this amazing community. Let's build something great together and make Sticky-Memo the best it can be! ❤️🤝

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/narainkarthikv/Sticky-Memo/blob/main/MIT-LICENSE.txt) file for details.
