# User Management Assessment

Front-End Developer Practical Assessment: recreate the **User Management - Edit Users** page as a functional, responsive web page.

## Requirements

- Use HTML, CSS, Bootstrap 5, and JavaScript. PHP is optional.
- Recreate the overall layout and functionality of the provided UI reference.
- Include navigation, a sidebar, search and filters, a users table, actions, and pagination.
- Include at least 10 mock users.
- Make search, filters, pagination, and user actions functional.
- Support desktop, tablet, and mobile layouts.
- No backend or database is required.
- Reasonable UI/UX improvements are allowed.

## Status

Implemented as a static Bootstrap 5 and vanilla JavaScript dashboard. No build step, backend, database, or authentication service is used.

The supplied assessment screenshot contains the instructions, but does not display the actual User Management UI reference. The interface therefore follows the project agent's blue/teal enterprise design direction; it is not a verified reproduction of the missing reference.

## Run locally

Open `index.html` in a modern browser, or serve this folder:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Then visit http://127.0.0.1:4173. Bootstrap 5.3.3 CSS and JavaScript load from jsDelivr and require internet access. A local server is recommended for consistent browser storage behavior.

## Features

- 15 fictional users with account, group, division, region, type, status, and date details.
- Add and edit users with required-field, email, and case-insensitive username/email uniqueness validation.
- Enable, disable, delete, and reset demo data with confirmation.
- Search all record fields, combine group/status/division filters, and clear filters.
- Sort each sortable column in either direction, select 5/10/25 rows, and paginate filtered results.
- Export the complete filtered and sorted result set as JSON or CSV, including all pages. CSV cells are quoted and formula-like values are prefixed with an apostrophe.
- Import a JSON array using the same schema as a JSON export. Every field is required as a string. Imports append records; duplicate IDs, usernames, or emails reject the entire import without changing data. Invalid records also reject the entire import. Limit: 2 MB per file and 10,000 total users.
- Responsive navigation, accessible labeled forms, modal focus management, status messages, and a horizontally scrollable table.

## Data and privacy

Data is stored under the versioned key `userMgmt.users.v1` in browser localStorage. Dates use `YYYY-MM-DD`; inactive users have an empty `enabledDate`, and enabling sets it to the current UTC date. Missing data seeds the demo. Invalid stored data shows a warning and uses demo records in memory until a successful save/reset. Failed writes leave the current directory unchanged and show a warning.

These are demo records, not real accounts. Changing a status does not grant or revoke access to a real system. Data is local to the browser and origin, is not shared between devices, and can be cleared by browser settings. There is no schema migration from earlier versions because v1 is the initial schema. Use fictional information only.

## Project structure

```text
index.html       Semantic layout, Bootstrap components, metadata
css/styles.css   Dashboard design and responsive styling
js/app.js        Seed data, validation, storage, querying, rendering, events
.github/         Existing assessment agent and specialist skills
```

## Verification

Validated JavaScript syntax and exercised the app in headless Microsoft Edge using Playwright: initial data, persistence after reload, add/edit/delete, required and email validation, duplicate email rejection, enable/disable, search with combined filters, empty results, pagination, page size, sorting, valid/invalid/duplicate JSON imports, filtered JSON/CSV exports, CSV formula protection, reset, corrupt storage recovery, mobile navigation, and modal focus restoration. No JavaScript page errors occurred.

Checked page overflow at 375×667, 430×932, 768×1024, 1366×768, and 1920×1080. Additional code review covered case-insensitive username/email checks during add/edit, date validation, pagination clamping, safe DOM rendering, semantic labels, sorting announcements, and reduced motion. Full screen-reader testing and Firefox/Safari verification remain unperformed.

## Deployment

The GitHub repository is connected to the existing Vercel `user-management-assessment` project using the Other framework preset. Serve from the repository root without a build command. This implementation has not been committed, pushed, or deployed as part of the coding task.
