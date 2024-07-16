---
layout: sub-navigation
title: Data Solution Architecture Overview
description: Find out about our data solution architecture
eleventyNavigation:
  key: Data Solution Architecture
  parent: About
---

Our data and analytics engineers build analytical pipelines and self-service tools that are used to acquire and transform data to be made available on the [Analytical Platform](https://user-guidance.analytical-platform.service.justice.gov.uk). These form the steps of a typical ['ELT' process](https://en.wikipedia.org/wiki/Extract,_load,_transform) (Extract, Load, Transform) that produces cleaner / more standardised data in a format that downstream analysts expect, at a reliable quality. These steps enable experienced MoJ data users - such as Data Analysts and Data Scientists - to derive valuable insights from the data while spending less of their time on data pre-processing.

We implement a [data lake](https://aws.amazon.com/what-is/data-lake/)-centric approach to manage our data, using a centralised repository to store both structured and unstructured data. We provide data that is curated, conformed, tracks changes over time and optimised for SQL query operations. To support this infrastructure, we rely on various [AWS serverless and managed services](https://aws.amazon.com/blogs/big-data/aws-serverless-data-analytics-pipeline-reference-architecture/) to ensure scalability, resilience, security, and cost-effectiveness.

## Solution Architecture

Our data solution architecture can be broadly split into 5 layers:

![data architecture](./images/data-lake-architecture.drawio.svg)

## Key systems and steps

1. Data and metadata are collected from multiple data sources across the MoJ and external to the MoJ, including [AWS S3](https://aws.amazon.com/s3/), file shares, relational databases, APIs, and [Azure Blob Storage](https://azure.microsoft.com/en-gb/products/storage/blobs).
2. This data is ingested into a data lake on the Analytical Platform. There are several approaches depending on the data source and user credentials, for example [AWS Database Migration Service (AWS DMS)](https://aws.amazon.com/dms/), [SFTP](https://en.wikipedia.org/wiki/SSH_File_Transfer_Protocol) or [Amazon API Gateway](https://aws.amazon.com/api-gateway/).
3. The Data Lake consists of Amazon S3 for data lake storage, [AWS Glue Data Catalog](https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html) as a metadata repository, [Apache Hive and Iceberg](https://aws.amazon.com/what-is/apache-iceberg/) to provide a SQL-like interface, and [AWM IAM](https://aws.amazon.com/iam/) to secure access to the data.
4. Data is processed using [Amazon Athena](https://aws.amazon.com/athena/) for SQL-based transformation and managed using [dbt](https://www.getdbt.com/), or using Python scheduled using [Amazon Managed Workflows for Apache Airflow](https://aws.amazon.com/managed-workflows-for-apache-airflow/).
5. Data is consumed using various tools depending on the user's preference and catalogued using [DataHub](https://datahubproject.io/).
