---
layout: sub-navigation
title: Regular meetings
eleventyNavigation:
  key: Regular meetings
  parent: Home
  order: 4
---

Within the Data and Analytics Engineers we have several regular meetings, each with a dedicated purpose to enable us to collaborate and work effectively.

{% set menuItems = [
    { url: "community_forum/", title: "Community Forum", description: "Find out about our fortnightly Community Forum meetings where we cover a wide range of topics." },
    { url: "tech_review/", title: "Tech Review", description: "Find out about our monthly Tech Review meetings for feedback and discussions of the technology and tools we use." },
    { url: "portfolio_spotlight/", title: "Portfolio Spotlight", description: "Find out about our monthly Portfolio Spotlight meetings where we review what is happening in each portfolio." },
    { url: "analytics_engineering_monthly/", title: "Analytics Engineering Monthly", description: "Find out about our monthly Analytics Engineering meetings where we meet as a profession." }
] %}
{% cardGrid menuItems %}
