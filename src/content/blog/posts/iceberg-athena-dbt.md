---
title: Building a transaction data lake using Amazon Athena, Apache Iceberg and dbt
description: How we leveraged Amazon Athena, along with the Apache Iceberg table format and the dbt SQL management framework, to build robust, scalable and maintainable ELT (extract, load, transform) pipelines.
date: 2024-10-07
author:
  name: Dr Soumaya Mauthoor
permalink: "/blog/posts/{{ title | slugify }}/"
tags:
  - Athena
  - Iceberg
  - dbt
---

At the [UK Ministry of Justice (MoJ)](https://mojdigital.blog.gov.uk/), our goal is to make the justice system simpler and quicker while saving public money. The [MoJ Analytical Platform](https://user-guidance.analytical-platform.service.justice.gov.uk/) helps achieve this by facilitating data sharing and analysis within the MoJ, aiding better decision-making.

The Analytical Platform includes various tools, such as [Amazon Athena](https://aws.amazon.com/athena/), enabling analysts to query data held in an Amazon Simple Storage Service ([S3](http://aws.amazon.com/s3)) [transaction data lake](https://aws.amazon.com/blogs/big-data/choosing-an-open-table-format-for-your-transactional-data-lake-on-aws/). Athena is an ANSI-SQL compliant distributed query engine that can analyse petabytes of data where it lives. Athena is [typically designated](https://aws.amazon.com/blogs/big-data/build-a-lake-house-architecture-on-aws/) as an interactive query service, with other tools like [AWS Glue](https://aws.amazon.com/glue/) being recommended for data processing. While this setup offers greater flexibility, it may increase the complexity of maintaining your data lake.

This post summarises how the Analytical Platform leverages Athena, along with the [Apache Iceberg](https://iceberg.apache.org/) table format and the [dbt-athena](https://dbt-athena.github.io/) SQL management framework, to build robust, scalable and maintainable [ELT](https://aws.amazon.com/what-is/etl/) (extract, load and transform) pipelines. This approach makes it possible to use the same tools to query and process our data, streamlining our data lake. Moreover, this approach capitalises on the terabyte-scale of our data lake, allowing us to take advantage of Athena’s pricing model and reducing our processing costs significantly. However, it's worth noting that this cost advantage may diminish for data lakes operating at the petabyte-scale.

[[toc]]

### Data Lake Architecture

[Transaction data lakes](https://aws.amazon.com/blogs/big-data/choosing-an-open-table-format-for-your-transactional-data-lake-on-aws/) combine the best features of a data lake and a data warehouse:

* The flexibility, scalability and cost-effectiveness of a data lake  
* The structured data storage and processing capabilities of a data warehouse

The Analytical Platform transaction data lake architecture shares many similarities with the [AWS modern data lake reference architecture](https://docs.aws.amazon.com/architecture-diagrams/latest/modern-data-analytics-on-aws/modern-data-analytics-on-aws.html). Data is collected in various formats from a wide range of sources, both internal and external to the MoJ. The ingestion layer provides a variety of push and pull mechanisms, tailored to each data source, to upload both data and metadata into the data lake. The processing layer then transforms the data for efficient querying and analysis, before writing it back to the data lake. Analysts can consume the transformed data using Athena or their preferred development environment. Please refer to our [architecture documentation](../../../about/architecture/) for further details about our technology stack.

![](https://raw.githubusercontent.com/ministryofjustice/data-and-analytics-engineering/main/src/content/about/architecture/images/container-diagram.excalidraw.png)

This article explores the SQL-based transformation layer and the enhancements we have implemented.

### Athena for scalability

Amazon Athena is built on the open-source [Trino SQL Engine](https://trino.io/), and more recently the Apache Spark framework. Athena uses the [AWS Glue Data Catalog](https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html), an [Apache Hive metastore](https://blog.jetbrains.com/big-data-tools/2022/07/01/why-we-need-hive-metastore/)-compatible catalogue, to store and retrieve table metadata for data held in S3. The table metadata lets the Athena query engine know how to find, read, and process the data users want to query.

It is possible to create [ELT pipelines](https://docs.aws.amazon.com/athena/latest/ug/ctas-insert-into-etl.html) in Athena with the default Hive table format using the Create Table As Select ([CTAS](https://docs.aws.amazon.com/athena/latest/ug/ctas.html)) and [INSERT INTO](https://docs.aws.amazon.com/athena/latest/ug/insert-into.html) statements. This offers several advantages:

* Athena is interactive, serverless and SQL-based, which makes it easy and intuitive to use, particularly for new joiners.  
* Using a single tool for processing and querying makes it easier to share best practice between data engineers and analysts, for example on [performance tuning](https://docs.aws.amazon.com/athena/latest/ug/performance-tuning.html), as well as build shared utilities.  
* Athena calculates the compute capacity needed to execute queries, eliminating the necessity for manual configuration and optimization.
* Whilst Athena [enforces various quotas](https://docs.aws.amazon.com/athena/latest/ug/service-limits.html), it is possible to request increases, up to a limit. This is particularly relevant for ELT processes which can take longer to run and involve hundreds of tables. For example, in our production account, we have extended the DML (Data Manipulation Language) query timeout from 30 minutes to 60 minutes, and raised the limit on concurrent queries from 150 to 500.  
* Athena's pricing model at $5 per terabyte scanned means processing gigabyte-scale data sets can be highly cost-effective.

However, the Hive table format lacks support for many standard database features, which can make the resulting pipeline less robust and flexible. Hence the need for the Iceberg table format.

### Iceberg for reliability

Apache Iceberg is an [open table format](https://aws.amazon.com/blogs/big-data/choosing-an-open-table-format-for-your-transactional-data-lake-on-aws/) that empowers Athena with support for [ACID](https://docs.aws.amazon.com/athena/latest/ug/acid-transactions.html) (Atomicity, Consistency, Isolation, Durability) transactions, [updating table data](https://docs.aws.amazon.com/athena/latest/ug/querying-iceberg-updating-iceberg-table-data.html), as well as [time travel operations](https://docs.aws.amazon.com/athena/latest/ug/querying-iceberg-table-data.html), enabling more reliable pipelines.

For instance, if a CTAS or `INSERT INTO` statement fails against a Hive table, it is possible that [orphaned data is left in the data location](https://docs.aws.amazon.com/athena/latest/ug/insert-into.html#insert-into-limitations), and accessible to read in subsequent queries. In contrast, Iceberg tables are ACID-compliant, which means that only data from successful statements is readable.

MERGE INTO?? Athena vs Glue??

Another example is when implementing the Write-Audit-Publish [(WAP)](https://lakefs.io/blog/data-engineering-patterns-write-audit-publish/\) pattern, which is frequently used in data engineering workflows to ensure data quality. It involves writing data to a preliminary environment where any errors can be addressed before the finalised data is released to users. Iceberg supports the [RENAME TABLE](https://docs.aws.amazon.com/athena/latest/ug/querying-iceberg-managing-tables.html) DDL (Data Definition Language) operation, which allows you to rename the interim table once validation checks have passed, and simplifies the WAP process during full data refreshes. Additionally, Iceberg’s time travel functionality facilitates WAP for incremental pipelines. This can be achieved by applying a [FOR TIMESTAMP AS OF <timestamp>](https://docs.aws.amazon.com/athena/latest/ug/querying-iceberg-table-data.html#querying-iceberg-time-travel-and-version-travel-queries) filter to a view built on top of the source table.

Whilst Iceberg improves the reliability of Athena-based ELT pipelines, Athena queries are still SQL-based. This can make the code difficult to maintain as detailed below, which is where dbt comes in.

### dbt for maintainability

[dbt](https://docs.getdbt.com/docs/introduction) is a transformation tool that extends SQL with features commonly associated with programming languages, enabling more flexible, scalable, and maintainable data transformation workflows. dbt is an extensible framework composed of multiple components. On the Analytical Platform we use the following components:

* [dbt-core](https://github.com/dbt-labs/dbt-core), an open-source command line tool written in python  
* [dbt-athena](https://github.com/dbt-labs/dbt-athena), a dbt-maintained trusted adapter which enables dbt to work with Athena  
* [dbt-utils](https://github.com/dbt-labs/dbt-utils) and [dbt-audit-helper](https://github.com/dbt-labs/dbt-audit-helper), dbt-maintained packages which make it easier to apply common SQL-based functionalities and validations

dbt assures the quality of your transformations through [data tests](https://docs.getdbt.com/docs/build/data-tests), for example to check whether columns contain null values. Note that with Iceberg storing much of this information as metadata, querying it through Athena becomes practically cost-free. 

dbt uses the concept of [threads](https://docs.getdbt.com/docs/running-a-dbt-project/using-threads) to parallelize models without dependencies, speeding up run time. This makes it easier to take advantage of Athena’s capacity so that you can run more queries within the concurrency quota and keeps queries from being cancelled for running too long.

dbt allows you to combine SQL with [Jinja](https://jinja.palletsprojects.com/en/3.1.x/), a templating language, and create [macros](https://docs.getdbt.com/docs/build/jinja-macros) which are analogous to "functions" in other programming languages. Similar to functions, macros minimise code redundancy and make it easier to unit test logic.

Note that whilst dbt-core v1.8 is introducing support for [unit tests](https://docs.getdbt.com/docs/build/unit-tests), this is limited to models for now. There are various community-supported dbt extensions, such as [dbt-unit-testing](https://github.com/EqualExperts/dbt-unit-testing), which can unit test macros. Nevertheless, we opted to adhere with the unit testing approach used in [dbt-utils](https://github.com/dbt-labs/dbt-utils) for its simplicity and readability.

dbt uses [materializations](https://docs.getdbt.com/docs/build/materializations) to enable different usage modes. Using views breaks down complex processes into more manageable steps, enhancing code readability and reusability. It also ensures that the source table undergoes scanning only once, thereby minimising costs. However, this must be balanced with memory usage and runtime, which can be minimised by persisting intermediate outputs to a table.

While dbt-athena supports [incremental materialization](https://dbt-athena.github.io/docs/configuration/materializations/iceberg#incremental-tables) which can speed-up runtime, this approach is [more complex to set up and maintain](https://docs.getdbt.com/best-practices/materializations/4-incremental-models). Performance testing has shown that the runtime and data scanned for recreating our largest ~200GB tables remain acceptable for our specific use case. Consequently, we have chosen to initially proceed with a simpler approach, primarily sticking with the view and table materializations.

The diagram below illustrates how we can combine dbt with Iceberg features to implement WAP in full-refresh pipelines:

![](https://raw.githubusercontent.com/moj-analytical-services/dmet-cfe/main/investigations/iceberg_athena_dbt/images/wap.excalidraw.png)

1. A draft Iceberg table is creating using a full-refresh process via CTAS  
1. Once dbt tests passes, the target table is dropped and the draft table is renamed to the target table by making use of a dbt [post-hook](https://docs.getdbt.com/reference/resource-configs/pre-hook-post-hook)

We have extended dbt with additional features to further improve maintainability and scalability.

#### Model Generation

Some transformations consist of applying the same logic to multiple tables, for example when deduplicating a dataset made up of multiple tables. This is commonly achieved by looping through a list of tables and applying the same transformation to minimise code redundancy. 

dbt has a one model per table philosophy, which makes it simple and intuitive to use. However, this approach doesn’t support looping, and you can end up creating multiple models with exactly the same logic. Redundant code is difficult to maintain because any changes to the logic will need to be replicated in multiple places. There has been [some discussion](https://github.com/dbt-labs/dbt-core/discussions/5101) to make it possible for dbt to generate models using Jinja, but this is still in progress. 

Instead, we have come up with an approach to generate models using python at run time. We create template `.sql` files to represent each model in a pipeline and generate a model per table. We pass in required parameters, which can be obtained from the glue table properties, or a `.yaml` config file. We have developed integration tests to generate and [build](https://docs.getdbt.com/reference/commands/build) the models and make sure they run as expected.

#### Chunking

Sometimes the demands of a query exceed the resources available to the Athena cluster running the query, or exceeds the query timeout. One solution is to employ chunking. This involves dividing a large dataset into smaller chunks, making each chunk quicker to process and less memory-intensive. Each chunk is then inserted into the final table using the `INSERT INTO` statement. However, this can involve maintaining a lot of boilerplate code. We have developed a [custom](https://docs.getdbt.com/guides/create-new-materializations) insert\_by\_chunk dbt materialization, based on [insert\_by\_period](https://github.com/dbt-labs/dbt-labs-experimental-features/tree/main/insert_by_period), to simplify the chunking process by specifying a single [dbt model config](https://docs.getdbt.com/reference/model-configs). After completing all the `INSERT INTO` operations, we perform various validations to ensure that all the data has been processed accurately. We would like to enhance and release this materialization as open source.

Note that each chunk is processed sequentially (instead of concurrently) due to how dbt handles materializations. However, this limitation is less significant for overnight batch processes, where runtime is less important. Furthermore, chunking is only suitable for queries that can operate on smaller portions of the dataset independently, without requiring access to the entire dataset. Finally, each chunk will incur additional costs as you scan the same data repeatedly, unless the data is partitioned by the same column used for chunking. Again, this limitation is less significant if the initial cost is low.

#### Orchestration

We use [GitHub Actions](https://github.com/features/actions) to automate and orchestrate the dbt builds. Co-locating the SQL and automation code enhances transparency and simplifies maintenance. We’ve also added several features to facilitate early error detection and automated recovery:

* A development GitHub workflow which is triggered when a pull request is raised. This workflow selectively builds new or updated models and their children in a development environment, making it easier for users to review the transformation prior to deploying to production.

* Integrating Slack notifications into our production workflows to promptly alert stakeholders in the event of model or validation failures.

* Incorporating a retry mechanism into our production workflows with custom logic. This feature identifies and automatically reattempts failed models and their children, which is particularly useful for resolving errors stemming from transient issues.

### Bringing it all together

Migrating our mission-critical pipelines from Glue PySpark and Hive to Athena, Iceberg, and dbt has resulted in a 99% reduction in individual query costs. This cost efficiency has enabled us to switch from weekly to more frequent daily refreshes and onboard new pipelines. Notably, we have still managed to achieve substantial savings, as shown in our monthly service cost graph:

![](https://raw.githubusercontent.com/moj-analytical-services/dmet-cfe/main/investigations/iceberg_athena_dbt/images/glue_vs_athena_costs.png)

The runtime for our longest jobs has decreased by 75%, and intermittent failures from insufficient resources are now extremely rare. This improvement ensures that our analysts have timely access to large datasets, enabling them to work more efficiently on a reliable and maintainable platform. We are migrating more of our pipelines to use this approach, further driving down costs and standardising our technology stack.
