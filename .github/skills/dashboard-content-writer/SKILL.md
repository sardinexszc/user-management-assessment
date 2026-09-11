---
name: dashboard-content-writer
description: 'Write concise, consistent, user-friendly UI text for administrative dashboards: headings, field labels, buttons, instructions, validation/error messages, confirmation dialogs, empty states, toast notifications, and documentation. Use for all User Management Assessment microcopy. Triggers: button label, validation message, error message, confirmation dialog text, empty state copy, toast message, README wording, UI copy review, microcopy.'
argument-hint: 'Describe the UI element or flow that needs copy (e.g., button, error message, empty state, confirmation dialog)'
---

# Dashboard Content Writer

Writes and reviews UI copy for the User Management Assessment dashboard so all text is clear, consistent, and appropriate for nontechnical users.

## Constraints

- Use clear, professional, plain language — no marketing language, filler, or technical jargon.
- Do not invent unsupported company information, features, or functionality; only describe what the app actually does.
- Keep terminology consistent across the app: `User Group`, `User Type`, `Status`, `Division`, and `Region` are distinct fields — never use them interchangeably.
- Ensure every message is understandable to a nontechnical user.

## When to Use

- Writing or reviewing headings, labels, button text, tooltips, or instructions.
- Writing validation/error messages tied to a specific field or rule.
- Writing confirmation dialogs for destructive or state-changing actions (delete, disable).
- Writing empty states, toast notifications, or README/documentation copy.

## Style Rules

- **Buttons**: action-oriented, verb-first, short. E.g., "Add user", "Save changes", "Delete user", "Export CSV".
- **Validation/error messages**: specific about what's wrong and which field, not generic. E.g., "This email address is already assigned to another user." not "Invalid input."
- **Destructive/state-changing confirmations**: name the record, state the consequence plainly, and avoid vague warnings. E.g., "Disable Maria Santos? She will remain in the directory but will no longer be active."
- **Empty states**: explain why the list is empty and what to do next. E.g., "No users match the selected filters." (plus a way to clear filters if applicable)
- **Toasts**: short, one line, state what happened. E.g., "User added.", "Changes saved.", "User deleted."
- **Counts/pagination**: plain and exact. E.g., "Showing 1–10 of 24 users".
- Avoid ambiguous verbs ("process", "handle") — say exactly what happens ("delete", "disable", "save").

## Procedure

1. Identify the exact UI element/flow needing copy and its context (what triggers it, what field/record it refers to).
2. Draft copy following the Style Rules above; prefer the shortest phrasing that stays clear.
3. Check terminology against the data model (`User Group`, `User Type`, `Status`, `Division`, `Region`) for consistency with existing copy elsewhere in the app.
4. If reviewing existing copy, flag: jargon, vague error messages, missing destructive-action context, inconsistent terminology, or filler phrasing.
5. Present the copy (or copy changes) for approval before it's wired into markup, matching existing strings elsewhere in the file for tone consistency.

## Reference Examples

- "Add user" / "Save changes" / "Delete user" / "Export CSV"
- "No users match the selected filters."
- "This email address is already assigned to another user."
- "Disable Maria Santos? She will remain in the directory but will no longer be active."
- "Showing 1–10 of 24 users"
