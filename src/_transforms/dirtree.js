const folderIcon = `<svg class="dirtree-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.5 3C1.5 2.44772 1.94772 2 2.5 2H6L7.5 4H13.5C14.0523 4 14.5 4.44772 14.5 5V13C14.5 13.5523 14.0523 14 13.5 14H2.5C1.94772 14 1.5 13.5523 1.5 13V3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
</svg>`;

const fileIcon = `<svg class="dirtree-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.5 1.5H9.5L12.5 4.5V14.5H3.5V1.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M9.5 1.5V4.5H12.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
</svg>`;

// Directory tree shortcode
export function dirtree(content) {
  // Parse the content line by line
  const lines = content.trim().split("\n");

  // Parse lines into structured items
  const items = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    const leadingSpaces = line.search(/\S/);
    const indentLevel = Math.floor(leadingSpaces / 4);
    const name = line.trim();
    const isFolder = name.endsWith("/");
    items.push({ indentLevel, name, isFolder });
  }

  // Compute isLastChild for each item
  for (let i = 0; i < items.length; i++) {
    const level = items[i].indentLevel;
    items[i].isLastChild = true;
    for (let j = i + 1; j < items.length; j++) {
      if (items[j].indentLevel === level) {
        items[i].isLastChild = false;
        break;
      }
      if (items[j].indentLevel < level) {
        break;
      }
    }
  }

  // Build prefix with tree connectors for each item
  const treeItems = items
    .map((item, i) => {
      let prefix = "";

      // Level-0 items don't get connectors (they are tree roots)
      if (item.indentLevel > 0) {
        // For each ancestor level, determine if it continues below
        for (let l = 1; l < item.indentLevel; l++) {
          let ancestorContinues = false;
          for (let j = i + 1; j < items.length; j++) {
            if (items[j].indentLevel === l) {
              ancestorContinues = true;
              break;
            }
            if (items[j].indentLevel < l) {
              break;
            }
          }
          prefix += ancestorContinues ? "│   " : "    ";
        }
        // Add connector for this item's own level
        prefix += item.isLastChild ? "└── " : "├── ";
      }

      const icon = item.isFolder ? folderIcon : fileIcon;
      const nameClass = item.isFolder
        ? "dirtree-name dirtree-folder-name"
        : "dirtree-name";
      const displayName = item.isFolder
        ? item.name.slice(0, -1) + "/"
        : item.name;

      const prefixHtml = prefix
        ? `<span class="dirtree-connectors">${prefix}</span>`
        : "";

      return `<div class="dirtree-item">${prefixHtml}${icon}<span class="${nameClass}">${displayName}</span></div>`;
    })
    .join("");

  return `<div class="dirtree">${treeItems}</div>\n`;
}
