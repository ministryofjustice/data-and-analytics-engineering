---
layout: article
title: How we work
eleventyNavigation:
  key: How we work
  parent: Home
---

Effective ways of working in both group and one-to-one settings are key to fostering collaboration, learning, and innovation in the workplace. At the Ministry of Justice, we emphasise a variety of practices that promote teamwork, knowledge sharing, and professional development.

{% set menuItems = [
    { url: "collaboration/", title: "Collaboration and Engagement Squad", description: "Our Collaboration and Engagement squad aims to coordinate and enable interaction between teams both within the department and with external groups." },
    { url: "buddy-system/", title: "Buddy System", description: "Our Buddy system is a structured approach designed to integrate with existing teams and enhance the learning of new processes." },
    { url: "mentoring/", title: "Mentoring Scheme", description: "Our mentoring scheme enhances personal growth and development by pairing colleagues of varied experience levels." },
    { url: "pair/", title: "Pair Programming", description: "Pair Programming enhances knowledge transfer by collaborative development activities." },
    { url: "code/", title: "Code Review", description: "Code reviews enhance quality and maintainability of our codebase by constructive critical review of new code additions before they become part of the main codebase." },
    { url: "show/", title: "Show & Tells", description: "Our Show and Tell events allow colleagues to highlight their recent work and share progress." },
    { url: "reading/", title: "Reading Groups", description: "Our reading groups create a collaborative learning environment for the development of new skills." }
] %}
{% cardGrid menuItems %}
