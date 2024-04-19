# Free Gift in Cart

- [EPIC Level Breakdown](#epic-level-breakdown)
- [Related Stories/Tasks](#related-stories-tasks)
- [Overview](#overview)
- [Solution Design Overview](#solution-design-overview)
- [Background](#background)
- [Feasibility Assessment](#feasibility-assessment)
- [Assumptions](#assumptions)
- [Dependencies](#dependencies)
- [Implementation Details](#implementation-details)
- [Serviceability and Issue Reporting](#serviceability-and-issue-reporting)
- [Caching Requirement](#caching-requirement)
- [Security Considerations](#security-considerations)
- [API Endpoints](#api-endpoints)
- [Migration](#migration)
- [Deployment Considerations](#deployment-considerations)
- [Container Design Best Practices Checklist](#container-design-best-practices-checklist)
- [Documentation](#documentation)
- [Performance & Scalability](#performance-scalability)
- [Milestone](#milestone)
- [Functional Milestone #1](#functional-milestone-1)
- [Performance Milestone](#performance-milestone)

## EPIC Level breakdown

Work tracked under [HC-37223](https://jira02.hclpnp.com/browse/HC-37223).

## Related Stories/Tasks

N/A

## Overview

See [Solution Design Overview](#solution-design-overview) section

## Solution Design Overview

There are no significant changes to the storefront business logic to support free gift promotions, except for some UI additions.

The necessary changes made to the existing NextJs storefront business logic to support the free gift promotion feature are:

1. Adding order calculation when there is a payment type change to the shopper's current cart.
2. Updating payment instructions immediately after switching between single and multiple payments.

## Background

See [Solution Design Overview](#solution-design-overview) section

## Feasibility Assessment

N/A

## Assumptions

See [Solution Design Overview](#solution-design-overview) section

## Dependencies

N/A: only existing APIs were consumed and new UI function (only) implemented.

## Implementation Details

Set of key files to implement the UI support of free gift promotion:

- `integration/data/core/Content/FreeGiftRewardOption.ts`, the file has React hook that contains majority business logic of free gift implementation.
- `presentation/components/core/content/FreeGift`, the folder contains all free gift related UI components, styling, etc.

On Shopping cart page, if `cart` contains free gift `rewardOptions`,

- a message will display on top of order items table indicates 'free gift' is available.
- a list of available free gift promotions and available gift items can be found right below order items table.
- each item has either a `select` or `remove` gift item button depends on whether the item added to cart already or not.

## Serviceability and Issue Reporting

N/A: retrieval of free gift options is part of user's cart fetch API, which on server-side already has its own diagnostic logging function. The update of free gift options is interactive, i.e., client-side, so any errors encountered there will be tracked through the snackbar/toast error diagnostics and any API errors visible through a browser's network tab.

### Customer Awareness

N/A: see above

### Problem Determination (PD)

N/A: see above

## Caching Requirement

N/A: no impact since only existing APIs were used.

## Security Considerations

N/A: no impact since only existing APIs were used.

## API Endpoints

N/A: no new TS API endpoints were introduced or used

The retrieval of free gifts is through the user's cart API: `/store/${storeId}/cart/@self`

The inclusion of any free gift is through the update reward option API: `/store/${storeId}/cart/@self/update_reward_option`

## Migration

N/A: no impact since UI function is a brand new feature for the Next.JS stores.

## Deployment Considerations

N/A

## Container Design Best Practices Checklist

N/A

## Documentation

Knowledge center will document visibility and availability of free gift promotions in a user's cart.

## Performance & Scalability

SVT and/or LOT test must provide assessment of:

- whether the APIs invoked require re-testing from perspective of performance, i.e., does presence of large data impact the fetch or update of cart APIs
- whether the APIs invoked require re-resting from perspective of scalability, i.e., does the influx of a large number of concurrent users interacting with a website in a way that invokes fetch and update of cart with free gift options impact the response times on a website in such a way that scaling up the number of `nextjs-store` or `txn` containers does not alleviate a potential drop in response times

## Milestone

N/A: no partial work

## Functional Milestone #1

N/A: no partial work

## Performance Milestone

See [Performance & Scalability](#performance--scalability) section.
