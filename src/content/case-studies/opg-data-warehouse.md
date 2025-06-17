---
eleventyNavigation:
  parent: Case Studies
  title: OPG Data Warehouse
title: "OPG Data Warehouse"
description: "Creating a centralised data warehouse for OPG to improve consistency, access, and decision-making."
tags: [OPG, data-warehouse, reporting, integration]
date: 2025-05-22
layout: sub-navigation
---

## Overview

The Office of the Public Guardian (OPG) developed a centralised data warehouse to bring together scattered data sources and embed consistent logic into reporting and performance monitoring. This work is helping OPG improve efficiency, transparency, and insight generation.

## Challenge

OPG’s data was distributed across different systems, formats, and teams, with no consistent framework for combining or reusing data. Analysts had to interpret and apply business logic individually, often duplicating work or arriving at slightly different outputs. There was no single, trusted data source to support both local and central MoJ reporting.

## Solution

We reviewed a wide range of existing reporting logic written in R, Python, and SQL, and collaborated with OPG analysts and business stakeholders to agree on common definitions. This was then implemented in a conformed data model that underpins the OPG Data Warehouse. The warehouse allows different teams to pull consistent outputs from a shared source, with clear governance around updates and structure.

The warehouse supports outputs such as National Statistics, the Lasting Power of Attorney (LPA) Dashboard, and key performance indicators (KPIs). It also provides greater flexibility for integrating new data sources, including those from the modernised LPA system.

## Impact

The project significantly improved the consistency and frequency of reporting. Analysts can now produce insights more efficiently, using shared business logic with clearer provenance. OPG teams have greater confidence in their data, and MoJ central functions receive standardised outputs that align with other corporate reporting.

The warehouse also improves auditability and transparency, supporting better decision-making at all levels.

## Tools & Technologies

We used a conformed dimensional modelling approach and built the warehouse using secure, cloud-based data pipelines. Data is accessible in both raw and transformed formats and is structured to support multiple tools and reporting formats.

## Partners

This project was delivered by the MoJ Data Engineering team in collaboration with OPG Data Science, the LPA Dashboard team, and operational colleagues across the Office of the Public Guardian.
