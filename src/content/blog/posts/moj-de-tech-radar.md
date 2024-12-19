---
title: The Ministry of Justice Data Engineering Technology Radar
description: Making better technology decisions with a shared technology radar.
date: 2024-12-19
author:
  name: Tom Hepworth
permalink: "/blog/posts/{{ title | slugify }}/"
tags:
  - Technology Radar
  - GitHub
  - Data Strategy
---

[[toc]]

## The Balancing Act: Stability vs Innovation

As a data and analytics engineering team nearing fifty engineers, we are continually navigating an ever-evolving technological landscape. With new tools, platforms, and techniques emerging at a rapid pace, it can be challenging to decide what to adopt, assess, or retire. While established technologies offer stability, an over-reliance on them risks stagnation and missed opportunities for innovation.

It’s easy to stick with what’s familiar – tried-and-tested tools offer stability and reliability. Yet clinging to old technologies can lead to stagnation, inefficiency, and missed opportunities for innovation. On the other hand, rushing to adopt shiny new tools can cause disruption, waste time, and create unnecessary complexity.

How do we decide what to adopt, assess, or retire? <br>
How do we explore new technologies without losing focus or creating unnecessary overhead? <br>
And how do we keep the team aligned and involved in these decisions? <br>

Enter the **technology radar**: a tool that brings structure and clarity to this balancing act.

A technology radar provides a shared framework for evaluating tools, platforms, and techniques. It helps teams identify emerging technologies worth exploring, recognise reliable tools that should remain part of the stack, and retire outdated solutions. More importantly, it fosters collaboration and transparency, ensuring that everyone has a say in shaping our technology choices.

This blog post explores our journey with the technology radar – why we adopted it, how we use it to balance stability with innovation, the enhancements we’ve introduced to existing approaches, and the key lessons we’ve learned along the way.

## Ok, so what is a technology radar?

A technology radar is a tool that maps out the key technologies your team is using or considering, represented as "blips". These blips are arranged into concentric rings - **Adopt, Assess, Retain, and Replace** - which reflect the status of each technology, indicating whether we plan to adopt, phase out, or maintain it and split into quadrants, representing the different kinds of blips - languages, tools, etc.

