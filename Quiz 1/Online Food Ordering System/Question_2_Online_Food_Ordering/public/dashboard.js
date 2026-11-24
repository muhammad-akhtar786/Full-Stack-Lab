(async () => {
 try {
  const [restaurants, items] = await Promise.all([api('/restaurants'), api('/menu-items')]);
  document.getElementById('restaurant-count').textContent = restaurants.length;
  document.getElementById('item-count').textContent = items.length;
 } catch (error) {
  const el = document.getElementById('dashboard-message'); el.hidden = false; el.textContent = error.message;
 }
})();
