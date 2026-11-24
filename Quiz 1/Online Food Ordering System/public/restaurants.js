const restaurantForm = document.getElementById('restaurant-form');
async function loadRestaurants() {
 const list = document.getElementById('restaurants-list');
 list.innerHTML = '<tr><td colspan="3" class="text-secondary">Loading...</td></tr>';
 try {
  const restaurants = await api('/restaurants');
  list.innerHTML = '';
  if (!restaurants.length) { list.innerHTML = '<tr><td colspan="3" class="text-secondary">No restaurants yet. Add your first restaurant.</td></tr>'; return; }
  restaurants.forEach(r => {
   const tr = document.createElement('tr');
   const values = [r.id, r.name, (r.menuItems || []).length];
   values.forEach(v => { const td = document.createElement('td'); td.textContent = v; tr.appendChild(td); });
   list.appendChild(tr);
  });
 } catch (e) { list.innerHTML = `<tr><td colspan="3" class="text-danger">${e.message}</td></tr>`; }
}
restaurantForm.addEventListener('submit', async e => {
 e.preventDefault();
 const name = document.getElementById('restaurant-name').value.trim();
 if (!name) return showMessage('restaurant-message', 'Restaurant name is required.', 'danger');
 try {
  await api('/restaurants', {method:'POST', body:JSON.stringify({name})});
  restaurantForm.reset(); showMessage('restaurant-message', 'Restaurant added successfully.');
  await loadRestaurants();
 } catch (err) { showMessage('restaurant-message', err.message, 'danger'); }
});
document.getElementById('refresh-restaurants').addEventListener('click', loadRestaurants);
loadRestaurants();
