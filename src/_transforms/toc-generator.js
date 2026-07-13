/**
 * Table of Contents Generator
 * Pure functions for extracting headings and building TOC HTML
 * No dependencies on DOM libraries or Eleventy
 */

/**
 * Extract h2 and h3 headings from a Cheerio $ object
 * @param {CheerioAPI} $ - Cheerio loaded HTML
 * @returns {Array} Array of heading objects {id, text, level}
 */
function extractHeadings($) {
  const headings = [];

  $("h2[id], h3[id]").each((i, elem) => {
    const $heading = $(elem);
    const id = $heading.attr("id");
    const text = $heading.text().trim();
    const level = elem.name === "h2" ? 2 : 3;

    if (id && text) {
      headings.push({ id, text, level });
    }
  });

  return headings;
}

/**
 * Build nested TOC HTML from headings array
 * @param {Array} headings - Array of {id, text, level}
 * @returns {string} HTML string for TOC
 */
function buildTocHTML(headings) {
  if (!headings || headings.length === 0) {
    return '<p class="app-toc__empty">No table of contents available</p>';
  }

  let html = '<h2 class="app-toc__title"> Table Of Contents </h2>\n';
  html += '<ul class="app-toc__list">\n';

  let i = 0;
  while (i < headings.length) {
    const heading = headings[i];

    if (heading.level === 2) {
      // h2 heading
      html += `  <li class="app-toc__item" data-target="${heading.id}">\n`;
      html += `    <a href="#${heading.id}" class="app-toc__link">${escapeHtml(heading.text)}</a>\n`;

      // Check if next items are h3 (nested under this h2)
      if (i + 1 < headings.length && headings[i + 1].level === 3) {
        html += '<ul class="app-toc__list--nested">\n';

        i++;
        while (i < headings.length && headings[i].level === 3) {
          const h3 = headings[i];
          html += `  <li class="app-toc__item" data-target="${h3.id}">\n`;
          html += `    <a href="#${h3.id}" class="app-toc__link">${escapeHtml(h3.text)}</a>\n`;
          html += `  </li>\n`;
          i++;
        }

        html += "</ul>\n";
        // Don't increment i here - we've already processed all h3s
        html += `  </li>\n`;  // Close the h2's li
        continue;
      }

      html += `  </li>\n`;
    }

    i++;
  }

  html += "</ul>\n";

  return html;
}

/**
 * Determine if TOC should be shown based on heading count
 * @param {Array} headings - Array of heading objects
 * @param {number} minHeadings - Minimum number of headings to show TOC
 * @returns {boolean}
 */
function shouldShowTOC(headings, minHeadings = 2) {
  return headings && headings.length >= minHeadings;
}

/**
 * Simple HTML escape for TOC text
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const htmlEscapes = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}

export {
  extractHeadings,
  buildTocHTML,
  shouldShowTOC,
};
