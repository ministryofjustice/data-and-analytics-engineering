/**
 * Table of Contents Transform
 * Orchestrates TOC generation and injection into HTML pages
 */

import * as cheerio from "cheerio";
import {
  extractHeadings,
  buildTocHTML,
  shouldShowTOC,
} from "./toc-generator.js";
import scrollspyScript from "./toc-scrollspy.js";

/**
 * Inject Table of Contents into pages with #toc-sidebar element
 * @param {string} content - HTML content
 * @param {string} outputPath - Output file path
 * @returns {string} Modified HTML content
 */
function injectTOC(content, outputPath) {
  // Only process HTML files
  if (!outputPath || !outputPath.endsWith(".html")) {
    return content;
  }

  // Load HTML with Cheerio
  const $ = cheerio.load(content, {
    decodeEntities: false, // Preserve HTML entities
  });

  // Find TOC container element
  const tocContainer = $("#toc-sidebar");

  // If no TOC container found, skip this page
  if (tocContainer.length === 0) {
    return content;
  }

  // Extract headings from the page
  const headings = extractHeadings($);

  // Build TOC HTML
  let tocHTML;
  if (shouldShowTOC(headings)) {
    tocHTML = buildTocHTML(headings);
  } else {
    // Show message if not enough headings
    tocHTML = '<p class="app-toc__empty">No table of contents available</p>';
  }

  // Inject TOC HTML into container
  tocContainer.html(tocHTML);

  // Get modified HTML
  let modifiedHTML = $.html();

  // Only inject scroll-spy script if we have a valid TOC
  if (shouldShowTOC(headings)) {
    modifiedHTML = modifiedHTML.replace("</body>", scrollspyScript + "</body>");
  }

  return modifiedHTML;
}

export { injectTOC };
