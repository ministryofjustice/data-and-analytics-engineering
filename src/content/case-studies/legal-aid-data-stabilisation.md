---
eleventyNavigation:
  parent: Case Studies
  title: Legal Aid Data Stabilisation
title: "Legal Aid Data Stabilisation"
description: "Creating a unified Legal Aid data model to reduce duplication, improve governance, and support transformation."
tags: [legal-aid, data-model, governance, analytics]
date: 2025-05-22
layout: sub-navigation
---

## Overview

The Legal Aid Data Stabilisation initiative supports the transition from legacy systems to a modern, reliable data foundation for the Legal Aid Agency (LAA). It introduces a unified and governed data model that serves both analytical and operational needs, enabling better insight, lower cost of service, and a path to digital transformation.

## Challenge

The LAA’s existing data landscape relied on multiple bespoke solutions, with duplicated logic, inconsistent outputs, and little documentation. Analytical products were built on top of legacy data services that were hard to maintain and integrate. This fragmentation limited performance, increased risk, and made it difficult to provide timely and accurate reporting.

## Solution

We designed and implemented a new Legal Aid data layer that integrates data from both legacy systems (such as CCMS and CWA) and modern services (such as Civil Apply). This data was transformed using a dimensional model aligned to business processes and optimised for both analytical exploration and operational insight.

We also introduced reverse ETL pipelines to ensure that transformed data could be fed back into upstream services, enhancing feedback loops and data quality. The approach supported scalable, secure reporting using cloud-native tooling.

## Impact

The new data model reduces maintenance burden and enables better alignment between analysts, operational teams, and digital delivery partners. It supports a consistent, governed data source for statutory reporting, financial insights, and service performance monitoring. As future Legal Aid services are developed, this foundation provides a bridge between legacy and modern platforms, ensuring continuity and reliability.

## Tools & Technologies

We used the MoJ Analytical Platform to build scalable pipelines and data models. Key technologies included dimensional modelling, Reverse ETL, cloud storage, and secure query tooling.

## Partners

This work was delivered in collaboration with the LAA Digital and Data Management team, MoJ Statistics and Finance teams, and operational leads within the Legal Aid Agency.
