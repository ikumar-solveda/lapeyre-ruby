# HCL Commerce Next.Js Store

## Setup

1. This project requires **Node.js** and `yarn` to be installed before-hand on a windows or unix-like platform.
1. In a terminal enter `yarn install` if not previously done
1. Copy the `.env.local.example` contents to `.env.local` and configure with your settings.
1. Copy the `certs/cert.pem.sample` and `certs/key.pem.sample` to `certs/cert.pem` and `certs/key.pem`

**Supported NodeJs and Yarn version**

- Node.js LTS 16 and 18, prefer 18
- Yarn 3.3.0

## Starting Development Environment

First, **if using mock data:** (skip this step if not using mock)

- make sure you have this line: `USE_Mock=true` in the `.env.local` file.

- then:

```bash
yarn mock
```

Second, start the development server:

```bash
yarn dev
```

Open [https://localhost:3343](https://localhost:3343) with your browser to see the result.

## Storybook

Start storybook:

```bash
yarn storybook
```

## IDE Setup Recommendation

VS Code with the following plugins:

- ESLint
- Prettier
- Code Spell Checker
- GitLens

## Documentation

- [Overall Design](./docs/overall-design.md)
- [Core Concepts and Implementation](./docs/concepts.md)
- [Project Structure](./docs/structure.md)
- [Content Components](./docs/content-components.md)
- [Component Styling](./docs/component-styling.md)
- [Localization](./docs/localization.md)
- [Static Route Setup](./docs/static-routes.md)
- [Extending Supported APIs](./docs/extending-api.md)
- [Session and Cookie Handling](./docs/cookie-session.md)
- [Customer Service Hub Interaction](./docs/customer-service-interaction.md)
- [Event Tracking](./docs/event-tracking.md)
- [Preview Overlay Interaction with Management Center](./docs/preview-info.md)
- [Store Path Token Handling](./docs/store-token.md)
- [Layout Usage](./docs/layout-usage.md)
- [Customization](./docs/customization.md)
- [Deployment](./docs/deployment.md)
