---
layout: sub-navigation
title: Standards and Conventions
eleventyNavigation:
  key: Standards and Conventions
  parent: About
  order: 2
---


# Technology

The following .gov websites explain technology and design standards and conventions used within Ministry of Justice Digital & Technology and across government:

Ministry of Justice Technical Guidance
GOV.UK Service Toolkit
The GDS Way

# Working with git and GitHub

At the Ministry of Justice, Git and GitHub are key tools for version control, collaboration, and code management across the Data & Analytics Directorate. These tools enable teams to efficiently manage projects, track changes, and collaborate on code in a structured and secure environment.
For a comprehensive guide on how to consolidate all your project artefacts on GitHub by leveraging GitHub and open-source tools, please read Soumaya Mauthoor’s article on our blog Data Analytics and Engineering Blog: GitHub as a one-stop shop.

# Git: Version Control

Git is a powerful version control system used to track changes in your codebase, allowing developers to work on projects collaboratively while maintaining a history of every modification. At the MoJ, Git forms the backbone of our version control strategy, enabling teams to manage changes without conflict, streamline the development process, and maintain a clean, organised codebase. 

# Here's how Git helps:

Tracking Changes: Git keeps a record of every change made to the codebase, allowing for easy rollback and comparisons between different versions of the code.
Branching and Merging: Developers can work on separate branches without affecting the main codebase, making it easy to experiment, fix bugs, or develop features in isolation. Once work is complete, branches are merged into the main repository after a thorough review.
Collaboration: By enabling multiple developers to work on the same project simultaneously, Git prevents conflicts and ensures smooth collaboration through branching and merging strategies.

# GitHub: Collaboration Platform

GitHub provides a web-based interface for our Git repositories, enhancing collaboration across teams. At the MoJ, GitHub serves as a central hub for managing projects and hosting repositories. Here's how GitHub is leveraged at the MoJ:

Repository Hosting: All project code is stored in GitHub repositories. Repositories are structured to host project-specific codebases, which can be public or private depending on the sensitivity of the project.

Pull Requests (PRs): A key collaboration feature is the pull request (PR) system. When a developer completes a feature or fixes a bug, they open a pull request to merge their changes into the main repository. This PR process allows for:
Code Reviews: PRs are reviewed by other team members to ensure the quality of the code, adherence to standards, and alignment with project goals.

Discussion: Developers can leave comments, ask questions, and suggest improvements directly within the PR before it is merged.
Issue Tracking: GitHub Issues are used to manage tasks, bugs, and feature requests. This provides a transparent system for tracking progress and prioritising work across projects.
Collaboration and Documentation: GitHub also supports collaboration beyond code. Documentation can be hosted in repositories (using markdown files like README.md), making it easy to maintain project documentation, guides, and best practices alongside the codebase.

# Key Practices

Branching Strategy: teams often follow a branching strategy where work is done in feature or bug-fix branches, and changes are reviewed through pull requests before merging into the main branch.

Code Reviews and Approval: Code reviews are a critical part of the development process at the MoJ. Every change undergoes a review by peers to maintain quality and consistency across projects.

Continuous Integration and Deployment (CI/CD): GitHub Actions or other CI/CD tools are integrated with GitHub repositories to automate testing, building, and deployment of code. This ensures that code is always in a deployable state and any issues are caught early.

Collaboration and Transparency: GitHub fosters a culture of collaboration. Teams across different departments can contribute to projects, track issues, and share knowledge, creating a transparent and inclusive development environment.
For working with Git and GitHub at the MoJ please follow the GDS guidance for working with git and GitHub.

This covers:
how to write commit messages
how to work with branches
how to rebase commits to create a coherent and logical history
how to merge branches
how to force push
You should also follow the GDS guidance on pull requests.

This covers:
how to create and open a pull request
how to review a pull request
how to respond to comments and requests for changes on a pull request
