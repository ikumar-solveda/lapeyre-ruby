# Deployment and Build

Deployment is highly customizable and can vary based on business needs.

## OOTB Deployment Idea

The general idea of OOTB deployment can be depicted by the below high-level diagrams, and it probably fits most business needs.

**Figure 1: API request direct to transaction and search servers. Currently used**

![API request direct to transaction and search servers.](images/deployment-high-level.png 'API request direct to transaction and search servers.')

**Figure 2: API requests proxy from Next.Js server (Optional)**

![API request proxy from Next.Js server](images/deployment-high-level-api-route.png 'API request proxy from Next.Js server to transaction and search servers.')

In the above deployment, the static assets, e.g., images, are served from the web server. These can be served from a different location, such as your preferred CDN.

## Deployment Environment Variables

The deployment requires environment variables similar to what we have in `.env.local`. To ensure the proper functioning of the **Next.js** store, the following environment variables need to be set:

**Mandatory environment variables**

1. `SEARCH_ORIGIN`: The Search server origin that can be accessed within the deployment cluster, e.g., `https://www.search.com:30901`.
2. `TRANSACTION_ORIGIN`: The Transaction server origin that can be accessed within the deployment cluster, e.g., `https://www.commerce.com:5443`.
3. `MAP_API_KEY`: A Google Maps API key to be used by the store locator.

**Optional environment variables**

1. `LOG_LEVEL`
2. `LOG_CENSOR_STRING`
3. `TRACE_DETAILS`

All of the above are serviceability-related environment variables. Refer to [Overall Design](overall-design.md) for more details.

## Build

Please refer to our sample [Dockerfile](../bvt/docker-builds/app/Dockerfile.template) to create your Dockerfile.

To build the Docker image of your customized Commerce Next.js store, run `docker build ${PATH} -f ${PATH/TO/Dockerfile}`. For example, from the project root directory, run `docker build . -f bvt/docker-builds/app/Dockerfile`.

Note: The out-of-the-box (OOTB) Commerce Next.js Store server is a Next.js custom server (not a standard Next.js server) only accessible by HTTPS protocol.
