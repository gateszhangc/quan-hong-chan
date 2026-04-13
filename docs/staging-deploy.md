# EasyClaw Staging Deploy

GitHub repository -> branch -> Dokploy project:
`https://github.com/gateszhangc/easyclaw-v3.git` -> `staging` -> Dokploy project `EVRfCAcd8f8R36NXa8sfs`

Dokploy target:
- Environment: `production` (shared project environment, isolated staging application)
- Application: `easyclaw-staging`
- Domain: `https://staging.easyclaw.pro`

Backend target:
- Host: `144.91.64.239`
- Port: `5000`
- Remote directory: `/opt/easyclaw-backend-staging`

Rules:
- Do not modify database schema for staging.
- Treat Dokploy `easyclaw-staging` as the source of truth for staging defaults. If the repo and Dokploy drift, check `application.one` first and then update the repo.
- Reuse the production Dokploy env as the source of truth, then override:
  - `NEXT_PUBLIC_WEB_URL=https://staging.easyclaw.pro`
  - `AUTH_URL=https://staging.easyclaw.pro/api/auth`
  - `NEXTAUTH_URL=https://staging.easyclaw.pro/api/auth`
  - `BACKEND_BASE_URL=http://144.91.64.239:5000`
  - `NEXT_PUBLIC_API_URL=http://144.91.64.239:5000`
- Keep secrets only in Dokploy. This document records non-secret staging defaults.
- Keep production Web and production Dokploy application untouched.
- K8s kubeconfig is passed to the backend through env and written into the remote `.env`; do not depend on `/root/.kube/config` existing on the staging host.
- EasyClaw 数据库 TLS 语义按运行时区分，不按 Web 默认值复用：
  - Web / Next.js: `sslmode=require`
  - Backend / Node pg: `sslmode=no-verify`
- 首页短模型 provider 路由受 `OPENCLAW_HOMEPAGE_PROVIDER_MODE` 控制：
  - 默认 `mixed`
  - 可选 `openrouter`
  - 只影响 `gpt-5-4`、`claude-opus-4-6`、`gemini-3-pro` 这类首页短模型别名，不影响显式 `openrouter/...` 或 `kie-...` 模型

## Local checks

Run before publishing:

```bash
npm run build
npm run test:runtime
npm run test:e2e
npm --prefix backend run build
```

## Staging branch

Publish the current local snapshot to the dedicated branch:

```bash
git checkout -B staging
git push -u origin staging
```

## Backend staging deploy

Deploy the backend to `144.91.64.239:5000`:

```bash
export DATABASE_URL='<production database url>'
export ENCRYPTION_KEY='<production encryption key>'
export OPENCLAW_K8S_KUBECONFIG_B64='<base64 kubeconfig>'
export OPENCLAW_HOMEPAGE_PROVIDER_MODE='mixed'
scripts/staging/deploy-backend.sh
```

Optional local fallback when you do not want to prepare the base64 value manually:

```bash
export OPENCLAW_K8S_KUBECONFIG="$HOME/.kube/config"
scripts/staging/deploy-backend.sh
```

Expected health check:

```bash
curl -fsSL http://144.91.64.239:5000/health
```

Health 返回正常后，继续做 backend 数据库探针；`/health` 不是 deploy 可用性的充分条件：

```bash
ssh root@144.91.64.239 \
  "docker exec easyclaw-backend-staging-api-1 node --input-type=module -e 'import pg from \"pg\"; const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL }); const result = await pool.query(\"select 1 as ok\"); console.log(result.rows[0]); await pool.end();'"
```

运行时 env 也要核对为 backend 语义：

```bash
ssh root@144.91.64.239 \
  "docker exec easyclaw-backend-staging-api-1 /bin/sh -lc 'printenv DATABASE_URL'"
```

如果看到 `/api/deploy` 返回 `{"code":-1,"message":"self-signed certificate"}`，优先检查 staging backend 的 `DATABASE_URL` 是否误用了 Web 的 `sslmode=require`。

## Dokploy staging deploy

Create or update the isolated Dokploy staging application and trigger a deploy:

```bash
export DOKPLOY_API_KEY='<dokploy api key>'
scripts/staging/prepare-dokploy-staging.sh
```

## Browser smoke

Real deploy smoke:

```bash
TEST_BASE_URL=https://staging.easyclaw.pro \
REAL_DEPLOY_TELEGRAM_TOKEN='<telegram token>' \
npx tsx scripts/browser-debug/test-real-deploy.ts
```

Duplicate deploy guard smoke:

```bash
TEST_BASE_URL=https://staging.easyclaw.pro \
REAL_DEPLOY_TELEGRAM_TOKEN='<telegram token>' \
npx tsx scripts/browser-debug/test-staging-deploy-dedup.ts
```
