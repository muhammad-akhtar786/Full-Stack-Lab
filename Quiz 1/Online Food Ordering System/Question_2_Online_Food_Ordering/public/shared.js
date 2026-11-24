const API_KEY = 'quiz-api-key';
const money = value => `Rs. ${Number(value).toFixed(2)}`;
async function api(path, options = {}) {
  const headers = { 'x-api-key': API_KEY, ...(options.headers || {}) };
  if (options.body) headers['Content-Type'] = 'application/json';
  const response = await fetch(path, { ...options, headers });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!response.ok) throw new Error(data?.message || `Request failed (${response.status})`);
  return data;
}
function showMessage(id, message, type='success') {
  const el = document.getElementById(id);
  if (el) { el.className = `alert alert-${type} mt-3`; el.textContent = message; el.hidden = false; }
}
