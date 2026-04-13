# Hormuz Brief Argo CD Deployment

This directory contains a minimal Argo CD / Kubernetes deployment skeleton for the `huo-er-mu-ci-hai-xia.homes` site.

## Mapping

- GitHub repository: `gateszhangc/hormuz-brief`
- Git branch: `main`
- Image repository: `ghcr.io/gateszhangc/hormuz-brief`
- K8s manifest path: `ops/k8s/hormuz-brief/overlays/prod`
- Argo CD application: `hormuz-brief`
- Primary domain: `huo-er-mu-ci-hai-xia.homes`

## Notes

- Push to `main` to trigger the GitHub Actions release workflow and publish the container image to GHCR.
- Argo CD watches the same repository and syncs from [`ops/k8s/hormuz-brief/overlays/prod`](./overlays/prod/kustomization.yaml).
- If the app should serve `www.huo-er-mu-ci-hai-xia.homes`, keep the ingress host list and let Next handle the `www -> apex` redirect.
