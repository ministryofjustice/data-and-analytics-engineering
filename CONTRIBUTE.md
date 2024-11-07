
# Contributing to the Data and Analytics Engineering Documentation

Thank you for your interest in contributing to the Ministry of Justice’s Data and Analytics Engineering Handbook ! We welcome contributions that improve clarity, add resources, or enhance the content’s accuracy and utility.

This document provides guidelines for contributing to ensure quality and consistency across our documentation.

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
  - [Improving Documentation](#improving-documentation)
  - [Reporting Issues](#reporting-issues)
- [Getting Started](#getting-started)
- [Contribution Process](#contribution-process)
  - [Discussing Changes](#discussing-changes)
  - [Editing Content](#editing-content)
  - [Creating Pull Requests](#creating-pull-requests)
- [Style and Formatting Guidelines](#style-and-formatting-guidelines)
- [License](#license)

## Ways to Contribute

### Improving Documentation

If you notice an area that could use clarification, improvement, or updating, feel free to make edits. Common areas for improvement include:

- **Correcting Typos and Grammar**: Fixing any language issues to enhance readability.
- **Updating Outdated Information**: Ensuring that any tool versions, methods, or references are current.
- **Clarifying Instructions**: Making instructions more user-friendly by improving explanations, examples, or visual aids.

### Reporting Issues

If you encounter issues in the documentation or have suggestions:

- **Open an Issue**: Use the GitHub issue tracker to log your observation. Provide details to help us understand and address the issue efficiently.
- **Provide Context**: Describe the area needing improvement and any relevant context (e.g., related systems or common errors).

## Getting Started

1. **Fork the Repository**: Begin by forking this repository to your GitHub account.
2. **Clone Your Fork**: Clone your fork locally to begin editing:
   ```bash
   git clone https://github.com/your-username/data-and-analytics-engineering.git
   ```
3. **Set Up Remotes**: Add the upstream repository to keep your fork synchronized:
   ```bash
   git remote add upstream https://github.com/ministryofjustice/data-and-analytics-engineering.git
   ```
4. **Install 11ty**: Install `11ty` if you don’t have it already:
    ```bash
    npm install @11ty/eleventy
    ```
5. **Edit Content**: Make your edits to any files as needed.

6. **Preview Changes locally**:
    ```bash
    npm start
    ```
    The site should now be served at http://localhost:8080/data-and-analytics-engineering/.

## Contribution Process

### Discussing Changes

Comment on the issue to express your interest. Wait for acknowledgment or feedback before proceeding to avoid duplicate work.


### Creating Pull Requests

1. **Push Changes to Your Fork**: Commit your changes and push them to a branch in your fork.
2. **Open a Pull Request**: Submit a pull request (PR) to the main repository.
   - Provide a clear and concise description of your changes.
   - Link any relevant issues or provide context on the edits.
3. **Review Process**: A maintainer will review your submission. Respond to any feedback or requests for revision as needed.

## Style and Formatting Guidelines

- **Concise Language**: Use clear, concise language. Avoid overly technical jargon unless necessary.
- **Headings and Subheadings**: Organize content with headings (`#` for major headings, `##` for subheadings) to improve readability.
- **Code Blocks and Examples**: Use code blocks for any code or command-line examples, and provide explanations as needed.
- **Diagrams and Visual Aids**: When possible, include diagrams to illustrate complex concepts. Ensure images are clear and appropriately labeled. We use [Excalidraw](https://excalidraw.com/) for diagrams
- **File Naming**: Use lowercase, hyphen-separated names for new files (e.g., `data-governance-best-practices.md`).

## License

This project is licensed under the [MIT License](LICENSE). By contributing, you agree that your contributions will be licensed under the same license.

