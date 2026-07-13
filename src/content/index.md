---
homepage: true
layout: product
title: Data and Analytics Engineering Blog
description: Learn about Data & Analytics Engineering at the Ministry of Justice.
eleventyNavigation:
  key: Home
---

{% set menuItems = [
    { url: "about/", title: "About", description: "Find out more about what data and analytics engineering are, what we do and where we fit in the organisation." },
    { url: "learning/", title: "Learning", description: "Explore the many ways we encourage and support continuous learning and development." },
    { url: "how-we-work/", title: "How we work", description: "Explore events and approaches we use to work together more effectively." },
    { url: "innovation/", title: "Innovation", description: "Innovation is at the heart of what we do at the MoJ. Find out about how we encourage and support innovation." },
    { url: "blog/", title: "Blog", description: "Find out what we're working on across the data and analytics engineering professions." }
] %}
{% cardGrid menuItems, "one-third" %}
