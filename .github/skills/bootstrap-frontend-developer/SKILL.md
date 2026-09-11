---
name: bootstrap-frontend-developer
description: 'Implement or refactor accessible, responsive front-end interfaces using semantic HTML5, CSS3, Bootstrap 5, and vanilla JavaScript. Use for building/editing the User Management Assessment interface: navigation bars, responsive sidebars, forms, filters, tables, pagination, dropdowns, modals, badges, toasts, and wiring controls to vanilla JS. Triggers: implement HTML/CSS, Bootstrap component, vanilla JS behavior, front-end refactor, responsive markup, form/table/modal implementation, no-framework build.'
argument-hint: 'Describe the component/page/behavior to build or refactor'
---

# Bootstrap Frontend Developer

Implements and refactors front-end code for the User Management Assessment interface using semantic HTML5, CSS3, Bootstrap 5, and vanilla JavaScript.

## Constraints

- Use only HTML5, CSS3, Bootstrap 5, vanilla JavaScript, and Bootstrap Icons.
- DO NOT use React, Vue, Angular, TypeScript, Tailwind, jQuery, or any unnecessary dependency.
- The project must stay runnable by opening `index.html` directly or via a simple local static server — no build step required.
- No inline styles (`style="..."`) and no inline event handlers (`onclick="..."`); attach behavior from JS via `addEventListener`.
- Add custom CSS only when Bootstrap utilities/components genuinely can't achieve the result.

## Preferred Structure

```
index.html
css/styles.css
js/app.js
README.md
```
Split JS into additional files/functions only when it improves clarity — keep responsibilities in clear, separate functions (state, rendering, validation, events, etc.), not one monolithic script.

## When to Use

- Building new semantic markup for a page/section (nav bar, sidebar, table, forms, modals).
- Wiring Bootstrap components (dropdowns, modals, toasts, badges, pagination) to vanilla JS behavior.
- Refactoring existing markup/JS for clarity, to remove unused code, or to fix layout bugs (shifting, overflow, overlap, clipping).

## Procedure

1. **Inspect existing files first** — read the current `index.html`, `css/styles.css`, `js/app.js`, and related files before proposing changes.
2. **Present an implementation plan**: what markup/components/JS will be added or changed, and why.
3. **List the exact files to modify.**
4. **Wait for explicit approval** before editing.
5. Implement using semantic elements (`<nav>`, `<header>`, `<main>`, `<table>`, `<form>`, proper `<label>`s), Bootstrap 5 grid/utilities/components, and vanilla JS event listeners.
6. Verify no layout shift, overflow, overlap, or clipped controls at common breakpoints.
7. Remove any dead code, unused CSS classes, or leftover dependencies introduced during the change.
8. Confirm the browser console is free of errors before considering the change complete.

## Quality Checklist (self-check before finishing)

- Semantic HTML used throughout; no inline styles or inline event handlers
- Bootstrap utilities used sensibly — markup isn't cluttered with redundant utility classes
- Custom CSS is added only where Bootstrap falls short, and lives in `css/styles.css`
- JS responsibilities are separated into named functions, not anonymous inline blobs
- No unused code, dead markup, or unnecessary dependencies remain
- No console errors or warnings
- Works by opening `index.html` directly (no bundler/build step required)
