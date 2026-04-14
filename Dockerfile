FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json source.config.ts ./
RUN npm ci --legacy-peer-deps

FROM base AS builder
WORKDIR /app
ARG AUTH_DISABLED=true
ARG AUTH_URL=https://huo-er-mu-ci-hai-xia.homes/api/auth
ARG NEXTAUTH_URL=https://huo-er-mu-ci-hai-xia.homes/api/auth
ARG NEXT_PUBLIC_WEB_URL=https://huo-er-mu-ci-hai-xia.homes
ARG NEXT_PUBLIC_SITE_URL=https://huo-er-mu-ci-hai-xia.homes
ARG NEXT_PUBLIC_PROJECT_NAME=huo-er-mu-ci-hai-xia
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
ARG NEXT_PUBLIC_CLARITY_PROJECT_ID=
ARG NEXT_PUBLIC_AUTH_DISABLED=true
ARG NEXT_PUBLIC_AUTH_GOOGLE_ENABLED=false
ARG NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED=false
ARG NEXT_PUBLIC_AUTH_GITHUB_ENABLED=false
ARG NEXT_PUBLIC_LOCALE_DETECTION=false
ENV AUTH_DISABLED=$AUTH_DISABLED
ENV AUTH_URL=$AUTH_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXT_PUBLIC_WEB_URL=$NEXT_PUBLIC_WEB_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_PROJECT_NAME=$NEXT_PUBLIC_PROJECT_NAME
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=$NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
ENV NEXT_PUBLIC_CLARITY_PROJECT_ID=$NEXT_PUBLIC_CLARITY_PROJECT_ID
ENV NEXT_PUBLIC_AUTH_DISABLED=$NEXT_PUBLIC_AUTH_DISABLED
ENV NEXT_PUBLIC_AUTH_GOOGLE_ENABLED=$NEXT_PUBLIC_AUTH_GOOGLE_ENABLED
ENV NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED=$NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED
ENV NEXT_PUBLIC_AUTH_GITHUB_ENABLED=$NEXT_PUBLIC_AUTH_GITHUB_ENABLED
ENV NEXT_PUBLIC_LOCALE_DETECTION=$NEXT_PUBLIC_LOCALE_DETECTION
ENV NODE_OPTIONS=--max-old-space-size=4096
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p .next/build && \
    chown nextjs:nodejs .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/build/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/build/static ./.next/build/static

USER nextjs

EXPOSE 3000

ENV NODE_ENV production

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
CMD ["node", "server.js"]
