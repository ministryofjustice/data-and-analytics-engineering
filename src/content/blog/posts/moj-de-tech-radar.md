---
title: The Ministry of Justice Data Engineering Technology Radar
description: An overview of our journey to creating a modern technology radar to guide our technology choices.
date: 2024-11-30
author:
  name: Tom Hepworth
permalink: "/blog/posts/{{ title | slugify }}/"
tags:
  - Tag 2
  - Tag 3
---

## Why adopt a technology radar?

Choosing which technologies, platforms and techniques to adopt can be challenging in the fast-evolving tech landscape, full of fresh SaaS and open-source offerings. There’s a delicate balance between staying up-to-date and retaining popular tools that the team is already familiar and comfortable with.

Our decision to implement a technology radar reflects this balancing act. A technology radar serves as a shared framework, allowing teams to assess both established and emerging technologies and reach consensus on decisions. By giving everyone an opportunity to contribute, it ensures transparency and establishes a unified toolkit that simplifies onboarding and cross team collaboration.

While adapting existing infrastructure can be costly, often requiring cross-team coordination and significant time, sticking with outdated solutions just to avoid these expenses is also inefficient, especially for a smaller team. The technology radar helps us highlight emerging technologies that the wider team is keen to adopt, allowing us to continue to innovate and grow.

## Ok, so what is a technology radar?

A technology radar is a tool that maps out the key technologies your team is using or considering, represented as "blips". These blips are arranged into concentric rings - **Adopt, Assess, Retain, and Replace** - which reflect the status of each technology, indicating whether we plan to adopt, phase out, or maintain it and split into quadrants, representing the different kinds of blips - languages, tools, etc.

