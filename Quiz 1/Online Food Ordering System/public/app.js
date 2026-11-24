const API = '';
const API_KEY = 'quiz-api-key';
const restaurantSelect = document.getElementById('restaurant');
const menuList = document.getElementById('menu-list');
const form = document.getElementById('menu-form');
const message = document.getElementById('message');

async function loadRestaurants() {
  const response = await fetch(`${API}/restaurants`);
  const restaurants = await response.json();
  restaurantSelect.innerHTML = '<option value="">Select restaurant</option>';
  restaurants.forEach(restaurant => {
    const option = document.createElement('option');
    option.value = restaurant.id;
    option.textContent = restaurant.name;
    restaurantSelect.appendChild(option);
  });
}

async function loadMenuItems() {
  const response = await fetch(`${API}/menu-items`, {headers: {'x-api-key': API_KEY}});
  const items = await response.json();
  menuList.innerHTML = '';
  items.forEach(item => {
    const row = document.createElement('tr');
    [item.name, item.price, item.restaurant?.name || ''].forEach(value => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });
    menuList.appendChild(row);
  });
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const price = Number(document.getElementById('price').value);
  const restaurantId = Number(restaurantSelect.value);
  if (!name || !Number.isFinite(price) || price <= 0 || !restaurantId) {
    message.className = 'text-danger mb-0';
    message.textContent = 'Enter a name, a positive price, and select a restaurant.';
    return;
  }
  const response = await fetch(`${API}/menu-items`, {
    method: 'POST', headers: {'Content-Type': 'application/json', 'x-api-key': API_KEY},
    body: JSON.stringify({name, price, restaurantId})
  });
  if (!response.ok) {
    message.className = 'text-danger mb-0';
    message.textContent = 'Could not add menu item. Check the restaurant and API.';
    return;
  }
  form.reset();
  message.className = 'text-success mb-0';
  message.textContent = 'Menu item added.';
  await loadMenuItems();
});

Promise.all([loadRestaurants(), loadMenuItems()]).catch(() => {
  message.className = 'text-danger mb-0';
  message.textContent = 'Could not load data. Check the API and database setup.';
});
