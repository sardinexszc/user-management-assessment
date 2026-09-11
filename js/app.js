/* Browser-only directory. Storage, validation, querying, and UI stay separate. */
(() => {
  'use strict';
  const KEY = 'userMgmt.users.v1';
  const OPTIONS = { userGroup: ['Administrators', 'Managers', 'Members'], division: ['Operations', 'Engineering', 'Finance', 'People'], region: ['Asia Pacific', 'Europe', 'North America'], userType: ['Internal', 'External'], status: ['Active', 'Inactive'] };
  const LABELS = { firstName: 'First name', lastName: 'Last name', username: 'Username', email: 'Email', userGroup: 'User Group', division: 'Division', region: 'Region', userType: 'User Type', status: 'Status' };
  const FIELDS = ['id', ...Object.keys(LABELS), 'submittedDate', 'enabledDate'];
  const $ = id => document.getElementById(id);
  const today = () => new Date().toISOString().slice(0, 10);
  const names = ['Amelia Reyes', 'Benjamin Cruz', 'Chloe Santos', 'Daniel Park', 'Elena Garcia', 'Ethan Brooks', 'Isabella Chen', 'James Wilson', 'Liam Torres', 'Maya Patel', 'Noah Kim', 'Olivia Martin', 'Sofia Rivera', 'Theo Anderson', 'Zoe Tan'];
  function seedUsers() {
    return names.map((name, i) => {
      const [firstName, lastName] = name.split(' ');
      return { id: `demo-${i + 1}`, firstName, lastName, username: `${firstName}.${lastName}`.toLowerCase(), email: `${firstName}.${lastName}@example.com`.toLowerCase(), userGroup: OPTIONS.userGroup[i % 3], division: OPTIONS.division[i % 4], region: OPTIONS.region[i % 3], userType: i % 4 ? 'Internal' : 'External', status: i % 4 ? 'Active' : 'Inactive', submittedDate: `2026-08-${String(i + 1).padStart(2, '0')}`, enabledDate: i % 4 ? `2026-08-${String(i + 2).padStart(2, '0')}` : '' };
    });
  }
  function normalize(record) {
    return Object.fromEntries(FIELDS.map(key => [key, typeof record?.[key] === 'string' ? record[key].trim() : '']));
  }
  function validDate(value) { return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value; }
  function validate(user, others = []) {
    const errors = {};
    for (const [key, label] of Object.entries(LABELS)) {
      if (!user[key]) errors[key] = `${label} is required.`;
      else if (user[key].length > 120) errors[key] = `${label} must be 120 characters or fewer.`;
      else if (OPTIONS[key] && !OPTIONS[key].includes(user[key])) errors[key] = `Choose a valid ${label.toLowerCase()}.`;
    }
    if (user.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) errors.email = 'Enter a valid email address.';
    for (const key of ['username', 'email']) {
      if (others.some(other => other[key].toLowerCase() === user[key].toLowerCase())) errors[key] = `This ${key} is already assigned to another user.`;
    }
    if (!user.id || user.id.length > 120 || others.some(other => other.id === user.id)) errors.id = 'Each user must have a unique ID.';
    if (!validDate(user.submittedDate)) errors.submittedDate = 'A valid submitted date is required.';
    if (user.status === 'Active' ? !validDate(user.enabledDate) : user.enabledDate !== '') errors.enabledDate = 'Active users need a valid enabled date; inactive users must have an empty enabled date.';
    if (user.enabledDate && user.enabledDate < user.submittedDate) errors.enabledDate = 'Enabled date cannot be earlier than the submitted date.';
    return errors;
  }
  function validateCollection(input) {
    if (!Array.isArray(input) || input.length > 10000) throw new Error('Use a JSON array containing no more than 10,000 users.');
    const accepted = [];
    input.forEach((raw, index) => {
      if (!raw || typeof raw !== 'object' || FIELDS.some(field => typeof raw[field] !== 'string')) throw new Error(`Record ${index + 1}: all user fields must be strings.`);
      const user = normalize(raw);
      const errors = validate(user, accepted);
      if (Object.keys(errors).length) throw new Error(`Record ${index + 1}: ${Object.values(errors)[0]}`);
      accepted.push(user);
    });
    return accepted;
  }
  function storageWarning(message) { $('storage-warning').hidden = false; $('storage-warning').textContent = message; }
  function loadUsers() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw !== null) return validateCollection(JSON.parse(raw));
      const seed = seedUsers();
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    } catch {
      storageWarning('Saved data could not be loaded. Demo users are shown. Export any changes to keep a copy; reset demo data to replace the saved data.');
      return seedUsers();
    }
  }
  let users = loadUsers();
  let page = 1;
  let sortKey = 'firstName';
  let sortDirection = 1;
  let editingId = null;
  let pendingAction = null;
  let returnFocus = null;
  if (!window.bootstrap) { storageWarning('Interface resources could not load. Check your internet connection and refresh the page.'); return; }
  const userModal = new bootstrap.Modal($('user-modal'));
  const confirmModal = new bootstrap.Modal($('confirm-modal'));
  const infoModal = new bootstrap.Modal($('info-modal'));
  const sidebar = new bootstrap.Offcanvas($('sidebar'));
  const toast = new bootstrap.Toast($('notification'), { delay: 4500 });
  function notify(message) { $('notification-text').textContent = message; toast.show(); }
  function saveUsers(nextUsers, message) {
    try { localStorage.setItem(KEY, JSON.stringify(nextUsers)); }
    catch { storageWarning('Changes could not be saved. Browser storage may be unavailable or full. Export your current data and try again.'); notify('Changes were not saved.'); return false; }
    users = nextUsers;
    $('storage-warning').hidden = true;
    render();
    notify(message);
    return true;
  }
  function queryUsers() {
    const search = $('search').value.trim().toLowerCase();
    return users.filter(user => (!search || Object.values(user).some(value => value.toLowerCase().includes(search))) && (!$('filter-group').value || user.userGroup === $('filter-group').value) && (!$('filter-status').value || user.status === $('filter-status').value) && (!$('filter-division').value || user.division === $('filter-division').value)).sort((a, b) => a[sortKey].localeCompare(b[sortKey], undefined, { sensitivity: 'base', numeric: true }) * sortDirection);
  }
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function formatDate(value) { return value ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`)) : '—'; }
  function renderRow(user) {
    const row = element('tr');
    const person = element('td');
    const wrap = element('div', 'person-cell');
    const details = element('div');
    details.append(element('div', 'person-name', `${user.firstName} ${user.lastName}`), element('span', 'person-email', user.email), element('span', 'secondary-line', `@${user.username}`));
    const avatar = element('span', 'avatar', `${user.firstName[0]}${user.lastName[0]}`.toUpperCase());
    avatar.setAttribute('aria-hidden', 'true');
    wrap.append(avatar, details); person.append(wrap); row.append(person);
    row.append(element('td', '', user.userGroup));
    const division = element('td', '', user.division); division.append(element('span', 'secondary-line', user.region)); row.append(division);
    row.append(element('td', '', user.userType));
    const status = element('td'); status.append(element('span', `status-badge ${user.status === 'Active' ? 'active' : ''}`, user.status)); row.append(status);
    row.append(element('td', '', formatDate(user.submittedDate)), element('td', '', formatDate(user.enabledDate)));
    const actions = element('td'); const buttons = element('div', 'row-actions');
    for (const [action, label] of [['edit', 'Edit'], ['toggle', user.status === 'Active' ? 'Disable' : 'Enable'], ['delete', 'Delete']]) {
      const button = element('button', '', label); button.type = 'button'; button.dataset.action = action; button.dataset.id = user.id; button.setAttribute('aria-label', `${label} ${user.firstName} ${user.lastName}`); buttons.append(button);
    }
    actions.append(buttons); row.append(actions); return row;
  }
  function render() {
    const filtered = queryUsers();
    const size = Number($('page-size').value);
    const pages = Math.max(1, Math.ceil(filtered.length / size));
    page = Math.max(1, Math.min(page, pages));
    const start = (page - 1) * size;
    $('users-body').replaceChildren(...filtered.slice(start, start + size).map(renderRow));
    $('total-count').textContent = users.length;
    $('active-count').textContent = users.filter(user => user.status === 'Active').length;
    $('inactive-count').textContent = users.filter(user => user.status === 'Inactive').length;
    $('nav-count').textContent = users.length;
    $('directory-count').textContent = `${filtered.length} users`;
    $('record-count').textContent = `Showing ${filtered.length ? start + 1 : 0}–${Math.min(start + size, filtered.length)} of ${filtered.length} users`;
    $('page-label').textContent = `${page} of ${pages}`;
    $('previous').disabled = page === 1; $('next').disabled = page === pages;
    $('empty-state').hidden = filtered.length !== 0;
    document.querySelectorAll('[data-sort]').forEach(button => {
      const active = button.dataset.sort === sortKey;
      button.parentElement.setAttribute('aria-sort', active ? (sortDirection === 1 ? 'ascending' : 'descending') : 'none');
      if (!button.dataset.label) button.dataset.label = button.textContent.replace(/[↑↕]/g, '').trim();
      button.textContent = `${button.dataset.label} ${active ? (sortDirection === 1 ? '↑' : '↓') : '↕'}`;
    });
  }
  function buildForm() {
    for (const [key, label] of Object.entries(LABELS)) {
      const column = element('div', 'col-12 col-sm-6');
      const caption = element('label', '', label); caption.htmlFor = `user-${key}`;
      const input = element(OPTIONS[key] ? 'select' : 'input', OPTIONS[key] ? 'form-select' : 'form-control');
      input.id = `user-${key}`; input.name = key; input.required = true;
      if (OPTIONS[key]) OPTIONS[key].forEach(value => input.append(new Option(value, value)));
      else { input.type = key === 'email' ? 'email' : 'text'; input.maxLength = 120; }
      input.setAttribute('aria-describedby', `error-${key}`);
      const error = element('div', 'invalid-feedback'); error.id = `error-${key}`;
      column.append(caption, input, error); $('form-fields').append(column);
    }
  }
  function showErrors(errors) {
    Object.keys(LABELS).forEach(key => {
      $(`user-${key}`).classList.toggle('is-invalid', Boolean(errors[key]));
      $(`user-${key}`).setAttribute('aria-invalid', String(Boolean(errors[key])));
      $(`error-${key}`).textContent = errors[key] || '';
    });
    $('form-error').textContent = Object.keys(errors).length ? Object.values(errors)[0] : '';
  }
  function openUser(user = null) {
    returnFocus = document.activeElement;
    editingId = user?.id || null;
    $('user-form').reset(); showErrors({});
    $('user-modal-title').textContent = user ? 'Edit user' : 'Add user';
    Object.keys(LABELS).forEach(key => { $(`user-${key}`).value = user?.[key] || OPTIONS[key]?.[0] || ''; });
    userModal.show();
  }
  function confirmAction(title, message, action) {
    if ($('sidebar').classList.contains('show')) {
      $('sidebar').addEventListener('hidden.bs.offcanvas', () => confirmAction(title, message, action), { once: true });
      sidebar.hide();
      return;
    }
    returnFocus = document.activeElement;
    $('confirm-title').textContent = title; $('confirm-message').textContent = message;
    $('confirm-action').textContent = title; pendingAction = action; confirmModal.show();
  }
  function clearFilters() { $('filters').reset(); page = 1; render(); }
  function download(format) {
    const filtered = queryUsers();
    const safeCell = value => `"${(/^[\s]*[=+\-@]|^[\t\r\n]/.test(value) ? `'${value}` : value).replace(/"/g, '""')}"`;
    const data = format === 'json' ? JSON.stringify(filtered, null, 2) : [FIELDS.join(','), ...filtered.map(user => FIELDS.map(key => safeCell(user[key])).join(','))].join('\r\n');
    const url = URL.createObjectURL(new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv;charset=utf-8' }));
    const anchor = element('a'); anchor.href = url; anchor.download = `users-${today()}.${format}`; document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify(`Exported ${filtered.length} users as ${format.toUpperCase()}.`);
  }
  async function importUsers(event) {
    const file = event.target.files[0]; if (!file) return;
    $('import-button').disabled = true; $('import-button').textContent = 'Importing…';
    try {
      if (file.size > 2 * 1024 * 1024) throw new Error('Choose a JSON file smaller than 2 MB.');
      const imported = validateCollection(JSON.parse(await file.text()));
      const merged = [...users];
      for (const user of imported) {
        const errors = validate(user, merged);
        if (Object.keys(errors).length) throw new Error(`Import canceled for ${user.username}: ${Object.values(errors)[0]} No records were changed.`);
        merged.push(user);
      }
      if (merged.length > 10000) throw new Error('The directory supports up to 10,000 users.');
      saveUsers(merged, `Imported ${imported.length} users.`);
    } catch (error) { notify(error instanceof SyntaxError ? 'Import canceled. Choose a valid JSON file.' : error.message); }
    finally { event.target.value = ''; $('import-button').disabled = false; $('import-button').textContent = '↓ Import JSON'; }
  }
  function bindEvents() {
    $('add-user').addEventListener('click', () => openUser());
    $('user-form').addEventListener('submit', event => {
      event.preventDefault();
      const existing = users.find(user => user.id === editingId);
      const input = Object.fromEntries(new FormData(event.target));
      const user = normalize({ ...input, id: existing?.id || crypto.randomUUID(), submittedDate: existing?.submittedDate || today(), enabledDate: input.status === 'Active' ? (existing?.enabledDate || today()) : '' });
      const errors = validate(user, users.filter(other => other.id !== editingId));
      showErrors(errors);
      if (Object.keys(errors).length) { document.querySelector('#user-form .is-invalid')?.focus(); return; }
      const next = editingId ? users.map(other => other.id === editingId ? user : other) : [...users, user];
      if (saveUsers(next, editingId ? 'Changes saved.' : 'User added.')) userModal.hide();
    });
    $('users-body').addEventListener('click', event => {
      const button = event.target.closest('[data-action]'); if (!button) return;
      const user = users.find(item => item.id === button.dataset.id); if (!user) return;
      if (button.dataset.action === 'edit') { openUser(user); return; }
      const name = `${user.firstName} ${user.lastName}`;
      if (button.dataset.action === 'delete') confirmAction('Delete user', `Delete ${name}? This removes their record from this browser. This cannot be undone.`, () => saveUsers(users.filter(item => item.id !== user.id), 'User deleted.'));
      else {
        const enabled = user.status !== 'Active';
        confirmAction(enabled ? 'Enable user' : 'Disable user', `${enabled ? 'Enable' : 'Disable'} ${name}? Their record will remain in the directory and their status will become ${enabled ? 'active' : 'inactive'}.`, () => saveUsers(users.map(item => item.id === user.id ? { ...item, status: enabled ? 'Active' : 'Inactive', enabledDate: enabled ? today() : '' } : item), enabled ? 'User enabled.' : 'User disabled.'));
      }
    });
    $('confirm-action').addEventListener('click', () => { if (pendingAction?.()) confirmModal.hide(); });
    $('reset-demo').addEventListener('click', () => confirmAction('Reset demo data', 'Replace all users and edits in this browser with the original 15 demo users? Export your changes first if you want to keep them.', () => { const saved = saveUsers(seedUsers(), 'Demo data restored.'); if (saved) clearFilters(); return saved; }));
    $('filters').addEventListener('submit', event => event.preventDefault());
    const updateResults = () => { page = 1; render(); };
    $('search').addEventListener('input', updateResults);
    ['filter-group', 'filter-status', 'filter-division'].forEach(id => $(id).addEventListener('change', updateResults));
    $('filters').addEventListener('reset', () => setTimeout(() => { page = 1; render(); }, 0));
    $('empty-clear').addEventListener('click', clearFilters);
    $('page-size').addEventListener('change', () => { page = 1; render(); });
    $('previous').addEventListener('click', () => { page--; render(); });
    $('next').addEventListener('click', () => { page++; render(); });
    document.querySelectorAll('[data-sort]').forEach(button => button.addEventListener('click', () => { sortDirection = sortKey === button.dataset.sort ? -sortDirection : 1; sortKey = button.dataset.sort; page = 1; render(); }));
    $('export-json').addEventListener('click', () => download('json'));
    $('export-csv').addEventListener('click', () => download('csv'));
    $('import-button').addEventListener('click', () => $('import-file').click());
    $('import-file').addEventListener('change', importUsers);
    $('data-tools').addEventListener('click', () => {
      const focusTools = () => { $('import-button').focus(); $('import-button').scrollIntoView({ block: 'center' }); };
      if ($('sidebar').classList.contains('show')) { $('sidebar').addEventListener('hidden.bs.offcanvas', focusTools, { once: true }); sidebar.hide(); }
      else focusTools();
    });
    $('profile').addEventListener('click', () => { returnFocus = $('profile'); infoModal.show(); });
    $('nav-toggle').addEventListener('click', () => {
      if (window.innerWidth < 992) sidebar.toggle();
      else { document.body.classList.toggle('sidebar-collapsed'); $('nav-toggle').setAttribute('aria-expanded', String(!document.body.classList.contains('sidebar-collapsed'))); }
    });
    $('sidebar').addEventListener('shown.bs.offcanvas', () => $('nav-toggle').setAttribute('aria-expanded', 'true'));
    $('sidebar').addEventListener('hidden.bs.offcanvas', () => { $('nav-toggle').setAttribute('aria-expanded', 'false'); $('nav-toggle').focus(); });
    $('sidebar').querySelector('a').addEventListener('click', () => { sidebar.hide(); $('main').focus(); });
    const media = matchMedia('(min-width: 992px)');
    const updateNav = () => { if (media.matches) sidebar.hide(); $('nav-toggle').setAttribute('aria-expanded', String(media.matches && !document.body.classList.contains('sidebar-collapsed'))); };
    media.addEventListener('change', updateNav); updateNav();
    $('user-modal').addEventListener('shown.bs.modal', () => $('user-firstName').focus());
    $('confirm-modal').addEventListener('shown.bs.modal', () => $('confirm-modal').querySelector('[data-bs-dismiss="modal"]').focus());
    ['user-modal', 'confirm-modal', 'info-modal'].forEach(id => $(id).addEventListener('hidden.bs.modal', () => { pendingAction = null; if (returnFocus?.isConnected) returnFocus.focus(); else $('add-user').focus(); }));
  }
  OPTIONS.userGroup.forEach(value => $('filter-group').append(new Option(value, value)));
  OPTIONS.division.forEach(value => $('filter-division').append(new Option(value, value)));
  buildForm(); bindEvents(); render();
})();
