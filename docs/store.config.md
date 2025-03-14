# Store config JSON file

- [Store config JSON file](#store-config-json-file)
  - [EPIC Level breakdown](#epic-level-breakdown)
  - [Related Stories/Tasks](#related-storiestasks)
  - [Overview](#overview)
  - [Solution Design Overview](#solution-design-overview)
  - [Background](#background)
  - [Feasibility Assessment](#feasibility-assessment)
  - [Assumptions](#assumptions)
  - [Dependencies](#dependencies)
  - [Implementation Details](#implementation-details)
  - [Serviceability and Issue Reporting](#serviceability-and-issue-reporting)
    - [Customer Awareness](#customer-awareness)
    - [Problem Determination (PD)](#problem-determination-pd)
  - [Caching Requirement](#caching-requirement)
  - [Security Considerations](#security-considerations)
  - [API Endpoints](#api-endpoints)
  - [Migration](#migration)
  - [Deployment Considerations](#deployment-considerations)
  - [Container Design Best Practices Checklist](#container-design-best-practices-checklist)
  - [Documentation](#documentation)
  - [Performance \& Scalability](#performance--scalability)
  - [Milestone](#milestone)
  - [Functional Milestone #1](#functional-milestone-1)
  - [Performance Milestone](#performance-milestone)

## EPIC Level breakdown

N/A

## Related Stories/Tasks

N/A

## Overview

From time to time, there are needs from customer requires to load and use configurations or properties during server starting up. Store config JSON file provides a convenient way to load and use NextJs store custom configurations and properties.

## Solution Design Overview

The specified store configuration file is loaded into Node.js runtime during server startup. And it is than made available at client side(browser) as part of `Settings`.

## Background

TBD

## Feasibility Assessment

N/A

## Assumptions

See [Solution Design Overview](#solution-design-overview) section

## Dependencies

N/A: only existing APIs were consumed and new UI functions (only) implemented.

## Implementation Details

The key logic for loading the store configuration file is located in the folder `integration/data/core/storeConfig`.

There are several ways to access a specific configuration or property from the store configuration file:

- Utilize the functions `getStoreConfig` or `getStoreConfigValue` from the file `integration/data/core/storeConfig/getStoreConfig.ts`.
- In the UI React component, such as `presentation/components/core/blocks/EnablementStoreConfig`. When expecting a configuration or property of type `EnablementStoreConfig`, you can use the `ConfigIfEnabled` and `ConfigIfDisabled` components to wrap child components. If the condition is satisfied, the child components will be rendered.
- The utility functions and UI components are highly customizable based on the type/format of the configuration or property JSON.

## Serviceability and Issue Reporting

N/A

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

## Migration

N/A

## Deployment Considerations

A environment variable `STORE_CONFIG_FILE` is introduced in case a custom location of store configuration need to be specified. The default value is `store.config.json5`.

## Container Design Best Practices Checklist

N/A

## Documentation

N/A

## Performance & Scalability

N/A, no new API added into execution.

## Milestone

N/A

## Functional Milestone #1

N/A

## Performance Milestone

See [Performance & Scalability](#performance--scalability) section.
