---
homepage: true
layout: product
title: Data and Analytics Engineering
description: Learn about the data and analytics engineering professions at the Ministry of Justice.
eleventyNavigation:
  key: Home
---
<div class="govuk-phase-banner">
  <p class="govuk-phase-banner__content">
    <strong class="govuk-tag govuk-phase-banner__content__tag">
      Beta
    </strong>
    <span class="govuk-phase-banner__text">
      This is a new learning resource. Help us improve it and <a class="govuk-link" href="https://forms.office.com/Pages/ResponsePage.aspx?id=KEeHxuZx_kGp4S6MNndq2CwHoPSb2ehGmP-rnk2wuOtUN0ROTTg3U0pMN1ozMUQyVEVOVVNSUjdYWC4u">leave your feedback via our form</a>.
    </span>
  </p>
</div>
{% set menuItems = [
    { url: "about/", title: "About", description: "Find out more about what data and analytics engineering are, what we do and where we fit in the organisation." },
    { url: "learning/", title: "Learning", description: "Explore the many ways we encourage and support continuous learning and development." },
    { url: "how-we-work/", title: "How we work", description: "Explore events and approaches we use to work together more effectively." },
    { url: "regular-meetings/", title: "Regular meetings", description: "Find out about our regular meetings." },
    { url: "innovation/", title: "Innovation", description: "Innovation is at the heart of what we do at the MoJ. Find out about how we encourage and support innovation." },
    { url: "blog/", title: "Blog", description: "Find out what we're working on across the data and analytics engineering professions." }
] %}
{% cardGrid menuItems, "one-third" %}