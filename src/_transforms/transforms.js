// Export all transforms
// Define transforms below and add them here
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { discoverCustomIcons } from "./svg-icon-loader.js";
import { injectTOC } from "./toc-transform.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function addTransforms(eleventyConfig) {
  eleventyConfig.addTransform("mermaid-script", mermaidScript);
  eleventyConfig.addTransform("inject-toc", injectTOC);
  eleventyConfig.addTransform("copy-code-script", copyCodeScript);

  // Add any future transforms here
  // eleventyConfig.addTransform("newTransform", newTransformFunction);
}

const copyCodeScript = function (content, outputPath) {
  if (outputPath && outputPath.endsWith(".html")) {
    const copyCodeInit = fs.readFileSync(
      path.join(__dirname, "copy-code-init.js"),
      "utf8",
    );

    const script = `
      <script>${copyCodeInit}</script>
      </body>`;
    return content.replace("</body>", script);
  }
  return content;
};

// Mermaid script injection transform
// Adds Mermaid.js library to all HTML pages for diagram rendering
// Auto-discovers custom icons from assets/icons directory
const mermaidScript = function (content, outputPath) {
  if (outputPath && outputPath.endsWith(".html")) {
    // Read the core Mermaid initialization script
    const mermaidInit = fs.readFileSync(
      path.join(__dirname, "mermaid-init.js"),
      "utf8",
    );

    // Auto-discover custom icons from SVG files
    const customIcons = discoverCustomIcons();

    // Build the custom icons pack code string
    const iconsJson = JSON.stringify(customIcons, null, 8).replace(/"/g, "'"); // Use single quotes for consistency

    const customIconsString = `{
  name: 'custom',
  loader: async () => {
    return {
      prefix: 'custom',
      width: 24,
      height: 24,
      icons: ${iconsJson}
    };
  }
}`;

    // Combine them by replacing the placeholder
    const combinedScript = mermaidInit.replace(
      "__CUSTOM_ICONS_PLACEHOLDER__",
      customIconsString,
    );

    const script = `
      <script src="https://code.iconify.design/3/3.1.0/iconify.min.js"></script>
      <script type="module">${combinedScript}</script>
      </body>`;
    return content.replace("</body>", script);
  }
  return content;
};
