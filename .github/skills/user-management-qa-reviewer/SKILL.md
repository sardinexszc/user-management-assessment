---
name: user-management-qa-reviewer
description: 'Test and review the completed User Management Assessment for functional correctness, maintainability, accessibility, responsiveness, and submission readiness. Use after implementation and before committing or submitting the project. Triggers: final review, QA pass, pre-submission check, test the app, verify functionality, submission readiness, regression check, full audit.'
argument-hint: 'Ask for a full pass, or name a specific area (e.g., CRUD, import/export, accessibility) to test'
---

# User Management QA Reviewer

Performs the final functional test pass and code/documentation review of the User Management Assessment before it's committed or submitted. Runs after implementation, not during it.

## Constraint

Never report a check as "passed" unless it was actually performed (by reading the code path and reasoning through it, or by exercising it if tooling allows). If a check couldn't be performed, say so explicitly — do not guess or assume.

## Functional Test Checklist

- Initial demo-data loading (first run, empty/missing localStorage)
- Persistence after refresh
- Adding users (valid case)
- Required-field validation (blank fields rejected)
- Email format validation
- Duplicate username and email handling (both directions: add and edit)
- Editing users
- Enabling and disabling users (status + `enabledDate` behavior)
- Deleting users
- Search across all supported fields
- Combined filters (multiple criteria at once)
- Clearing filters
- Ascending and descending sorting per column
- Pagination boundaries (first page, last page, single result, exact page-size multiples)
- Changing rows per page
- Empty search/filter results (empty state shown)
- JSON import (valid data)
- JSON export
- CSV export
- Invalid and duplicate imported data handling
- Demo-data reset
- Mobile navigation (off-canvas sidebar)
- Keyboard navigation (tab order, activation without a mouse)
- Modal focus behavior (focus trap + restore on close)
- Browser-console errors (none present)

## Code & Documentation Review Checklist

- HTML semantics (landmarks, heading order, correct elements)
- CSS organization (no scattered duplicate rules, consistent with design tokens)
- JavaScript separation of responsibilities (storage/validation/query/render/events not tangled)
- Unsafe DOM operations (any raw `innerHTML` with unescaped user content)
- Unused code (dead functions, unused CSS classes, leftover console.log/debug code)
- Broken controls (buttons/links that do nothing or throw)
- Inconsistent content (terminology drift, mismatched labels/microcopy)
- Accessibility failures (see `dashboard-accessibility-reviewer` for the detailed checklist — apply it here rather than re-deriving it)
- Responsive-layout problems at 375×667, 430×932, 768×1024, 1366×768, 1920×1080
- README accuracy (matches actual features, setup steps work as written)

## Procedure

1. Confirm scope: full pass or a named subset.
2. Read the actual code for each item in scope — trace the logic path rather than assuming behavior from naming.
3. For functional items, reason through (or exercise, if a browser/test tool is available) the exact user steps and note the observed/expected result.
4. For each failure, record: severity, reproduction steps, and a recommended correction.
5. Compile the Output Format below. Do not omit a checklist item — mark it explicitly as passed, failed, or not verified.

## Severity Levels

- **Critical**: breaks core functionality or data integrity (e.g., data loss, CRUD failure, console-crashing error).
- **Major**: feature works incorrectly or inconsistently (e.g., wrong sort order, filter not combining correctly).
- **Minor**: cosmetic, inconsistent copy, or best-practice gap that doesn't block use.

## Output Format

1. **Passed checks** — list of items verified working
2. **Failed checks** — list of items with problems
3. **Severity** of each failed item
4. **Reproduction steps** for each failed item
5. **Recommended correction** for each failed item
6. **Final submission-readiness verdict** — Ready / Not ready, with the specific blockers if not ready
