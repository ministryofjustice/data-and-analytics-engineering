---
title: GitHub as a one-stop-shop
description: Store all your project artefacts in a single, searchable location in GitHub
date: 2024-02-09
modified: 2024-02-09
author:
  name: Soumaya Mauthoot
permalink: "/blog/posts/{{ title | slugify }}/"
tags:
  - GitHub
  - Best Practice
---

<div class="govuk-warning-text">
  <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
  <strong class="govuk-warning-text__text">
    <span class="govuk-warning-text__assistive">Warning</span>
    This blog is under development.
  </strong>
</div>
</p>

This scenario may seem familiar:

- You use [GitHub repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories) to store and manage your code
- You use [Jira] to plan, track and prioritise work
- You store and manage technical documentation on [Confluence](https://www.atlassian.com/software/confluence)
- You create presentations using Powerpoint and store on Sharepoint / Google Drive
- You use Excel to record user approval testing (UAT) and store on Sharepoint / Google Drive

This article summarises how to consolidate all these artefacts in GitHub using various GitHub and open-source tools: 

- [GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects) for planning and tracking work and completing UAT
- [GitHub Discussions](https://docs.github.com/en/discussions) for documenting discovery work and communicating with your users
- `/docs` folder for documenting user guidance and technical concepts
- [mermaid](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams) for creating simple diagrams in markdown as code
- [excalidraw](https://excalidraw.com/) (and [VS Code extension](https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor)) for creating more complicated diagrams and storing with code
- [marp](https://marp.app/) for creating presentations in markdown


Those internal to MOJ can access the various use cases linked in the diagram below:

<a href="https://excalidraw.com#url=$(https://github.com/ministryofjustice/data-and-analytics-engineering/blob/add-github-blog/src/content/blog/posts/images/github-one-stop-shop.png)"><img src="images/github-one-stop-shop.excalidraw.png" width="100%" height="100%">

This article lists some recommendations on how to use these tools as of February 2024. For more detailed and/or up-to-date instructions please refer to the individual guidance. If you have any comments and/or suggestions please post on the [GitHub discussion](https://github.com/ministryofjustice/data-and-analytics-engineering/discussions/10).

# Why store everything in GitHub?

A very valid question. To be honest, the solutions discussed in this article can have less features and may involve a steeper learning curve than your existing setup. In addition, there aren't clear migration paths which means that unless you're starting from scratch it can be painful to move accross.

However, there are various advantages which makes it worthwhile:

### Searching 

GitHub Search used to be [notoriously unpleasant](https://github.blog/2021-12-15-a-brief-history-of-code-search-at-github/). However GitHub released a new [code search engine and code browsing](https://github.blog/changelog/2022-11-09-introducing-an-all-new-code-search-and-code-browsing-experience/) in November 2022 which allows you to find relevant results with incredible speed. Having all your artefacts in one place means you can easily search across code, documentation, comments and presentations for relevant information.

### Interoperability 

By using GitHub services, you can more easily link and automate across your various project artefacts. This makes it easier to track, review and deploy changes as well as collaborate with your team and users.

### Cost 

This could be a consideration if your company decides to ditch other tools such as JIRA and Atlassian wholesale.

# Project Management

In [August 2022](https://github.blog/2022-07-27-planning-next-to-your-code-github-projects-is-now-generally-available/) Github released the new version of [GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects) which summarises GitHub repository issues and PRs through a more intuitive GUI. Whilst [Projects Classic](https://docs.github.com/en/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards) were tied to a repository, Projects V2 are created at the GitHub organization level. This means they can be linked to a repository, but are independent of them. You can also add issues from [different GitHub organisations](https://github.blog/changelog/2023-02-23-github-issues-projects-february-23rd-update/#add-cross-organization-issues-and-pull-requests-to-projects), but there won't be a backwards-link on the issue to the project.

There are various ways to [automate](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project) your projects. The simplest are the [built-in automations](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-built-in-automations), for example to update the status to "Done" when an issue is closed.

### Epics

One missing feature is the ability to group issues into epics. There are two work-arounds:

1. Assign an "Epic" label to issues, and use [task lists](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/about-task-lists) to associate the epic with child tickets:

```
- [x] #739
- [ ] https://github.com/octo-org/octo-repo/issues/740
- [ ] Add delight to the experience when all tasks are complete :tada:
```

<img src="https://docs.github.com/assets/cb-127417/mw-1440/images/help/writing/task-list-rendered.webp" width="40%" height="40%">

You can link to within-repo issues, PRs and discussions using the more simple "#number" pattern. For cross-repo linking you'll have to specify the full url. You can also draft tasks until you're ready to convert them to issues, PRs or discussions.

Note: Task list are not to be confused with [tasklists](https://docs.github.com/en/issues/managing-your-tasks-with-tasklists) which is still in private beta and subject to change.

You can navigate back to the Epic in the "Tracked by: section next to the child issue status:

<img src="https://docs.github.com/assets/cb-111881/mw-1440/images/help/writing/task-list-tracked.webp" width="40%" height="40%">

You can display the "Epic" label in GitHub Projects, and filter and/or search by the "Epic" label. You cannot view relationships (yet) on GitHub Project(s) directly but it's relatively easy to view by opening the issue screen:

<img src="images/epics-github-projects.png" width="40%" height="40%">

2. Use [GitHub Milestones](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/about-milestones) which you can associate with issues and PRs (but not discussions). You can display milestones on GitHub Projects as an additional column, or add them to the Github Project [Roadmap layout](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/changing-the-layout-of-a-view#about-the-roadmap-layout.)

Whilst cross-repo milestones [are not yet supported](https://github.com/orgs/community/discussions/6296), you could consider recording all your issues in your "core" repo, even if the code is split amongst multiple repos. This makes it easier to manage work.

3. Don't use [GitHub Labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels) for epics! This may seem an obvious option at first, but like GitHub milestones you can't create org-wide labels, and unlike Milestones you can't set dates and track completion status.

### Roadmaps

The Github Project [Roadmap layout](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/customizing-the-roadmap-layout) displays the project items on a timeline.

I personally prefer using the [view layout](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/customizing-the-board-layout), and grouping issues by a "Quarter" field. 

This encourages product owners to:

- Come up with epics which are shorter than 2 months
- Size up and limit the number of epics undertaken per quarter
- Give less precise but more accurate start and completion dates

You can modify the "status" field to store the quarter, as used in the [GitHub Public Roadmap](https://github.com/orgs/github/projects/4247) which simplifies tracking. Alternatively you can create a separate "Quarter" field.

### Requirements

TBC

### User Approval Testing (UAT)

User Approval Testing can take many forms. A common scenario is migrating a large group of users to a new solution, and making sure that existing functionality is replicated. A simple way of tracking progress is through an excel spreadsheet with a row per user and columns for recording completion of different actions.

We have successfully used GitHub Projects for tracking user migration to a new database. Those internal to MOJ can access this private [project](https://github.com/orgs/moj-analytical-services/projects/72/views/1) as an example. For those external, the concept is simple; 

1) Create a ticket per artefact that needs to be migrated
2) Replace the "status" field with different actions
3) Use the "view layout" to track progress

The advantages are many:

- Use [issue templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository) to summarise guidance and actions
- Assign tickets to GitHub user accounts, instead of named individuals
- Use a single issue to track progress and communication

# Project Documentation

Documentation about your project can take many forms, which needs to be recorded and/or managed differently depending on the audience and use case.

### Documentation about your code

This is obvious, and should reside in your code. Good code documentation practice is outside the scope of this article, please refer to [swim](https://swimm.io/learn/code-documentation/documentation-in-python-methods-and-best-practices) for some great pointers.

### Documentation about your project  

This includes architecture, dependencies, setup instructions, usage guide, etc... You can keep this information in GitHub as markdown files in a `/doc` folder in your GitHub repository. It's also possible to use [GitHub wikis](https://docs.github.com/en/communities/documenting-your-project-with-wikis), as has been successfully achieved [here](https://github.com/AstroBookings/.github/wiki). However I would not recommend for reasons which are best summarised in this [article](https://michaelheap.com/github-wiki-is-an-antipattern/). 

You can convert your docs into a static website using static site generators such as [mkdocs-material](https://squidfunk.github.io/mkdocs-material/) and host on [GitHub pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages).

Whilst it's recommended for documentation to go through the same review process as code, it can sometimes feel onerous. Modify the [codeowners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) to skip the approval process for changes to the `/docs` folder. You can also modify [GitHub workflows](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onpull_requestpull_request_targetbranchesbranches-ignore) to skip the workflow, which is useful in the case of long running tests.  

A few things to note about structuring the `/docs` folder:

- If your team/application a monorepo layout, you can split off into multiple `/docs` folders at the root of each sub-folder, but this can make it more complex to manage and navigate.
- If your team/application uses a multi-repo approach, you can use the "core" repo or "docs" repo for documenting team/application level documentation. It won't be possible to make code and documentation changes made against different repos in a single PR, but you can still link the changes as child-tickets to the same Epic.

### Documentation about your approach

This refers to transient documentation that is generated whilst you are considering different options, running some analysis etc... This documentation should not reside in your code because it will lead to clutter and cause confusion, especially for new team members. The `/docs` folder should reflect the "current" status of your project, just like your code.

Instead, you can use [GitHub Discussions](https://docs.github.com/en/discussions/collaborating-with-your-community-using-discussions/about-discussions) which was released in [Aug 2021](https://github.blog/2021-08-17-github-discussions-out-of-beta/). This feature is not enabled by default so you'll have to update the [repository settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/enabling-or-disabling-github-discussions-for-a-repository). 

Unlike the `/docs` folder, you don't need to worry about getting someone to approve, which can sometimes put people off when writing documentation. However it does mean that Discussions can become a swamp of useful and less useful information. Hence you need a process for migrating condensed information to the `/docs` folder. This is facilitated by the fact that GitHub Discussions support the same [advanced formatting](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting) as markdown pages which makes it easy to cut and paste. I recommend closing a Discussion once the summary has been migrated to the `/docs` folder.

GitHub Discussions allow your users to [participate](https://docs.github.com/en/discussions/collaborating-with-your-community-using-discussions/participating-in-a-discussion) with the idea-generation process, via comments, reactions and polls. You can also choose how to [sort](https://docs.github.com/en/enterprise-server@3.10/discussions/collaborating-with-your-community-using-discussions/collaborating-with-maintainers-using-discussions#sorting-top-level-comments-in-discussions) top-level comments in your discussion.

Note that using GitHub Discussions will require a culture change:

- Your team and your users to check their GitHub notifications. There might be a culture change/reticence to posting on GitHub Discussions. It can also cause confusion if you already use another communication channel e.g. Slack. A good recommendation is to consider whether you will want to refer to this information in one year's time when trying to understand why you made a certain decision. If yes, use a GitHub discussion!

If your team/application uses a multi-repo approach, you could limit the GitHub Discussions to the "core" or "docs" repo to make it easier to track/search.

### Presentations

TBC

### Diagrams

GitHub released support for [Mermaid diagrams] in Feb 2022. [Mermaid](https://github.com/mermaid-js/mermaid#readme) is a "JavaScript-based diagramming and charting tool that uses Markdown-inspired text definitions and a renderer to create and modify complex diagrams". I personally like to draft my diagram in the [Mermaid Live Editor](https://mermaid.live/) and then paste to my markdown file / GitHub Discussion. I've used them in the past to create simple or one-off diagrams, but there is a bit of a learning curve.

For more complicated diagrams, I prefer using a dedicated diagramming tool and storing the image in a `/docs/images` folder. This also has the advantage of being referencable in multiple places.

# Acknowledgements

TBC