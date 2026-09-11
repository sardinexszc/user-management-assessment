---
name: dashboard-accessibility-reviewer
description: 'Review and improve administrative dashboard interfaces for accessibility, keyboard operability, and responsive behavior across breakpoints. Use during UI implementation and final QA of the User Management Assessment. Triggers: accessibility review, a11y audit, keyboard navigation check, ARIA review, focus management, color contrast check, responsive/breakpoint testing, screen reader support.'
argument-hint: 'Specify the page/component to review, or ask for a full accessibility + responsive audit'
---

# Dashboard Accessibility Reviewer

Reviews and improves the User Management Assessment interface for accessibility, keyboard use, and responsive behavior. Use mid-implementation to catch issues early, and again as a final QA pass.

## Accessibility Checklist

- Semantic landmarks (`<header>`, `<nav>`, `<main>`, etc.) and a logical heading hierarchy (no skipped levels).
- Every form control has an associated **visible** `<label>` (not placeholder-only).
- Icon-only buttons have an accessible name (`aria-label` or visually-hidden text).
- Full keyboard access to: navigation, sidebar toggle, forms, modals, table row actions, column sorting, pagination controls.
- Visible focus indicators are preserved (never removed via `outline: none` without a replacement).
- Modals trap and manage focus correctly, and restore focus to the triggering element on close.
- Validation errors are programmatically associated with their input (e.g., `aria-describedby`) and announced.
- Status/meaning is conveyed with text and/or icons in addition to color — never color alone.
- Color contrast meets WCAG AA for text and meaningful UI elements.
- Tables have an appropriate caption/accessible name, correct header `scope`, and sortable headers expose sort state (e.g., `aria-sort`).
- Reduced-motion preference (`prefers-reduced-motion`) is respected for any animation/transition.
- No unnecessary ARIA where native HTML semantics already suffice (prefer native elements over ARIA patches).

## Responsive Checklist

Test at: 375×667, 430×932, 768×1024, 1366×768, 1920×1080.

- No overlapping or clipped content at any size.
- Filters and form controls wrap cleanly instead of overflowing or truncating.
- Sidebar behaves correctly at every size (collapsible on desktop, off-canvas on mobile).
- Modals remain fully usable and scrollable on small screens.
- Table content stays accessible — horizontal scroll contained to the table container, not the page.
- Touch targets are large enough (minimum ~44×44px) on mobile/tablet.

## Procedure

1. Identify scope: a specific component/page, or a full audit.
2. Read the relevant HTML/CSS/JS to inspect actual markup and attributes — don't assume from visual appearance alone.
3. Walk through the Accessibility Checklist, then the Responsive Checklist, noting concrete findings (file + line/selector where possible).
4. For each issue, classify severity:
   - **Critical**: blocks keyboard/screen-reader users from completing a task, or breaks layout unusably.
   - **Major**: significant friction or confusion but a workaround exists.
   - **Minor**: cosmetic or best-practice improvement.
5. Provide a specific, actionable fix for each issue (exact markup/attribute/CSS change), not just a description of the problem.
6. If changes are being made (not just reviewed), confirm the fix doesn't regress other checklist items (e.g., adding `aria-label` doesn't remove the visible label).

## Output Format

Report findings grouped by severity (Critical → Major → Minor), each with: location, issue, and the specific fix. End with a short summary of what passed the review.
