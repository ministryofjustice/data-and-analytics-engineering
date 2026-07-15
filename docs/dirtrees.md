# Drawing Directory Trees

Create clean, professional directory trees in your documentation, using GovUK Style.

## How to create directory trees

You can draw directory trees of files and folders in published Markdown files under `src/content/` using the `dirtree` paired shortcode.
The below text:

{% raw %}

```
{% dirtree %}
root/
    file.parquet
    subfolder/
        subfolder-file.csv
{% enddirtree %}
```

{% endraw %}

will render as:

{% dirtree %}
root/
file.parquet
subfolder/
subfolder-file.csv
{% enddirtree %}

### Usage Tips

1. **Indentation**: Use exactly 4 spaces per level (not tabs)
2. **Folders**: Always end folder names with `/` to distinguish them from files

### Deeper nesting

Tree connector lines (`├──`, `└──`, `│`) are automatically drawn to show the hierarchy:

{% dirtree %}
pipelines/
commercial/
finance/
hr/
ctm/
fieldglass/
splashbi/
workforce/
hr_wf_59_leavers.yml
{% enddirtree %}

## How it works

The directory tree feature uses a paired shortcode that processes indented text at build time:

1. **Parse**: The shortcode reads each line and counts leading spaces (4 spaces = 1 level)
2. **Detect**: Items ending with `/` are identified as folders, others as files
3. **Render**: Each item gets an SVG icon (folder or file) and appropriate styling
4. **Style**: Folder names are rendered in bold blue, files in black

### Technical Implementation

The directory tree rendering is handled by:

- **`src/_transforms/shortcodes.js`**: Registers the `dirtree` paired shortcode with Eleventy
- **`src/_transforms/dirtree.js`**: Parses content and generates HTML with inline SVG icons (folder and file)
- **`src/content/_styles.scss`**: Styling for the tree structure, indentation, and colors

The shortcode embeds SVG icons directly in the HTML output, using `currentColor` for the stroke, allowing CSS to control the icon color through the text color property.
