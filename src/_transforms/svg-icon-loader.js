// SVG Icon Loader
// Auto-discovers and parses SVG files from assets/icons directory
// for use as custom icons in Mermaid diagrams

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cache for discovered icons to avoid redundant filesystem operations
let iconsCache = null;
let hasLoggedDiscovery = false;

/**
 * Parse an SVG file and extract icon data for Mermaid
 * @param {string} filePath - Path to the SVG file
 * @returns {Object|null} Icon data with body, width, height or null on error
 */
function parseSvgFile(filePath) {
  try {
    const svgContent = fs.readFileSync(filePath, "utf8");

    // Extract width and height from SVG tag
    const widthMatch = svgContent.match(/width="(\d+)"/);
    const heightMatch = svgContent.match(/height="(\d+)"/);
    const width = widthMatch ? parseInt(widthMatch[1]) : 24;
    const height = heightMatch ? parseInt(heightMatch[1]) : 24;

    // Extract body content (everything inside <svg>...</svg>, excluding the tags)
    const bodyMatch = svgContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
    const body = bodyMatch ? bodyMatch[1].trim() : "";

    return { body, width, height };
  } catch (error) {
    console.warn(
      `Warning: Failed to parse SVG file ${filePath}:`,
      error.message,
    );
    return null;
  }
}

/**
 * Discover all custom icons from the assets/icons directory
 * @param {string} baseDir - Base directory (defaults to __dirname)
 * @returns {Object} Map of icon names to icon data
 */
function discoverCustomIcons(baseDir = __dirname) {
  // Return cached icons if already discovered
  if (iconsCache !== null) {
    return iconsCache;
  }

  const iconsDir = path.join(baseDir, "../assets/icons");
  const icons = {};

  try {
    // Check if directory exists
    if (!fs.existsSync(iconsDir)) {
      console.warn(`Warning: Icons directory not found: ${iconsDir}`);
      iconsCache = icons;
      return icons;
    }

    // Read all files in the icons directory
    const files = fs.readdirSync(iconsDir);

    // Process each .svg file
    files.forEach((file) => {
      if (file.endsWith(".svg")) {
        const iconName = file.replace(".svg", "");
        const filePath = path.join(iconsDir, file);
        const iconData = parseSvgFile(filePath);

        if (iconData) {
          icons[iconName] = iconData;
        }
      }
    });

    const iconCount = Object.keys(icons).length;
    const iconNames = Object.keys(icons).join(", ");

    // Only log discovery message once
    if (iconCount > 0 && !hasLoggedDiscovery) {
      console.log(`Discovered ${iconCount} custom icon(s): ${iconNames}`);
      hasLoggedDiscovery = true;
    }
  } catch (error) {
    console.warn("Warning: Failed to discover custom icons:", error.message);
  }

  // Cache the result for subsequent calls
  iconsCache = icons;
  return icons;
}

export { parseSvgFile, discoverCustomIcons };
