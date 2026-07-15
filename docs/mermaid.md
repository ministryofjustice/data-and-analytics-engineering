# Diagrams-as-Code with Mermaid

The published site supports [Mermaid.js](https://mermaid.js.org/) for creating diagrams directly in Markdown files under `src/content/` using a simple text-based syntax. Diagrams are rendered automatically when the site is built.

## Creating Diagrams

Use the {% raw %}`{% mermaid %} / {% endmermaid %}`{% endraw %} paired shortcode in your markdown files:

{% raw %}

```raw
{% mermaid %}
graph TD
  A[Start] --> B{Decision}
  B -->|Yes| C[Action 1]
  B -->|No| D[Action 2]
  C --> E[End]
  D --> E
{% endmermaid %}
```

{% endraw %}

This renders as:

{% mermaid %}
graph TD
A[Start] --> B{Decision}
B -->|Yes| C[Action 1]
B -->|No| D[Action 2]
C --> E[End]
D --> E
{% endmermaid %}

## Basic Diagram Types

### Data Pipeline Orchestration

Sequence diagrams are useful for showing the flow of data processing steps:

{% raw %}

```raw
{% mermaid %}
sequenceDiagram
  participant Scheduler
  participant Glue as ETL Job
  participant S3 as Raw Data
  participant Redshift as Data Warehouse
  participant dbt as dbt Transformation

  Scheduler->>Glue: Trigger extraction
  Glue->>S3: Extract raw data
  S3-->>Glue: Data loaded
  Glue->>Redshift: Load to staging
  Redshift-->>Scheduler: Load complete
  Scheduler->>dbt: Run transformations
  dbt->>Redshift: Build models
  Redshift-->>dbt: Models built
  dbt-->>Scheduler: Pipeline complete

{% endmermaid %}
```

{% endraw %}

{% mermaid %}
sequenceDiagram
participant Scheduler
participant Glue as ETL Job
participant S3 as Raw Data
participant Redshift as Data Warehouse
participant dbt as dbt Transformation

Scheduler->>Glue: Trigger extraction
Glue->>S3: Extract raw data
S3-->>Glue: Data loaded
Glue->>Redshift: Load to staging
Redshift-->>Scheduler: Load complete
Scheduler->>dbt: Run transformations
dbt->>Redshift: Build models
Redshift-->>dbt: Models built
dbt-->>Scheduler: Pipeline complete

{% endmermaid %}

### Analytics Data Model

Entity relationship diagrams for documenting analytics models

{% raw %}

```raw
{% mermaid %}
erDiagram

  DIM_DATE ||--o{ FACT_SALES : "date_key"
  DIM_PRODUCT ||--o{ FACT_SALES : "product_key"
  DIM_CUSTOMER ||--o{ FACT_SALES : "customer_key"

  DIM_DATE {
  int date_key PK
  date full_date
  int year
  int month
  int quarter
  }

  DIM_PRODUCT {
  int product_key PK
  string product_name
  string category
  decimal price
  }

  DIM_CUSTOMER {
  int customer_key PK
  string customer_name
  string segment
  string region
  }

  FACT_SALES {
  int sale_key PK
  int date_key FK
  int product_key FK
  int customer_key FK
  decimal revenue
  int quantity
  }
{% endmermaid %}
```

{% endraw %}

{% mermaid %}
erDiagram

DIM_DATE ||--o{ FACT_SALES : "date_key"
DIM_PRODUCT ||--o{ FACT_SALES : "product_key"
DIM_CUSTOMER ||--o{ FACT_SALES : "customer_key"

DIM_DATE {
int date_key PK
date full_date
int year
int month
int quarter
}

DIM_PRODUCT {
int product_key PK
string product_name
string category
decimal price
}

DIM_CUSTOMER {
int customer_key PK
string customer_name
string segment
string region
}

FACT_SALES {
int sale_key PK
int date_key FK
int product_key FK
int customer_key FK
decimal revenue
int quantity
}
{% endmermaid %}

## AWS Architecture Diagrams

To use AWS icons in your Mermaid diagrams, use the {% raw %}`{% mermaid %}`{% endraw %} shortcode and reference icons with the `logos:` prefix.

This **only works** for `architecture-beta` diagram types. Normal mermaid diagrams will **not** render external icons.

The syntax for architecture-beta is a little different to normal Mermaid, as the example below demonstrates:

{% raw %}

```
{% mermaid %}
architecture-beta
  service s3(logos:aws-s3)[Raw Data]
  service airflow(logos:airflow-icon)[Pipeline]
  service athena(logos:aws-athena)[Lakehouse]
  service cadet(logos:dbt-icon)[CADET]

  s3:R --> L:airflow
  airflow:R --> L:athena
  athena:R --> L:cadet
{% endmermaid %}
```

{% endraw %}

This will render as:

{% mermaid %}
architecture-beta
service s3(logos:aws-s3)[Raw Data]
service airflow(logos:airflow-icon)[Pipeline]
service athena(logos:aws-athena)[Lakehouse]
service cadet(logos:dbt-icon)[CADET]

s3:R --> L:airflow
airflow:R --> L:athena
athena:R --> L:cadet
{% endmermaid %}

> [!NOTE]
> It may be confusing to see `s3:R --> L:airflow` when the rendered diagram is the other way around (s3 on the left, airflow on the right).
> This is because the L and R refer to **where in the icon the arrow connects** - i.e. it connects the right side of `s3` to the left side of `airflow`.

### Notes

- See the [architecture-beta Mermaid guide](https://mermaid.js.org/syntax/architecture.html#example) for more.
- This list is automatically updated when the `@iconify-json/logos` package releases new 1.x versions
- For the complete icon catalog (including non-AWS icons), visit: [https://icon-sets.iconify.design/logos/](https://icon-sets.iconify.design/logos/)

## Custom Icons

You can create and using custom icons in your diagrams with just two steps:

### 1. Add Your SVG File

Place your SVG file in the `src/assets/icons/` directory:

The filename (without `.svg`) becomes the `icon name` within the diagram.

### 2. Use in Diagrams

Reference the icon using `custom:icon name` in architecture-beta diagrams:

{% raw %}

```
{% mermaid %}
architecture-beta
   service viz(custom:tableau)[Analytics Platform]
   service dash(custom:powerbi)[BI Dashboard]

   viz:R --> L:dash
{% endmermaid %}
```

{% endraw %}

That's it! The build process automatically discovers and includes your icon.

### How It Works

#### Auto-Discovery at Build Time

During the build process (`npm run build`):

1. **Scan**: The build scans `src/assets/icons/` for all `.svg` files
2. **Parse**: Each SVG is parsed to extract:
   - Icon dimensions (width/height from SVG attributes)
   - Body content (everything inside the `<svg>` tags)
3. **Generate**: A custom icon pack is generated and injected into all pages
4. **Register**: Mermaid registers the icon pack alongside AWS/logos icons

Build output shows discovered icons:

```
Discovered 2 custom icon(s): powerbi, tableau
```

An example is the Power BI icon, which is defined in `src/assets/icons/powerbi.svg` and renders as:

{% mermaid %}
architecture-beta
service database(logos:aws-athena)[Derived Tables]
service dashboard(custom:powerbi)[Dashboard]

database:R --> L:dashboard
{% endmermaid %}

#### Technical Implementation

The icon discovery is handled by two modules:

- **`src/_transforms/svg-icon-loader.js`**: Parses SVG files and discovers icons
- **`src/_transforms/transforms.js`**: Injects Mermaid initialization with icon packs

#### Limitations

- **Architecture-beta only**: Custom icons only work in `architecture-beta` diagrams, not in `graph`, `flowchart`, or `sequence` diagrams (this is a Mermaid.js limitation)
- **Simple SVG features**: Use basic SVG elements (paths, rectangles, gradients in `<defs>`). Avoid complex features like masks with `<use>` references as these will not render correctly.

### Current Icons

To see all available custom icons, browse `src/assets/icons/`.

## How Mermaid Diagrams Work

The site uses two mechanisms to enable Mermaid diagrams:

1. **Transform** (`src/_transforms/transforms.js`): Automatically injects Mermaid.js and Iconify libraries into all HTML pages at build time
2. **Shortcode** (`src/_transforms/shortcodes.js`): Provides a {% raw %}`{% mermaid %}/{% endmermaid %}`{% endraw %} paired shortcode for embedding diagrams in markdown

## Tips

1. **Direction matters**: Use `graph TD` for top-down, `graph LR` for left-right, `graph BT` for bottom-top, `graph RL` for right-left.

2. **Preview locally**: If you have the VS Code Mermaid Extension, you can write your mermaid code without the mermaid/ endmermaid paired block while developing to ensure your previews work. Then just add the paired block at the end once happy.

3. **Escape special characters**: If node labels contain special characters, wrap them in quotes: `A["Label with [brackets]"]`

## Additional Resources

- [Mermaid.js Documentation](https://mermaid.js.org/)
- [Mermaid Live Editor](https://mermaid.live/) - Test diagrams online
