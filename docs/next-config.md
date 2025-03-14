# Next.js Configuration

## Overview

This file `next.config.mjs` is the configuration setup for a Next.js application that includes bundle analysis, service worker integration using Serwist, and configurations from base Next.js configuration `./configs/next.config.js`.

## Configuration Structure

The configuration is exported as an async function that accepts a `phase` parameter from Next.js to determine the current execution context.

## Features

### Bundle Analyzer Integration

- Utilizes `@next/bundle-analyzer` for analyzing bundle sizes
- Enabled conditionally based on environment variable
- Configuration:
  ```javascript
  enabled: process.env.ANALYZE === 'true';
  ```

### Phase-Based Configuration

The configuration behaves differently based on the Next.js phase:

#### Development Server and Production Build Phases

When the application is running in either:

- Development server (`PHASE_DEVELOPMENT_SERVER`)
- Production build (`PHASE_PRODUCTION_BUILD`)

The configuration includes:

1. Bundle analyzer integration
2. Serwist (Service Worker) configuration with:
   - Source file: 'service-worker/index.ts'
   - Destination: 'public/sw.js'
3. Base Next.js configuration from `./configs/next.config.js`

#### Other Phases

For all other phases, the configuration includes:

- Bundle analyzer integration
- Base Next.js configuration only

## Base Next.js Configuration

The base configuration includes several important settings:

### Build and Runtime Settings

```javascript
{
    productionBrowserSourceMaps: false,  // Disables source maps in production
    reactStrictMode: true,              // Enables React strict mode
    swcMinify: true,                    // Uses SWC for minification
}
```

### Internationalization (i18n)

Supports multiple locales with the following configuration:

```javascript
{
    i18n: {
        locales: [
            'default',
            'de-de',    // German
            'en-us',    // English (US)
            'es-es',    // Spanish
            'fr-fr',    // French
            'it-it',    // Italian
            'ja-jp',    // Japanese
            'ko-kr',    // Korean
            'pl-pl',    // Polish
            'pt-br',    // Portuguese (Brazil)
            'ro-ro',    // Romanian
            'ru-ru',    // Russian
            'zh-cn',    // Chinese (Simplified)
            'zh-tw'     // Chinese (Traditional)
        ],
        defaultLocale: 'default',
        localeDetection: false          // Disables automatic locale detection
    }
}
```

### Experimental Features

```javascript
{
    experimental: {
        // Client Router Filter Configuration
        clientRouterFilterAllowedRate: 0.0001,  // Sets very low error rate for BloomFilter

        // Middleware Configuration
        middlewarePrefetch: 'strict',  // Strict prefetching behavior for middleware

        // Package Optimization for better tree-shaking of unused code.
        optimizePackageImports: [
            '@types/lodash',
            '@react-google-maps/api'
        ],

        // IEnables instrumentation for monitoring and debugging.
        instrumentationHook: true
    }
}
```

#### Notable Experimental Features

1. **Client Router Filter**: Uses a very low error rate (0.0001) for BloomFilter to address dynamic route matching issues
2. **Middleware Prefetch**: Set to 'strict' to handle app-router redirections without impacting storefront prefetching
3. **Package Import Optimization**: Optimizes imports from specific packages
4. **Instrumentation**: Enables instrumentation hooks

## Usage

### Analyzing Bundles

To enable bundle analysis:

```bash
ANALYZE=true npm run build
```

### Service Worker

The service worker will be:

- Built from `service-worker/index.ts`
- Output to `public/sw.js`
- Automatically integrated during development and production builds

## Dependencies

- `@next/bundle-analyzer`: For bundle size analysis
- `@serwist/next`: For service worker integration

## Important Notes

1. The configuration function is asynchronous to allow dynamic imports
2. Service worker integration only occurs during development and production build phases
3. Bundle analysis is opt-in via environment variable
4. Locale detection is disabled by default
5. React strict mode is enabled
6. Source maps are disabled in production for better performance
