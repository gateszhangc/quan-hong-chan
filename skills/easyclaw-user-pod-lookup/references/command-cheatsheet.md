# Command Cheatsheet

Use the project's configured `DATABASE_URL`. Do not paste raw secrets into chat replies.

## 1. Resolve user by email

```bash
psql "$DATABASE_URL" -c "
select id, uuid, email, nickname, created_at, updated_at
from easyclaw.users
where email ilike '%user@example.com%';
"
```

## 2. Pull deployments for the user uuid

```bash
psql "$DATABASE_URL" -c "
select id, status, requested_model, resolved_model, created_at, updated_at,
       left(coalesce(error_message, ''), 180) as error_message
from easyclaw.deployments
where user_id = 'USER_UUID'
order by created_at desc;
"
```

## 3. Query live Deployment / Pod by label

```bash
kubectl get deployment -n easyclaw-openclaw \
  -l easyclaw/deployment-id=DEPLOYMENT_ID -o wide

kubectl get pod -n easyclaw-openclaw \
  -l easyclaw/deployment-id=DEPLOYMENT_ID -o wide
```

## 4. Read pod config and runtime state

```bash
kubectl exec -n easyclaw-openclaw POD_NAME -- sh -lc \
  'cat /home/node/.openclaw/openclaw.json'

kubectl exec -n easyclaw-openclaw POD_NAME -- sh -lc \
  'env HOME=/home/node openclaw health --json'

kubectl exec -n easyclaw-openclaw POD_NAME -- sh -lc \
  'env HOME=/home/node openclaw channels status --json'
```

## 5. Read recent logs

```bash
kubectl logs -n easyclaw-openclaw POD_NAME --tail=200
```

## 6. Useful patterns to check

- Use `easyclaw.users`, not `public.users`
- Use `easyclaw/deployment-id=<deployment_id>` to map DB rows to K8s
- `status='running'` in the database may still have no live pod
- `READY 1/1` does not prove the channel is connected
- WhatsApp failures often surface as:
  - `WhatsApp session logged out`
  - `401 Unauthorized`
  - `Connection Failure`
- Telegram auth failures often surface as:
  - `deleteWebhook failed`
  - `401: Unauthorized`

## 7. Minimal report shape

```text
User:
- email
- uuid

Database candidates:
- deployment ids in created_at order

Live Kubernetes objects:
- deployment id -> deployment name -> pod name

Pod findings:
- channel type
- connected/running state
- key error or log signal

Conclusion:
- no live pod / one live pod / multiple live pods
- channel healthy vs pod alive but channel unavailable
```
