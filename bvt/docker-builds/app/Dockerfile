# Licensed Materials - Property of HCL Technologies Limited.
# (C) Copyright HCL Technologies Limited  2023.

# Install dependencies only when needed
# HCL Internal build, the image name to be replaced by internal base image
FROM commerce/nextjs-store-app:9.1.17.0 AS deps
USER root
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .yarnrc.yml ./
COPY .yarn .yarn

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
# HCL Internal build, the image name to be replaced by internal base image
FROM commerce/nextjs-store-app:25.03.19.0 AS builder
USER root
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
# HCL Internal build, the image name to be replaced by internal base image
FROM commerce/nextjs-store-app:25.03.19.0 AS runner
WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder --chown=comuser:root /app/public ./public

# TODO: Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing

COPY --from=builder --chown=comuser:root /app/.next/ ./.next
COPY --from=builder --chown=comuser:root /app/dist ./
COPY --from=builder --chown=comuser:root /app/.env* ./
COPY --from=builder --chown=comuser:root /app/store.config.json5 ./
COPY --from=builder --chown=comuser:root /app/configs ./configs
COPY --from=builder --chown=comuser:root /app/next.config.mjs ./
COPY --from=builder --chown=comuser:root /app/node_modules ./node_modules

COPY --from=builder --chown=comuser:root /app/bvt/docker-builds/app/SETUP /SETUP

USER comuser

EXPOSE 3343

ENV PORT 3343
ENV NODE_ENV production

ENV RUBY_KEY_PEM '/SETUP/certs/key.pem'
ENV RUBY_CERT_PEM '/SETUP/certs/cert.pem'
ENV NODE_EXTRA_CA_CERTS '/SETUP/certs/ca.pem'

ENTRYPOINT [ "/SETUP/bin/entrypoint.sh" ]
