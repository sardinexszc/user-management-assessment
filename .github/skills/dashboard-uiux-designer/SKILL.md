---
name: dashboard-uiux-designer
description: 'Design or review the visual/UX design of professional, responsive enterprise dashboards from a reference screenshot, requirements, or existing project styles. Use for the User Management Assessment dashboard: layout, design system (colors/typography/spacing/components), sidebar/table/modal/filter design, responsive behavior, and design-system reviews. Triggers: dashboard design, UI/UX layout, design system, sidebar navigation, table design, modal design, responsive layout, design review, reference image analysis.'
argument-hint: 'Describe the screen/component to design or review, and attach the reference image if available'
---

# Dashboard UI/UX Designer

Designs and reviews the visual/UX design of the User Management Assessment dashboard: a Bootstrap 5 + vanilla JS "User Management – Edit Users" enterprise dashboard.

## Constraints

- Use only HTML5, CSS3, Bootstrap 5, and vanilla JavaScript. No React, Tailwind, or other UI/CSS frameworks.
- Follow the supplied User Management reference image as the source of truth for layout and hierarchy.
- Palette: blue, teal, white, and neutral gray only.
- No repository changes without explicit user approval.
- Avoid: excessive gradients, glassmorphism, heavy animation, oversized headings, generic AI-generated visual clutter, and any control without a real function.

## When to Use

- Creating the initial visual design/layout of the dashboard or a specific screen/component.
- Reviewing existing HTML/CSS against the reference image and design system for consistency.
- Adding a new UI element (e.g., a new modal, filter, or badge type) that must match the existing design language.

## Procedure

1. **Analyze the reference.** If a reference image is available, examine layout, visual hierarchy, spacing rhythm, top nav, sidebar, table structure, filters/toolbar, modals, and control styles. If reviewing existing code instead, read the relevant HTML/CSS files first.
2. **Define or reuse the design system.** Establish (or check consistency against) tokens for:
   - Colors (primary blue, accent teal, neutral grays, white, semantic success/warning/error)
   - Typography scale (headings, body, labels, table text)
   - Spacing scale (margins/padding rhythm)
   - Border radius and shadow scale (restrained, not heavy)
   - Component styles: buttons (primary/secondary/ghost/icon), inputs, badges, table rows/headers, modals, toasts
   - State styles: hover, active, focus, disabled, success, warning, error
3. **Design each layout tier**: desktop (collapsible sidebar), tablet, and mobile (off-canvas nav). Confirm the table remains usable and scroll is contained to the table container, not the page.
4. **Check functional purpose.** Every visible control must map to a real feature — no decorative-only elements.
5. **Present before implementing** (see Required Output below) and wait for approval.

## Required Output Before Implementation

1. Proposed interface description (per screen/component)
2. Design tokens and reusable components list
3. Responsive behavior explanation (desktop/tablet/mobile)
4. Deviations from the reference image, with rationale
5. Approval request — stop and wait

## Review Checklist (when reviewing existing design)

- Matches reference image layout/hierarchy where feasible
- Consistent use of design tokens (no one-off colors/spacing/radii)
- All interactive states present (hover/active/focus/disabled/validation)
- Status/severity communicated with text + icon, not color alone
- No unused or purely decorative elements
- Responsive at 375×667, 430×932, 768×1024, 1366×768, 1920×1080
- No prohibited frameworks or excessive visual effects introduced
