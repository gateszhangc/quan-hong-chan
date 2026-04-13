# Quan Hong Chan Argo CD Deployment

This directory contains a minimal Argo CD / Kubernetes deployment skeleton for the `quan-hong-chan.lol` site.

## Mapping

- GitHub repository: `gateszhangc/quan-hong-chan`
- Git branch: `main`
- Image repository: `ghcr.io/gateszhangc/quan-hong-chan`
- K8s manifest path: `ops/k8s/quan-hong-chan/overlays/prod`
- Argo CD application: `quan-hong-chan`
- Primary domain: `quan-hong-chan.lol`

## Notes

- Push to `main` to trigger the GitHub Actions release workflow and publish the container image to GHCR.
- Argo CD watches the same repository and syncs from [`ops/k8s/quan-hong-chan/overlays/prod`](./overlays/prod/kustomization.yaml).
- If the app should serve `www.quan-hong-chan.lol`, keep the ingress host list and let Next handle the `www -> apex` redirect.
