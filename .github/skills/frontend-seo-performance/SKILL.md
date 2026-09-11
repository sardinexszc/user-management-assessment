---
name: frontend-seo-performance
description: 'Review and improve HTML metadata, loading performance, and technical quality of front-end pages without adding inappropriate marketing SEO. Use for the User Management Assessment page-level metadata (title, description, viewport, favicon), script/style loading behavior, layout shift, and basic Lighthouse-style checks. Triggers: meta tags, page title, meta description, favicon, viewport, render-blocking resources, cumulative layout shift, script defer/async, Lighthouse, page performance review.'
argument-hint: 'Describe what to review or add (e.g., meta tags, script loading, layout shift, favicon)'
---

# Frontend SEO & Performance

Reviews and improves HTML metadata and loading performance for the User Management Assessment — kept lightweight and appropriate for an internal admin dashboard, not a public marketing site.

## Constraints

- This is an administrative dashboard, not a public/marketing page. Do NOT add marketing copy sections, keyword stuffing, structured data (JSON-LD schema.org), Open Graph/social-share tags, or public-indexing optimizations — none of that fits an internal user-management tool.
- Do not add a favicon reference unless a favicon asset actually exists in the repo.
- Do not claim the app is "secure" or "private" merely because it lacks SEO indexing or has a `noindex` tag — those are unrelated concerns. Only state what is actually true (client-side only, no auth, no backend).
- Only recommend `noindex` if the user confirms the dashboard is deployed somewhere crawlable and is meant to stay private/non-public (e.g., a demo deployment) — don't add it by default for a local-only assessment.

## Responsibilities

### Metadata
- Accurate, specific `<title>` (not generic, not keyword-stuffed).
- Concise `<meta name="description">` that accurately describes the app (an internal user-management dashboard demo), not marketing language.
- `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- `<meta name="theme-color">` if it adds real value (matches the app's primary color) — skip if not meaningful.
- Semantic headings (`<h1>` once per page, logical order) and landmark elements — this overlaps with `dashboard-accessibility-reviewer`; don't duplicate work, just verify metadata/heading correctness here.
- Favicon `<link rel="icon">` only if an icon file already exists in the project; otherwise flag it as missing rather than inventing a path.

### Performance
- Avoid render-blocking resources: place `<script>` tags with `defer` (or at end of `<body>`), avoid synchronous third-party scripts in `<head>`.
- Avoid duplicate resource loads (same CSS/JS/CDN library included twice).
- Minimize unnecessary JS/CSS — flag unused Bootstrap components/CSS or dead script files.
- Prevent cumulative layout shift: set explicit dimensions/aspect-ratio for images/icons, avoid late-injected banners that push content, ensure web fonts don't cause visible reflow (use `font-display: swap` or system fonts).
- Optimize icon/font loading: prefer a single icon font/CDN reference (Bootstrap Icons or Font Awesome, not both), avoid loading unused font weights.

## Procedure

1. Read the current `index.html` `<head>` and script-loading structure before proposing changes.
2. Check each Metadata item above; note what's missing, inaccurate, or inappropriate for an internal tool.
3. Check each Performance item; note render-blocking scripts, duplicate includes, unused CSS/JS, and layout-shift risks.
4. Present findings as a short list: what's good, what's missing, what to fix — with the exact tag/line to add or change.
5. Apply changes only after approval, keeping metadata truthful and scoped to what the app actually is.

## Output Format

A short report split into **Metadata** and **Performance**, each with concrete findings and the exact fix (tag or code change) — not vague suggestions.
