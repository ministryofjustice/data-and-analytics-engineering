---
layout: tag
pagination:
  addAllPagesToCollections: true
  alias: tag
  data: collections.tags
  size: 1
permalink: "/tags/{{ tag | slugify }}/"
eleventyComputed:
  title: "Posts tagged ‘{{ tag }}’"
eleventyNavigation:
  key: "{{ tag }}"
  parent: Tags
---
