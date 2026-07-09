---
layout: sub-navigation
title: Soft Skills
eleventyNavigation:
  key: Soft Skills
  parent: Learning
  order: 6
---

Soft skills are personal attributes and interpersonal abilities that enable individuals to work effectively with others in a professional environment. Unlike technical skills, which are job-specific, soft skills are universally valuable across roles and industries. They include communication, teamwork, problem-solving, leadership, adaptability, and emotional intelligence.

{% set menuItems = [
    { url: "emotional/", title: "Emotional Intelligence", description: "Resources and blog posts about ways to improve your interactions with others." },
    { url: "leadership/", title: "Leadership", description: "Resources and blog posts about how to become a more effective leader." },
    { url: "stakeholder/", title: "Stakeholder Management", description: "Resources and blog posts on building relationships with stakeholders, or customers, to align expectations and ensure successful project outcomes." },
    { url: "requirements/", title: "Requirements Gathering", description: "Resources and blog posts on identifying and documenting stakeholder needs to guide project development." },
    { url: "meeting/", title: "Meeting Facilitation", description: "Resources and blog posts about how to get the most out of your meetings." },
    { url: "agile/", title: "Agile Delivery", description: "Resources and blog posts for learning about Agile Techniques and how to apply them." },
    { url: "scrum/", title: "Scrum Guide", description: "Resources and blog posts about Scrum techniques." },
    { url: "coaching/", title: "Coaching", description: "Resources and blog posts about effective techniques for coaching." },
    { url: "productivity/", title: "Productivity", description: "Resources and blog posts about how to improve productivity." },
    { url: "change/", title: "Change Management", description: "Resources and blog posts about Managing change." }
] %}
{% cardGrid menuItems %}
