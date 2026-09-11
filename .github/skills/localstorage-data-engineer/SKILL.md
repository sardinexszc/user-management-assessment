---
name: localstorage-data-engineer
description: 'Implement the client-side data/service layer for apps that intentionally have no server, API, or database — using localStorage as the persistence layer and plain JS functions as the service layer. Use for the User Management Assessment CRUD, validation, persistence, import/export, filtering, sorting, and pagination. Triggers: localStorage persistence, CRUD implementation, data validation, JSON import/export, CSV export, search/filter/sort logic, pagination logic, seed data, unique ID generation, duplicate detection.'
argument-hint: 'Describe the data operation to implement (e.g., add/edit/delete, import, export, search, pagination)'
---

# LocalStorage Data Engineer

Implements the client-side data and service layer for the User Management Assessment app: `localStorage` as the persistence layer, plain JavaScript functions as the service layer.

## Boundary (hard constraint)

- No real backend or database. Do not introduce Node.js, Express, PHP, Firebase, Supabase, or any remote service.
- `localStorage` is the only persistence mechanism. All "server-like" behavior (querying, validating, transforming) happens in JS functions operating on data already in memory/localStorage.

## User Data Model

`id, firstName, lastName, username, email, userGroup, division, region, userType, status, submittedDate, enabledDate`

## Responsibilities

### Storage
- Seed at least 10 realistic user records on first load.
- Use a **versioned** localStorage key (e.g., `userMgmt.users.v1`) so future schema changes can migrate safely.
- Implement load, parse, validate, save, reset (back to seed data), and migrate operations.
- Recover safely from missing or malformed stored data — never let a corrupt value crash the app; fall back to seed data and surface it.

### CRUD
- Create, read, update, delete, enable, and disable operations, each persisting immediately after a successful change.
- Generate unique IDs for new records (e.g., timestamp+random or incrementing max+1 — pick one and apply consistently).
- Enforce unique `username` and `email` (case-insensitive comparison) at create/update time.
- Trim and normalize all input before validation and storage.
- Validate required fields non-blank and `email` format before saving.
- Store dates in one consistent format (e.g., ISO `YYYY-MM-DD`) everywhere.
- Set `enabledDate` when a user transitions to an active/enabled status; leave it unset otherwise.

### Query Operations
- Case-insensitive search across supported fields.
- Support combined filters (multiple criteria applied together, e.g., status + division + search text).
- Implement stable sorting (equal-key items keep relative order) for each sortable column, ascending/descending.
- Recompute pagination correctly after every data change (add/delete/filter/sort) — never leave a stale page index pointing past the end of the result set.

### Import / Export
- Validate imported JSON structurally and per-field before saving anything; reject/report invalid records instead of silently dropping or crashing.
- Handle duplicate imported records predictably (e.g., skip duplicates by username/email and report the count, or clearly defined merge rule — pick one and document it).
- Export filtered/current result set as JSON and as CSV.
- **Prevent CSV formula injection**: escape/prefix any cell value starting with `=`, `+`, `-`, `@`, tab, or CR with a safe leading character (e.g., a leading `'` or space) before writing to CSV.
- Render any user-provided content safely — never via unsafe `innerHTML`; use `textContent`/DOM APIs or escape HTML entities first.

## Architecture

Keep these concerns in separate functions/modules, not intermixed:
- **Storage** (load/save/reset/migrate localStorage)
- **Validation** (field rules, uniqueness checks)
- **Query operations** (search, filter, sort, paginate — pure functions over an array of users)
- **Rendering** (turning data into DOM, no business logic)
- **UI event handling** (wiring DOM events to the above, no direct localStorage access)

## Procedure

1. Identify which responsibility area the task falls under (storage, CRUD, query, import/export).
2. Check existing code for the relevant function(s) before adding new ones — reuse over duplication.
3. Implement with validation and safe-fallback behavior built in from the start, not bolted on after.
4. Confirm the change keeps storage/validation/query/render/event-handling separated per the Architecture section.
5. Self-test the specific behavior (e.g., add a duplicate email and confirm it's rejected; corrupt localStorage and confirm safe recovery; export with a value starting with `=` and confirm it's neutralized).

## Quality Checklist

- Unique ID generation never collides with existing records
- Username/email uniqueness enforced case-insensitively
- Malformed/missing localStorage data never throws unhandled errors
- Pagination stays in bounds after every mutation
- CSV export neutralizes formula-injection-prone values
- No unsafe `innerHTML` used for user-provided content
- Imported records are validated before persisting; duplicates handled per the documented rule
