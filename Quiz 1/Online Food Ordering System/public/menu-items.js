const menuForm = document.getElementById('menu-form');
const restaurantSelect = document.getElementById('item-restaurant');
async function loadRestaurantOptions(selected='') {
 const restaurants = await api('/restaurants');
 restaurantSelect.innerHTML = '<option value="">Select restaurant</option>';
 restaurants.forEach(r => {
  const option = document.createElement('option'); option.value = r.id; option.textContent = r.name;
  if (String(r.id) === String(selected)) option.selected = true;
  restaurantSelect.appendChild(option);
 });
}
async function loadMenuItems() {
 const tbody = document.getElementById('menu-list');
 tbody.innerHTML = '<tr><td colspan="5" class="text-secondary">Loading...</td></tr>';
 try {
  const items = await api('/menu-items'); tbody.innerHTML = '';
  if (!items.length) { tbody.innerHTML = '<tr><td colspan="5" class="text-secondary">No menu items found. Add your first item above.</td></tr>'; return; }
  items.forEach(item => {
   const tr = document.createElement('tr');
   [item.id, item.name, money(item.price), item.restaurant?.name || ''].forEach(v => { const td=document.createElement('td'); td.textContent=v; tr.appendChild(td); });
   const actions=document.createElement('td');
   const edit=document.createElement('button'); edit.className='btn btn-sm btn-outline-primary me-2'; edit.textContent='Edit';
   edit.addEventListener('click',()=>startEdit(item));
   const del=document.createElement('button'); del.className='btn btn-sm btn-outline-danger'; del.textContent='Delete';
   del.addEventListener('click',()=>deleteItem(item.id));
   actions.append(edit,del); tr.appendChild(actions); tbody.appendChild(tr);
  });
 } catch(e) { tbody.innerHTML = `<tr><td colspan="5" class="text-danger">${e.message}</td></tr>`; }
}
function startEdit(item) {
 document.getElementById('item-id').value=item.id;
 document.getElementById('item-name').value=item.name;
 document.getElementById('item-price').value=item.price;
 restaurantSelect.value=item.restaurant?.id || '';
 document.getElementById('form-heading').textContent='Update Menu Item';
 document.getElementById('submit-item').textContent='Save Changes';
 document.getElementById('cancel-edit').hidden=false;
 window.scrollTo({top:0,behavior:'smooth'});
}
function resetForm() {
 menuForm.reset(); document.getElementById('item-id').value='';
 document.getElementById('form-heading').textContent='Add Menu Item';
 document.getElementById('submit-item').textContent='Add Item';
 document.getElementById('cancel-edit').hidden=true;
}
async function deleteItem(id) {
 if (!confirm('Delete this menu item?')) return;
 try { await api(`/menu-items/${id}`,{method:'DELETE'}); showMessage('menu-message','Menu item deleted.'); await loadMenuItems(); }
 catch(e) { showMessage('menu-message',e.message,'danger'); }
}
menuForm.addEventListener('submit', async e => {
 e.preventDefault();
 const id=document.getElementById('item-id').value;
 const name=document.getElementById('item-name').value.trim();
 const price=Number(document.getElementById('item-price').value);
 const restaurantId=Number(restaurantSelect.value);
 if (!name || !Number.isFinite(price) || price<=0 || !restaurantId) return showMessage('menu-message','Enter a name, positive price, and select a restaurant.','danger');
 try {
  const method=id?'PUT':'POST', path=id?`/menu-items/${id}`:'/menu-items';
  await api(path,{method,body:JSON.stringify({name,price,restaurantId})});
  resetForm(); showMessage('menu-message',id?'Menu item updated.':'Menu item added.');
  await loadMenuItems();
 } catch(err) { showMessage('menu-message',err.message,'danger'); }
});
document.getElementById('cancel-edit').addEventListener('click',resetForm);
document.getElementById('refresh-items').addEventListener('click',loadMenuItems);
(async()=>{try{await loadRestaurantOptions();await loadMenuItems();}catch(e){showMessage('menu-message',e.message,'danger');}})();
