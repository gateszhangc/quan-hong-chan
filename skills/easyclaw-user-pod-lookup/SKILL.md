---
name: easyclaw-user-pod-lookup
description: Query live EasyClaw Kubernetes deployments and pods for a specified user by email. Use when you need to map `easyclaw.users` and `easyclaw.deployments` records to real K8s deployments/pods, distinguish stale `running` rows from live runtimes, and inspect channel type, health, and logs without making production changes.
---

# EasyClaw User Pod Lookup

Use this skill for read-only production investigation. It is for answering:
- Which deployments belong to this user?
- Which of those deployments still exist in Kubernetes?
- Which pod is actually live?
- Is the live runtime Telegram or WhatsApp?
- Is it truly connected, or only marked `running` in the database?

Do not use this skill for:
- `kubectl delete`
- `kubectl scale`
- database writes
- QR relogin or other recovery actions

## Safety Rules

- Read first, mutate never.
- Treat `easyclaw.deployments.status='running'` as a candidate set only, not proof of a live runtime.
- Do not use `public.users` for EasyClaw user lookup. Use `easyclaw.users`.
- Do not paste database credentials, tokens, cookies, or auth files into chat output.

## Workflow

### 1. Resolve the user

Query `easyclaw.users` by email and record:
- numeric `id`
- `uuid`
- `email`

If `easyclaw.users` does not return a row, stop and report that the user could not be resolved.

### 2. Pull deployment candidates

Query `easyclaw.deployments` by `user_id=<uuid>`.

Collect:
- latest deployments by `created_at desc`
- any rows with `status='running'`
- `requested_model`
- `resolved_model`
- `created_at`
- `updated_at`
- `error_message`

Important:
- Database rows may be stale.
- The point of this step is to build deployment-id candidates, not to declare anything live.

### 3. Map deployment ids to Kubernetes

For each candidate deployment id, query namespace `easyclaw-openclaw` by label:

- Deployment: `easyclaw/deployment-id=<deployment_id>`
- Pod: `easyclaw/deployment-id=<deployment_id>`

Split the result into:
- database-only candidates: deployment row exists, but no K8s Deployment/Pod exists
- live candidates: K8s Deployment and/or Pod exists

If nothing exists in Kubernetes, report that the user has no live runtime even if the database still says `running`.

### 4. Inspect each live pod

For every live pod, inspect:
- `/home/node/.openclaw/openclaw.json`
- `openclaw health --json`
- `openclaw channels status --json`
- recent `kubectl logs`

Use these checks to determine:
- channel type: WhatsApp vs Telegram vs other
- whether the runtime is truly `connected`
- whether the pod is looping on auth failures such as `401 Unauthorized` or `session logged out`
- whether multiple live deployments point at the same user/channel identity

Do not rely on Deployment `READY 1/1` alone.

### 5. Summarize the result

Always return the answer in this order:
1. Resolved user identity
2. Deployment-id candidates from the database
3. Which candidates are actually live in Kubernetes
4. For each live pod:
   - deployment id
   - deployment name
   - pod name
   - channel type
   - connected/running state
   - key log finding
5. Final conclusion

## Output Rules

- Use absolute timestamps when they matter.
- Be explicit about stale database state when applicable.
- If there are multiple live pods, call that out directly instead of collapsing them into one answer.
- If a pod is present but the channel is disconnected, say “pod alive, channel unavailable” rather than “running”.

## References

- Command templates and query snippets: `references/command-cheatsheet.md`
