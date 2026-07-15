// Mermaid.js initialization script
// This script is injected into all HTML pages to enable Mermaid diagram rendering
// with AWS icon support via Iconify and custom local icons

import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

// Configure Mermaid with icon packs
await mermaid.registerIconPacks([
  {
    name: "logos",
    loader: async () => {
      const data = await fetch(
        "https://unpkg.com/@iconify-json/logos@1/icons.json",
      ).then((res) => res.json());

      return data;
    },
  },
  // Replaced at build time with auto-discovered icons from assets/icons/*.svg
  __CUSTOM_ICONS_PLACEHOLDER__,
]);

mermaid.initialize({
  startOnLoad: true,
  securityLevel: "loose",
});
