---
layout: sub-navigation
title: Tech Review
eleventyNavigation:
  key: Tech Review
  parent: How we work
  order: 9
---

## Purpose

A monthly meeting for all data and analytics engineers to present new technical approaches and provide feedback on solutions in an open, inclusive forum.
The goal is to ensure a unified approach to solving data challenges across the team, with outcomes documented in Architecture Decision Records (ADRs) for future reference. 

Items that come to tech review include (but are not limited to):

* Any proposed new data sources and their methods of ingestion
* Looking to use languages outside those as adopt or retain on the tech radar
* Building a new system from the ground up
* Proposing new internally built packages.

## Bringing an item to Tech Review

Once an item has been identified for proposing at Tech Review, the Presenter should contact the Tech Review chair to arrange a slot to present.
The Presenter should also create an RFC (Request for Comments) Github discussion and circulate this on the #data-and-analytics-engineering slack channel at least one week prior to their presentation. 

In the Tech Review presentation, the Presenter will present their proposal via whatever medium best suits (e.g. slide deck, live demo).
Following this, the Chair will invite comments and questions from the audience and comments from the RFC discussion. 

The Tech Review panel will have a follow up meeting for a final discussion on the proposals and provide their recommendation on whether to approve, approve with conditions, or decline the proposals.
These will be added to the RFC. These will be announced on the #data-and-analytics-engineering slack channel no later than one week after the presentation.

For approved proposals, the Presenter then needs to submit an ADR (Architecture Decision Record). 

## When

3-4pm on the 2nd Thursday each month.

## Core audience

* Tech review panel (made of representative from each portfolio).
* Representative from AP / wider digital (TA’s).
* Data and Analysis Engineering Team.

## Tracking

Via the [Tech Review GitHub project board](https://github.com/orgs/moj-analytical-services/projects/220).

### Proposing new items
Raise new RFCs [here](https://github.com/moj-analytical-services/data-and-analytics-engineering-docs/discussions/new?category=rfc).

## Order of Business
1. Intro from Tech Review chair.
  1. Highlight Tech Review Panel outcomes from previous session.
  2. Review any finalised ADRs from previous sessions.
2. Proposal presentations (max 2 to allow discussions).
3. Enquire for any upcoming proposals.
4. AOB.

## Responsibilities

### Chair

* Stays informed about interesting proposals and reaches out to potential presenters.
* Shares the recordings and action points after the presentation.
* Encourages attendance.
* Collaborates with the chairs of the community forum and portfolio leads to agree topics and minimise duplication.
* Coordinate the Tech Review panel to outline any recommendations or required changes before a proposal can be considered agreed and communicate outcomes.
* Ensure ADR is completed.

### Presenter

* Provides the agenda and links to relevant material to chair prior to the meeting. 
* This should include an RFC for comments. 
* Highlights what the proposal is and what advice is sought. 

## Outcomes

* Proposals are either accepted, accepted with conditions or declined.  
    * For accepted proposals a final ADR is submitted by the presenter based on the outcomes of discussions in the tech review. The RFC is closed. 
    * For declined proposals the reasons are documented by the Chair in the RFC before closing.
