# Claude Code Webflow Astro CMS

Automated CMS pipeline: Webflow → n8n → GitHub Actions → Hostinger (SFTP).

## Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| CMS | Webflow | Content Management |
| Automation | n8n 2.1.1 | Workflow Integration |
| Frontend | Astro | Static Site Generator |
| CI/CD | GitHub Actions | Build & Deploy |
| Hosting | Hostinger | SFTP Deployment |

## Quick Links

- **Astro Site**: https://astro.in一刻.be
- **n8n**: https://n8n.srv1091615.hstgr.cloud
- **GitHub**: https://github.com/S24-MECHTECH/claude-code-webflow-astro-cms
- **Actions**: https://github.com/S24-MECHTECH/claude-code-webflow-astro-cms/actions

## Architecture

```
[Webflow CMS]
    ↓ (Webhook)
[n8n Workflow]
    ↓ (repository_dispatch)
[GitHub Actions]
    ↓ (fetch & transform)
[src/data/]
    ↓ (push)
[Hostinger]
```

## Local Development

```bash
npm install
npm run dev   # http://localhost:4321
npm run build
```
