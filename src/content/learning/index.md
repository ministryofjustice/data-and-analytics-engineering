---
layout: article
title: Learning
order: 2
eleventyNavigation:
  key: Learning
  parent: Home
---

## Learning & Development Opportunities

At the Ministry of Justice (MoJ), we are committed to the continuous growth and development of our team members. In the Data and Analytics Directorate, we provide a variety of Learning and Development (L&D) opportunities designed to help you advance your career, enhance your skills, and stay at the cutting edge of data and technology.

## Profession Learning Pathways

The pathways below set out our core tools & stack for Data & Analytics Engineering in the MoJ.
{% set menuItems = [
    { url: "analytics-engineer/", title: "Analytics Engineering Pathway", description: "Explore the materials and opportunities for learning on the Analytics Engineering Pathway" },
    { url: "data-engineer/", title: "Data Engineering Pathway", description: "Explore the materials and opportunities for learning on the Data Engineering Pathway" },
    {
      url: "apprenticeship/",
      title: "Apprenticeships",
      description: "Explore what MoJ is doing to nurture digital & data talent" }
] %}
{% cardGrid menuItems %}
