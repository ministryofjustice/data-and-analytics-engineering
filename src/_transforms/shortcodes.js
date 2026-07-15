// Export all shortcodes
// Define shortcodes below and add them here
import { dirtree } from "./dirtree.js";

export function addShortcodes(eleventyConfig) {
  eleventyConfig.addShortcode("cardGrid", cardGrid);
  eleventyConfig.addPairedShortcode("mermaid", mermaid);
  eleventyConfig.addPairedShortcode("dirtree", dirtree);

  // Add any future shortcodes here
  // eleventyConfig.addShortcode("newShortcode", newShortcodeFunction);
}

// Card Grid shortcode - Classes defined in /assets/styles.css
const cardGrid = function (items, columns = "one-half") {
  const gridClass = columns === "one-third" ? "one-third" : "one-half";
  const cards = items
    .map((item) => {
      return `
      <a href="${item.url}" class="govuk-card">
        <h2 class="govuk-heading-m">${item.title}</h2>
        <p class="govuk-body">${item.description || ""}</p>
      </a>`;
    })
    .join("");

  return `<div class="govuk-card-grid govuk-card-grid--${gridClass}">${cards}</div>\n`;
};

// Mermaid diagram shortcode
const mermaid = function (content) {
  return `<pre class="mermaid">${content}</pre>`;
};
