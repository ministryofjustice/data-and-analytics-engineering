---
title: Building a transaction data lake using Amazon Athena, Apache Iceberg and dbt
description: How we leveraged Amazon Athena, along with the Apache Iceberg table format and the dbt SQL management framework, to build robust, scalable and maintainable ELT (extract, load, transform) pipelines.
date: 2024-18-07
author:
  name: Dr Soumaya Mauthoor
permalink: "/blog/posts/{{ title | slugify }}/"
tags:
  - Athena
  - Iceberg
  - dbt
---

At the [UK Ministry of Justice (MoJ)](https://mojdigital.blog.gov.uk/), our goal is to make the justice system simpler and quicker while saving public money. The [MoJ Analytical Platform](https://user-guidance.analytical-platform.service.justice.gov.uk/) supports this mission by facilitating data sharing and analysis within the MoJ, aiding better decision-making.

The Analytical Platform includes various tools, such as [Amazon Athena](https://aws.amazon.com/athena/), which enables analysts to query data held in an Amazon Simple Storage Service ([S3](http://aws.amazon.com/s3)) [transaction data lake](https://aws.amazon.com/blogs/big-data/choosing-an-open-table-format-for-your-transactional-data-lake-on-aws/). Athena is an ANSI-SQL compliant distributed query engine that can analyse petabytes of data where it resides. Athena is [typically designated](https://aws.amazon.com/blogs/big-data/build-a-lake-house-architecture-on-aws/) as an interactive query service, with other tools like [AWS Glue](https://aws.amazon.com/glue/) suggested for data processing. While this setup offers greater flexibility, it may increase the complexity of maintaining your data lake.

This post summarises how the Analytical Platform leverages Athena, along with the [Apache Iceberg](https://iceberg.apache.org/) table format and the [dbt](https://www.getdbt.com/) SQL management framework, to build robust, scalable and maintainable [ELT](https://aws.amazon.com/what-is/etl/) (extract, load and transform) pipelines. This approach streamlines our data lake by employing the same tools for both querying and processing our data. Moreover, it capitalises on the gigabyte-scale of our data lake, allowing us to take advantage of Athena’s pricing model and significantly reduce our processing costs. However, it's worth noting that this cost advantage might diminish for data lakes operating at the petabyte-scale.

[[toc]]

### Transaction Data Lake Architecture

[Transaction data lakes](https://aws.amazon.com/blogs/big-data/choosing-an-open-table-format-for-your-transactional-data-lake-on-aws/) combine the best features of a data lake and a data warehouse:

* The flexibility, scalability and cost-effectiveness of a data lake  
* The structured data storage and processing capabilities of a data warehouse

The Analytical Platform transaction data lake architecture shares many similarities with the [AWS modern data lake reference architecture](https://docs.aws.amazon.com/architecture-diagrams/latest/modern-data-analytics-on-aws/modern-data-analytics-on-aws.html). 
We implement a standard ['ELT' process](https://en.wikipedia.org/wiki/Extract,_load,_transform) (Extract, Load, Transform), producing cleaner, uniform data in the format that downstream analysts expect, ensuring reliability. Data is collected in various formats from a wide range of sources, both internal and external to the MoJ. The ingestion layer provides a variety of push and pull mechanisms, tailored to each data source, to upload data into the data lake as [Parquet files](https://en.wikipedia.org/wiki/Apache_Parquet). Our datasets are big but not huge, with the largest table <200GB (~3 Billion rows) and the largest dataset <500GB.

The processing layer transforms the data through a series of batch processes before writing it back to the data lake. First, the data is standardised, and a Slowly Changing Dimension Type 2 [(SCD2)](https://en.wikipedia.org/wiki/Slowly_changing_dimension) process is applied to track historical changes. Second, the data is [denormalised](https://en.wikipedia.org/wiki/Denormalization) and [modelled](https://en.wikipedia.org/wiki/Data_modeling) to create the conformed layer. This makes the data easier and more efficient for users to consume. We can summarise this workflow using the [Medallion architecture](https://medium.com/@junshan0/medallion-architecture-what-why-and-how-ce07421ef06f), in which data transitions through Bronze, Silver, and Gold layers, increasing in structure and quality at each stage:

![](https://raw.githubusercontent.com/ministryofjustice/data-and-analytics-engineering/main/src/content/about/architecture/images/context-diagram.excalidraw.png)

Previously, the standardisation process was handled using [Glue PySpark](https://aws.amazon.com/blogs/big-data/dive-deep-into-aws-glue-4-0-for-apache-spark/), while data modelling was performed via Athena, managed with dbt. However, escalating Glue job costs prompted us to rethink our approach. With the recent release of [Athena V3](https://aws.amazon.com/blogs/big-data/upgrade-to-athena-engine-version-3-to-increase-query-performance-and-access-more-analytics-features/) it made sense to explore migrating the standardisation step to Athena as well and unify our data processing stack.

### Athena for scalability

Amazon Athena is built on the open-source [Trino SQL Engine](https://trino.io/), and more recently supports the Apache Spark framework. Athena uses the [AWS Glue Data Catalog](https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html), an [Apache Hive metastore](https://blog.jetbrains.com/big-data-tools/2022/07/01/why-we-need-hive-metastore/)-compatible catalogue, to store and retrieve table metadata for data stored in S3. This allows users to interact with structured data in S3 using SQL queries.

Data modelling is performed using Athena with the default Hive table format and the Create Table As Select ([CTAS](https://docs.aws.amazon.com/athena/latest/ug/ctas.html)) and [INSERT INTO](https://docs.aws.amazon.com/athena/latest/ug/insert-into.html) statements. This offers several advantages:

* Athena is interactive, serverless and SQL-based, which makes it easy and intuitive to use, particularly for new joiners.
* Using a single tool for processing and querying makes it easier to share best practice between data engineers and analysts, for example on [performance tuning](https://docs.aws.amazon.com/athena/latest/ug/performance-tuning.html), as well as build shared utilities.
* Athena calculates the compute capacity needed to execute queries, eliminating the necessity for manual configuration and optimization.
* Whilst Athena [enforces various quotas](https://docs.aws.amazon.com/athena/latest/ug/service-limits.html), it is possible to request increases, up to a limit. This is particularly relevant for ELT processes which can take longer to run and involve hundreds of tables. For example, in our production account, we have extended the DML (Data Manipulation Language) query timeout from 30 minutes to 60 minutes, and raised the limit on concurrent queries from 150 to 500.
* Athena's pricing model, set at $5 per terabyte scanned, makes it highly cost-effective to process gigabyte-scale datasets like ours.

Despite its advantages, the Hive table format lacks support for numerous standard database features, resulting in a pipeline that is less robust and flexible and less suitable for standardizing the data. Using the Iceberg table format helps address this gap.

### Iceberg for reliability

Apache Iceberg is an [open table format](https://aws.amazon.com/blogs/big-data/choosing-an-open-table-format-for-your-transactional-data-lake-on-aws/) designed to work with analytical engines such as Spark and Trino. It optimises data access, leading to faster query responses while enhancing data reliability and consistency.

Iceberg provides Athena with support for [ACID](https://docs.aws.amazon.com/athena/latest/ug/acid-transactions.html) (Atomicity, Consistency, Isolation, Durability) transactions. For instance, if a `CTAS` or `INSERT INTO` statement fails on a Hive table, it may leave [orphaned data at the data location](https://docs.aws.amazon.com/athena/latest/ug/insert-into.html#insert-into-limitations), and accessible to read in subsequent queries. In contrast, Iceberg tables are ACID-compliant, ensuring that only data from successful statements is readable.

Moreover, Iceberg allows Athena to utilize the RENAME TABLE DDL (Data Definition Language) operation. This functionality simplifies implementing the Write-Audit-Publish [(WAP)](https://lakefs.io/blog/data-engineering-patterns-write-audit-publish/) pattern, which is commonly used in data engineering workflows to ensure data quality. WAP involves writing data to a staging environment where any errors can be addressed before the finalised data is released to users.With Iceberg, once validation checks have passed, you can easily rename the interim table, making it more straightforward to implement WAP for full refresh pipelines. Additionally, Iceberg’s [time travel](https://docs.aws.amazon.com/athena/latest/ug/querying-iceberg-table-data.html) feature facilitates WAP for incremental pipelines by allowing historical data access through a [FOR TIMESTAMP AS OF <timestamp>](https://docs.aws.amazon.com/athena/latest/ug/querying-iceberg-table-data.html#querying-iceberg-time-travel-and-version-travel-queries) filter applied to views built on top of the source table.

Iceberg tables enables [row-level updates](https://docs.aws.amazon.com/athena/latest/ug/querying-iceberg-updating-iceberg-table-data.html), which is useful for implementing SCD2 since it requires updating previous records that have been replaced by newer versions. We [evaluated](https://moj-analytical-services.github.io/iceberg-evaluation/) implementing SCD2 using Glue Spark with Iceberg versus Athena with Iceberg. We found that out-of-the-box, Athena was significantly cheaper and faster for our data volumes, while Glue Spark encountered out-of-memory issues at the higher end of our volume range. This convinced us to migrate the ELT standardisation step from Glue Spark to Athena and Iceberg.

Whilst Iceberg improves the reliability of Athena-based ELT pipelines, Athena queries are still SQL-based which can lead to challenges in code maintenance. This is where dbt proves to be particularly valuable.

### dbt for maintainability

[dbt](https://docs.getdbt.com/docs/introduction) is a transformation tool that extends SQL with features commonly associated with programming languages, enabling more flexible, scalable, and maintainable data transformation workflows. dbt is an extensible framework composed of multiple components. On the Analytical Platform we use the following components:

* [dbt-core](https://github.com/dbt-labs/dbt-core), an open-source command line tool written in python  
* [dbt-athena](https://github.com/dbt-labs/dbt-athena), a dbt-maintained trusted adapter which enables dbt to work with Athena  
* [dbt-utils](https://github.com/dbt-labs/dbt-utils) and [dbt-audit-helper](https://github.com/dbt-labs/dbt-audit-helper), dbt-maintained packages which make it easier to apply common SQL-based functionalities and validations

dbt can assure the quality of transformations through [data tests](https://docs.getdbt.com/docs/build/data-tests), for example to check whether columns contain null values. Note that with Iceberg storing much of this information as metadata, querying it through Athena becomes practically cost-free. dbt uses the concept of [threads](https://docs.getdbt.com/docs/running-a-dbt-project/using-threads) to parallelize models that have no dependencies, which speeds up runtime. This makes it easier to take advantage of Athena’s capacity so that you can run more queries within the concurrency quota and keeps queries from being cancelled for running too long.

dbt allows you to combine SQL with [Jinja](https://jinja.palletsprojects.com/en/3.1.x/), a templating language, and create [macros](https://docs.getdbt.com/docs/build/jinja-macros) which are analogous to "functions" in other programming languages. Similar to functions, macros minimise code redundancy and make it easier to unit test logic. Note that whilst dbt-core v1.8 is introducing support for [unit tests](https://docs.getdbt.com/docs/build/unit-tests), this is limited to models for now. There are various community-supported dbt extensions, such as [dbt-unit-testing](https://github.com/EqualExperts/dbt-unit-testing), which can unit test macros. Nevertheless, we opted to adhere with the unit testing approach used in [dbt-utils](https://github.com/dbt-labs/dbt-utils) for its simplicity and readability.

dbt uses [materializations](https://docs.getdbt.com/docs/build/materializations) to enable different usage modes. Using views breaks down complex processes into more manageable steps, enhancing code readability and reusability. It also ensures that the source table undergoes scanning only once, thereby minimising costs. However, this must be balanced with memory usage and runtime, which can be minimised by persisting intermediate outputs to a table. While dbt-athena supports [incremental materialization](https://dbt-athena.github.io/docs/configuration/materializations/iceberg#incremental-tables), which can speed-up runtime, this approach is [more complex to set up and maintain](https://docs.getdbt.com/best-practices/materializations/4-incremental-models). Performance testing revealed that the runtime and costs for recreating our largest table remained more effective than our previous Glue PySpark-based solution. Consequently, we have chosen to initially adopt a simpler approach, primarily replying on view and table materializations.

As part of migrating our standardisation step to Athena, we have enhanced our dbt solution with additional features to further improve maintainability and scalability.

#### Model Generation

Some transformations consist of applying the same logic to multiple tables, for example when deduplicating a dataset made up of multiple tables. This is commonly achieved by looping through a list of tables and applying the same transformation to minimise code redundancy. 

dbt has a one model per table philosophy, which makes it simple and intuitive to use. However, this approach doesn’t support looping, and you can end up creating multiple models with exactly the same logic. Redundant code is difficult to maintain because any changes to the logic will need to be replicated in multiple places. There has been [some discussion](https://github.com/dbt-labs/dbt-core/discussions/5101) to make it possible for dbt to generate models using Jinja, but this is still in progress. 

Instead, we have come up with an approach to generate models using python at run time. We create template `.sql` files to represent each model in a pipeline and generate a model per table. We pass in required parameters, which can be obtained from the glue table properties, or a `.yaml` config file. We have developed integration tests to generate and [build](https://docs.getdbt.com/reference/commands/build) the models and make sure they run as expected.

#### Chunking

Sometimes the demands of a query exceed the resources available to the Athena cluster running the query, or exceeds the query timeout. One solution is to employ chunking. This involves dividing a large dataset into smaller chunks, making each chunk quicker to process and less memory-intensive. Each chunk is then inserted into the final table using the `INSERT INTO` statement. However, this can involve maintaining a lot of boilerplate code. We have developed a [custom](https://docs.getdbt.com/guides/create-new-materializations) insert\_by\_chunk dbt materialization, based on [insert\_by\_period](https://github.com/dbt-labs/dbt-labs-experimental-features/tree/main/insert_by_period), to simplify the chunking process by specifying a single [dbt model config](https://docs.getdbt.com/reference/model-configs). After completing all the `INSERT INTO` operations, we perform various validations to ensure that all the data has been processed accurately. We would like to enhance and release this materialization as open source.

Note that each chunk is processed sequentially (instead of concurrently) due to how dbt handles materializations. However, this limitation is less significant for batch processes, where runtime is less important. Furthermore, chunking is only suitable for queries that can operate on smaller portions of the dataset independently, without requiring access to the entire dataset. Finally, each chunk will incur additional costs as you scan the same data repeatedly, unless the data is partitioned by the same column used for chunking. Again, this limitation is less significant if the initial cost is low.

#### Orchestration

We use [GitHub Actions](https://github.com/features/actions) to automate and orchestrate the dbt builds. Co-locating the SQL and automation code enhances transparency and simplifies maintenance. We also added several features to facilitate early error detection and automated recovery:

* A development GitHub workflow which is triggered when a pull request is raised. This workflow selectively builds new or updated models and their children in a development environment, making it easier for users to review the transformation prior to deploying to production.

* Integrating Slack notifications into our production workflows to promptly alert stakeholders in the event of model or validation failures.

* Incorporating a retry mechanism into our production workflows with custom logic. This feature identifies and automatically reattempts failed models and their children, which is particularly useful for resolving errors stemming from transient issues.

### Bringing it all together

We previously utilized Athena alongside Glue PySpark for our ELT pipelines. Migrating from Glue PySpark and Hive to Athena v3, Iceberg, and dbt has resulted in an impressive 99% reduction in individual query costs. This cost efficiency has enabled us to switch from weekly to more frequent daily refreshes while also onboarding new pipelines. Notably, we have still managed to achieve substantial savings, as shown in our monthly service cost graph:

![](https://raw.githubusercontent.com/moj-analytical-services/dmet-cfe/main/investigations/iceberg_athena_dbt/images/glue_vs_athena_costs.png)

In addition, the runtime for our longest jobs has decreased by 75%, and intermittent failures due to insufficient resources have become extremely rare. During the migration, we took the opportunity to enhance our dbt solution by integrating features that improve both maintainability and data quality. This includes dynamically generating models and implementing a Write-Audit-Publish (WAP) pattern. These improvements ensure that our analysts have more timely access to large datasets, and to work more efficiently on a reliable and maintainable platform.

Furthermore, the unification of our data processing tools fosters a culture of collaboration within our data teams, making it easier to share enhancements and best practices. Looking ahead, we are excited about the potential to further innovate and refine our analytics capabilities, ensuring we continue to deliver greater value to the justice system.

### Acknowledgements

Bla bla bla