---
eleventyNavigation:
  parent: Case Studies
  title: Synergy Programme Data Integration
title: "Synergy Programme Data Integration"
description: "Enabling shared data infrastructure for HR, Finance, and Commercial systems across departments."
tags: [synergy, data-integration, shared-services, HR, finance, commercial]
date: 2025-05-22
layout: sub-navigation
---

## Overview

The Synergy Programme supports the delivery of shared services across government by integrating new HR, Finance, and Commercial systems for departments including MoJ, DWP, DEFRA, and the Home Office. As part of this programme, the Data and Analytics Engineering team enabled core data pipelines to support reconciliation, reporting, and transformation.

## Challenge

Departments involved in the Synergy Programme operate complex legacy systems with varied data formats and logic. Integrating these into a new shared services model required a consistent, scalable data layer capable of handling ingestion, transformation, and feedback loops between systems.

There was also a need to support both business-as-usual reporting and future automation across departmental boundaries, which meant ensuring data was clean, reconciled, and ready for operational and analytical use.

## Solution

We built new ingestion pipelines to bring data from legacy systems into the MoJ’s Analytical Platform. We supported reconciliation efforts by enabling analysts to compare outputs from old and new systems, reducing errors and building trust in the transition.

As new systems go live, we are developing production-grade pipelines for HR, Finance, and Commercial data, applying consistent logic and validation. We also implemented Reverse ETL pipelines to write transformed data back to the new Oracle Cloud Fusion environment, ensuring accurate updates across systems.

## Impact

This work supports the creation of a unified, high-quality data infrastructure for shared services. It improves the ability to reconcile and audit data during migration, reduces duplication, and enables the delivery of standardised, scalable reporting.

Over time, the integrated model is expected to deliver significant efficiency savings across all participating departments, while also supporting long-term digital transformation.

## Tools & Technologies

We used secure ingestion pipelines, cloud-based transformation layers, and Reverse ETL tools to ensure seamless data movement between legacy systems, analytical platforms, and Oracle Cloud Fusion.

## Partners

This project is being delivered in collaboration with the Synergy Programme team, MoJ HR, Finance and Commercial stakeholders, and counterparts from DWP, DEFRA, and the Home Office.
