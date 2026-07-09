function addShortcodes(eleventyConfig) {
    eleventyConfig.addShortcode("cardGrid", cardGrid);
}

// Renders a responsive card grid using CSS Grid.
// Usage in markdown: {% cardGrid menuItems %}
// For a 3-column layout: {% cardGrid menuItems, "one-third" %}
const cardGrid = function (items, columns = "one-half") {
    const cards = items
        .map((item) => {
            return `<a href="${item.url}" class="govuk-card">
          <h2 class="govuk-heading-m">${item.title}</h2>
          ${item.description ? `<p class="govuk-body">${item.description}</p>` : ""}
        </a>`;
        })
        .join("\n      ");

    return `<div class="govuk-card-grid govuk-card-grid--${columns}">\n      ${cards}\n    </div>\n`;
};

module.exports = { addShortcodes };