Originally pioneered by [ThoughtWorks](https://www.thoughtworks.com/radar), technology radars provides a visual framework, akin to an archery target, for mapping out our technology landscape. It helps align technology choices across teams and guides informed decisions about which technologies to continue using or discontinue.

### Our Implementation

The Ministry of Justice Data Engineering technology radar is available to explore [here](https://moj-analytical-services.github.io/data-and-analytics-engineering-tech-radar/), with the supporting GitHub repository accessible at this [link](https://github.com/moj-analytical-services/data-and-analytics-engineering-tech-radar).

Our implementation follows the approach outlined by ThoughtWorks, focusing on the following rings:

- **ADOPT**: Proven tools and techniques we trust to meet our needs at scale. These are widely used in production, low-risk, and recommended for broad adoption.
- **ASSESS**: Promising tools with clear potential. These are worth researching and prototyping, though they carry higher risks as they are new and untested in our organisation. Some engineers may already be experimenting with them.
- **RETAIN**: Technologies we currently use and are satisfied with but do not plan to adopt in new projects.
- **REPLACE**: Outdated tools or techniques that have been superseded. We will stop using them for new projects and plan to phase them out of existing ones.

And split into the following quadrants:
- **Platforms**: Technologies centred on software operations, encompassing platforms, infrastructure, and services that support deployment and management.
- **Tools**: This quadrant includes a mix of comprehensive industrial software solutions and smaller, custom-built internal tools. Examples range from Docker and ruff to bespoke tools developed in-house.
- **Languages and Frameworks**: Programming languages and common frameworks used in Data Engineering, such as dbt, pyarrow or pyspark.
- **Techniques**: Common techniques used in software development and Data/Analytical Engineering. These include agile, architectural design records (ADRs) and Kimball (for dimensional modelling).

## Our Technology Radar journey

We began our first test run of the technology radar as a simple Miro whiteboarding exercise, where the Data Engineering team came together to identify important technologies and techniques, assigning them to relevant categories. [Add a quick note on why we wanted to migrate away from Miro?] [Snapshot to the miro board]

In 2020, Zalando open-sourced their JavaScript-based [technology radar](https://github.com/zalando/tech-radar), which we’ve since adopted. The setup requires only a central JSON file containing details of each blip, including the date, quadrant, and ring it belongs to. This data then automatically populates the radar which can be published to static website hosts such as GitHub Pages.

Building on this solution, we’ve explored GitHub integrations to streamline the creation and management of blips, ensuring a clear record of our discussions and decisions.

## Integrations with GitHub

As a team, we’ve been steadily migrating more of our processes to a unified environment, *GitHub* (see [*Github as a One-Stop Shop*](https://ministryofjustice.github.io/data-and-analytics-engineering/blog/posts/github-as-a-one-stop-shop/) for more details). This shift has gradually spread across the team as we consolidate our tools, so it was only natural that we would eventually explore GitHub as a solution for blip creation.

After some experimentation, we decided on an approach that leverages [GitHub Discussions](https://docs.github.com/en/discussions/collaborating-with-your-community-using-discussions/about-discussions). Each discussion is titled according to the blip it represents and is tagged with a label (indicating its status) and a category (such as language, tool, or technique).

Team members can vote on whether we should adopt, assess, retain, or replace the blip using emojis. We use the following emoji system to represent each ring (GitHub's emoji set is somewhat limited, so we had to get creative!):
1. **ADOPT** 🚀
2. **ASSESS** 👍
3. **RETAIN** 😄
4. **REPLACE** 😦
5. **PAUSE** 👀

Following this, team members can contribute to the discussion, sharing their thoughts, feedback, and concerns about the blip.

<div style="text-align:center;">
    <img
        src="images/tech-radar/black-tech-radar-discussion.png"
        alt="Black technology radar GitHub Discussion"
        style="width: 50%; height: auto;">
</div>

This approach offers several benefits:
- **Centralised history of discussions and decisions**: By using GitHub Discussions, we log all our conversations and radar iterations in one place. This makes it easy to revisit past decisions when reviewing the radar in future exercises and provides clarity on why certain choices were made.
- **Simple radar maintenance**: Thanks to [Github’s GraphQL API](https://docs.github.com/en/graphql/overview/about-the-graphql-api), we can easily extract all the necessary information to populate each blip automatically, streamlining the update process.
- **Direct links to discussions**: Each blip in the radar can be linked to its corresponding GitHub discussion. Clicking a blip takes you directly to the discussion, offering a detailed view of its history, including our thoughts, concerns, and considerations.
- **Asynchronous feedback**: GitHub enables us to collect feedback at any time, facilitating hybrid working practices. Staff can contribute to discussions from any location, making it easier for everyone to engage and have their say.


## Notable Changes from Our Recent Tech Radar Review

Our latest update saw roughly thirty Data and Analytics Engineers come together to discuss our views and perspectives on the existing blips in the radar. To achieve this, we split into groups, each headed by one of our engineers, to review the blips in each quadrant. This method allowed us to cover a lot of ground efficiently while ensuring everyone’s input was considered.

The introduction of our Analytical Engineering function has also led to an increase in the number of blips, reflecting the growing diversity of tools and techniques we use. Here are some core changes from our latest radar review:

### Climbers 🔼

- **dbt**: `dbt` has been a central part of our Data Engineering stack for some time. It has now moved from the Assess ring to the Adopt ring, reflecting its maturity and the team’s increased confidence in its capabilities. We currently have a dedicated team overseeing our internal `dbt` implementation, and its usage is expected to grow.
- **ruff**: Since our initial review back in 2021, `ruff` has matured and gained widespread adoption within the Python community. Due to this, we’ve moved it from the Assess ring to the Adopt ring, highlighting its reliability and growing popularity.

### Fallers 🔽

- **AWS Glue**: AWS Glue has fallen from the **Adopt** ring to the **Replace** ring. While it was previously an essential component of our Data Engineering stack, we’ve found it to be less reliable, more challenging to debug, and costlier than alternative solutions. We have transitioned to a combination of `dbt` and `Athena`, which has demonstrated greater cost efficiency and reliability.
- **Jira/Confluence**: Previously essential to our project management, Jira and Confluence have dropped from **Adopt** to **Replace**. Though still used in parts of the organisation, we are exploring alternatives that better meet our needs and help consolidate our tools.
- **Internal tools**: Several internal tools, such as `dataengineeringutils3` and `etl-manager`, which were developed many years ago but are no longer actively maintained or used, have been moved to the **Replace** ring. We are working to phase these tools out and replace them with more modern, open-source solutions to reduce technical debt and streamline our workflows.

### New Entries ⭐

- **AWS Bedrock**: [To add]
- **dbt ecosystem and SQLMesh**: As part of our effort to improve tooling and processes around `dbt`, we’ve added several packages from the `dbt` ecosystem (including `dbt-codegen` and `dbt-audit-helper`) along with `SQLMesh`. These tools will enhance collaboration and project management within `dbt` workflows.​⬤


## Next steps and reflections

Our second-generation technology radar is both a more functional and automated solution to the challenge of coordinating technology choices across our teams.

Looking ahead, we plan to update the radar annually as part of a larger team day. Not only does this serve as a valuable team-building opportunity, but it also gives everyone—including the most junior members—a chance to shape how we work.

Despite the radar’s success, there are still challenges to address. Beyond the administrative workload, several areas require further attention:
- **Automated CI for blip updates**: As our technology radar is now fully built and deployed in GitHub, it would be good to automate the process of updating blips via continuous integration.
- **Labelling and filtering blips**: With the introduction of an Analytics Engineering function to our Data Engineering team, we’ve experienced a surge in the number of blips. We are exploring ways to add more structure or filter, to help distinguish between different professions.
- **Maintaining relevance**: Having only recently revived the radar, a challenge we have yet to address is making sure the radar is actively used in decision-making processes and remains relevant within the Data Engineering team. This is a conversation we will continue to have as we move forward.

We’re also keen to bring in fresh perspectives and suggestions we may not have considered. Currently, we’re exploring how to incorporate features from the [AOE technology radar](https://www.aoe.com/techradar/) (another open-source solution) in collaboration with one of our software teams at the Ministry of Justice. The AOE radar is a fully integrated solution, with a trail of all changes for each blip built directly into the radar.