Originally pioneered by [ThoughtWorks](https://www.thoughtworks.com/radar), technology radars provides a visual framework, akin to an archery target, for mapping out our technology landscape. It helps align technology choices across teams and guides informed decisions about which technologies to continue using or discontinue.

The radar is divided into four rings:
- **ADOPT**: Proven tools and techniques we trust to meet our needs at scale. These are widely used in production, low-risk, and recommended for broad adoption.
- **ASSESS**: Promising tools with clear potential. These are worth researching and prototyping, though they carry higher risks as they are new and untested in our organisation. Some engineers may already be experimenting with them.
- **RETAIN**: Technologies we currently use and are satisfied with but do not plan to adopt in new projects.
- **REPLACE**: Outdated tools or techniques that have been superseded. We will stop using them for new projects and plan to phase them out of existing ones.

And split into the following quadrants:
- **Platforms**: Technologies centred on software operations, encompassing platforms, infrastructure, and services that support deployment and management.
- **Tools**: This quadrant includes a mix of comprehensive industrial software solutions and smaller, custom-built internal tools. Examples range from Docker and ruff to bespoke tools developed in-house.
- **Languages and Frameworks**: Programming languages and common frameworks used in Data Engineering, such as dbt, pyarrow or pyspark.
- **Techniques**: Common techniques used in software development and Data/Analytical Engineering. These include agile, architectural design records (ADRs) and Kimball (for dimensional modelling).

<div style="text-align:center;">
    <img
        src="https://raw.githubusercontent.com/ministryofjustice/data-and-analytics-engineering/refs/heads/docs/add-de-tech-radar-image/src/content/blog/posts/images/tech-radar/de_tech_radar.png"
        alt="Refreshed technology radar: A screenshot of our new technology radar, showing the radar's quadrants and rings."
        style="width: 90%; height: auto;">
</div>

<br>

_Explore the Ministry of Justice Data Engineering team’s **technology radar** [here](https://moj-analytical-services.github.io/data-and-analytics-engineering-tech-radar/), or check out the supporting GitHub repository [on GitHub](https://github.com/moj-analytical-services/data-and-analytics-engineering-tech-radar)._

## Our Technology Radar Journey

We began with a simple whiteboarding exercise where the team collaborated to map out key tools, platforms, languages, and techniques. These were organised into quadrants and rings, offering a **snapshot of our technology landscape**. This initial approach sparked valuable discussions, aligning the team on emerging technologies and highlighting areas for improvement.

<div style="text-align:center;">
    <img
        src="https://raw.githubusercontent.com/ministryofjustice/data-and-analytics-engineering/refs/heads/main/src/content/blog/posts/images/tech-radar/whiteboard_radar.png"
        alt="Original tech radar: A screenshot of the original whiteboard tech radar, focused on the 'ADOPT' quadrant."
        style="width: 80%; height: auto;">
</div>

### Wins and Challenges of the First Radar
Our initial radar provided several immediate benefits:
- A **shared understanding** of the technologies we use, their purpose, and potential future direction.
- **Improved engagement**: Team members had a platform to contribute ideas, raising awareness of our tools and techniques.
- A **clear visual overview** of our tech landscape, fostering alignment across the team.

However, the approach had clear limitations:
- **Manual maintenance**: Updating the radar was time-consuming and prone to becoming outdated.
- **Limited collaboration**: Contributions were limited to in-person meetings, restricting remote or asynchronous participation.
- **No historical record**: We couldn’t easily track changes, the rationale behind decisions, or the timeline of updates.

### From Whiteboard to Webpage: Adopting an Open-Source Solution
In 2020, Zalando open-sourced their JavaScript-based [technology radar](https://github.com/zalando/tech-radar), providing a dynamic alternative. Their radar uses a central JSON file to define each **blip**—including its name, quadrant, ring, and date—which automatically populates the visual radar. This approach tackled the core challenges of manual updates and static visuals.

We adopted Zalando’s radar as our foundation and built on it to better suit our needs. By integrating with **GitHub Discussions**, we introduced a streamlined way to propose, discuss, and update blips. This not only maintained a transparent historical record but also allowed for asynchronous collaboration—crucial for a remote-friendly, hybrid-working environment.

## Integrations with GitHub

As a team, we’ve steadily consolidated our processes within **GitHub**, creating a unified environment for development, collaboration, and decision-making (see our blog post on [*GitHub as a One-Stop Shop*](https://ministryofjustice.github.io/data-and-analytics-engineering/blog/posts/github-as-a-one-stop-shop/) for more details). Naturally, we explored GitHub as a solution for managing our technology radar and found ways to enhance its functionality.

### Leveraging GitHub Discussions
After some experimentation, we adopted **GitHub Discussions** as the backbone for creating and managing blips. Each discussion corresponds to a blip and includes:
- **Title**: The name of the blip.
- **Labels**: To indicate its status—Adopt, Assess, Retain, or Replace.
- **Categories**: To classify the blip as a language, platform, tool, or technique.

Team members vote on blip status using an emoji-based system (a creative workaround for GitHub’s limited emoji set):
1. **ADOPT** 🚀
2. **ASSESS** 👍
3. **RETAIN** 😄
4. **REPLACE** 😦
5. **PAUSE** 👀

Following the voting process, discussions serve as open forums for team members to share insights, feedback, and concerns, creating a rich collaborative history for each blip.

<div style="text-align:center;">
    <img
        src="https://raw.githubusercontent.com/ministryofjustice/data-and-analytics-engineering/refs/heads/main/src/content/blog/posts/images/tech-radar/black-tech-radar-discussion.png"
        alt="A screenshot of one of the GitHub Discussions used to populate the tech radar."
        style="width: 70%; height: auto;">
</div>

### Benefits of GitHub Integrations

Integrating GitHub with our technology radar has delivered significant improvements:

- **Centralised discussions**: GitHub Discussions provide a single, searchable space for all conversations and decisions about the radar. This makes it easy to revisit past choices, understand their rationale, and maintain a transparent decision history.
- **Automated updates**: By using [GitHub’s GraphQL API](https://docs.github.com/en/graphql/overview/about-the-graphql-api), we’ve automated the process of extracting blip data to update the radar. This has drastically reduced manual effort, allowing us to refresh the radar regularly with minimal overhead. Previously, updating required hours of engineering time to organise whiteboarding sessions and implement changes.
- **Streamlined blip management**: Each blip now links directly to its corresponding discussion thread, creating a clear audit trail of decisions. Additionally, we can track the number of blips across rings, a previously laborious task. Before integration, the radar had grown to **140 blips for Data Engineering alone**, making it unwieldy to manage. With better oversight, we now maintain a focused and manageable **110 blips** across both Data Engineering and Analytical Engineering, aligning more effectively with our 50-person team.
- **Asynchronous collaboration**: Team members can propose, discuss, and vote on blips at their convenience, enabling contributions from remote and hybrid staff. This flexibility ensures that everyone has a say, regardless of their location or working hours.

By enhancing Zalando’s open-source radar with GitHub integrations, we transformed it into a living, collaborative tool that evolves with our team. It not only simplifies maintenance but also ensures that our technology choices remain transparent, well-documented, and adaptable.

<hr>

## From Enhancements to Insights: Our Recent Radar Refresh

With our technology radar now integrated into GitHub, we’ve transformed it into a collaborative, dynamic tool that simplifies maintenance, fosters transparency, and supports asynchronous teamwork. These innovations have enabled us to keep the radar relevant and accessible, while maintaining a clear record of our technology decisions.

This improved agility came into play during our most recent radar refresh. We brought together around **thirty Data and Analytics Engineers** for a team-wide review of the existing blips. To streamline the process, we divided into focused groups, each led by an engineer, to assess a specific quadrant of the radar.

The result was not just an updated radar but also a clearer reflection of our evolving work. The introduction of the **Analytical Engineering function** has broadened the diversity of tools and techniques we use, increasing the number of blips.

Here are the most notable changes from our latest review:

---

### 🔼 Climbers
These tools have proven their value, gaining maturity and broader adoption, which has earned them a move to the **Adopt** ring.

- **dbt-core**
  `dbt-core` has been a cornerstone of our Data Engineering stack for some time. Its recent move from the **Assess** ring to **Adopt** reflects its growing maturity and our increased confidence in its capabilities. We now have a dedicated team overseeing its internal implementation, and its usage continues to expand across projects.

- **ruff**
  Since our initial review in 2021, `ruff` has rapidly gained traction within the Python community. Its performance and simplicity have made it a reliable choice, leading us to move it from the **Assess** ring to **Adopt**.

---

### 🔽 Fallers
These tools have fallen out of favour due to limitations, inefficiencies, or the emergence of better alternatives.

- **AWS Glue**
  Previously an essential part of our Data Engineering stack, **AWS Glue** has moved from **Adopt** to **Replace**. We found it to be less reliable, harder to debug, and more costly than newer solutions. We have successfully transitioned to a combination of **dbt** and **Athena**, which offer greater cost efficiency and reliability.

- **Jira/Confluence**
  Once a mainstay of our project management processes, Jira and Confluence have moved from **Adopt** to **Replace**. While still used in parts of the organisation, we are exploring more streamlined alternatives that consolidate our tools and better meet our evolving needs.

- **Internal tools**
  Older tools like `dataengineeringutils3` and `etl-manager`, developed internally many years ago, are no longer actively maintained or widely used. These tools have now been moved to the **Replace** ring as we prioritise phasing them out in favour of modern, open-source solutions to reduce technical debt and simplify our workflows.

---

### ⭐ New Entries
New technologies and tools have entered the radar as we expand our capabilities and refine our workflows.

- **AWS Bedrock**
  [Details to be added]

- **dbt-core and SQLMesh**
  As part of our commitment to improving our `dbt-core` workflows, we’ve added tools like `dbt-codegen` and `dbt-audit-helper` to enhance collaboration, automation, and project management. Additionally, we are exploring **SQLMesh** to improve versioning and testing capabilities for our SQL-based workflows.

---

These changes highlight our continued focus on balancing **stability** with **innovation**, ensuring our toolkit remains efficient, scalable, and fit for purpose. Each update reflects careful consideration of what works, what doesn’t, and where we can improve to meet the evolving demands of our team and organisation.


## Continuing the Journey: What’s Next for Our Radar?

Our second-generation technology radar provides a more functional, automated way to coordinate technology choices across our teams. However, there’s still room for improvement as we look to make the radar even more effective and sustainable.

### Annual Updates and Team Engagement
We plan to refresh the radar annually during a dedicated team day. This serves as both a valuable team-building exercise and an opportunity for everyone—including junior team members—to contribute to shaping our technology strategy.

### Key Areas for Improvement
While the radar has already delivered significant value, several challenges remain that we’re actively addressing:
- **Automated CI for blip updates**: Although the radar integrates seamlessly with GitHub, we aim to further streamline the process with automated continuous integration workflows for updating blips.
- **Improved labelling and filtering**: The introduction of an Analytical Engineering function has increased the number of blips. To maintain clarity and usability, we are exploring ways to filter and categorise blips more effectively, ensuring the radar remains accessible and relevant across professions.
- **Maintaining relevance**: As a revived tool, ensuring the radar actively supports decision-making processes is key. We will continue to evaluate its adoption and explore ways to integrate it further into our day-to-day workflows.

### Exploring Future Innovations
We’re also considering enhancements inspired by other open-source solutions. In particular, we’re exploring features from the [AOE technology radar](https://www.aoe.com/techradar/) in collaboration with one of our Ministry of Justice software teams. The AOE radar offers capabilities such as integrated summaries, detailed histories for each blip, and a refreshed user interface. These improvements could bring further clarity, context, and usability to our radar, ensuring it continues to evolve alongside our team’s needs.

By addressing these areas, we aim to keep the radar as a living, adaptable tool that not only reflects our technology landscape but actively drives better decision-making and collaboration across our teams.

## Conclusion

Our technology radar has transformed the way we evaluate, adopt, and manage tools and technologies within the Ministry of Justice Data Engineering team. What began as a simple whiteboarding exercise has evolved into a dynamic, automated solution integrated with GitHub, enabling transparent, collaborative, and asynchronous decision-making. By enhancing Zalando’s open-source radar with our own innovations, we’ve created a living tool that reflects both the stability we rely on and the innovation we strive for.

As we look ahead, we remain committed to refining and scaling the radar. From automating updates via continuous integrations to improving blip organisation, we aim to ensure the radar stays relevant and actively supports our decision-making processes. With contributions from across the team, the radar will continue to adapt and grow, helping us strike the right balance between stability and innovation in an ever-evolving technology landscape.

<hr>

## Acknowledgements

I would like to thank the following people for their help with this blog post:

- [Soumaya Mauthoor](https://github.com/SoumayaMauthoorMOJ) for both her invaluable feedback and her tireless work setting up our modernised radar.
- [Damilola Oyebade](https://github.com/dami-moj) and [Murad Ali](https://github.com/murad-ali-MoJ) for all of their work updating the radar and running the refresh session.
- [Francesca Von Braun-Bates](https://github.com/vonbraunbates) for all of her feedback and guidance.
