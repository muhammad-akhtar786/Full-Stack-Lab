const form = document.getElementById('book-form');
const bookList = document.getElementById('book-list');
const categoryFilter = document.getElementById('category-filter');
const message = document.getElementById('message');
let books = [];

async function loadBooks() {
  const response = await fetch('/books');
  books = await response.json();
  updateCategoryFilter();
  renderBooks();
}

function updateCategoryFilter() {
  const selected = categoryFilter.value;
  const categories = [...new Set(books.map(book => book.category))];
  categoryFilter.innerHTML = '<option value="all">All categories</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
  categoryFilter.value = categories.includes(selected) ? selected : 'all';
}

function renderBooks() {
  const selectedCategory = categoryFilter.value;
  const visibleBooks = selectedCategory === 'all'
    ? books
    : books.filter(book => book.category === selectedCategory);
  bookList.innerHTML = '';
  visibleBooks.forEach(book => {
    const column = document.createElement('div');
    column.className = 'col-md-6 col-lg-4';
    const card = document.createElement('div');
    card.className = 'card book-card shadow-sm';
    const body = document.createElement('div');
    body.className = 'card-body';
    const title = document.createElement('h3');
    title.className = 'h5 card-title';
    title.textContent = book.title;
    const details = document.createElement('p');
    details.className = 'card-text';
    details.textContent = `Author: ${book.author} | Category: ${book.category} | Year: ${book.year}`;
    const remove = document.createElement('button');
    remove.className = 'btn btn-outline-danger btn-sm';
    remove.textContent = 'Remove';
    remove.addEventListener('click', () => removeBook(book.id));
    body.append(title, details, remove);
    card.appendChild(body);
    column.appendChild(card);
    bookList.appendChild(column);
  });
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const book = {
    title: document.getElementById('title').value.trim(),
    author: document.getElementById('author').value.trim(),
    category: document.getElementById('category').value.trim(),
    year: document.getElementById('year').value.trim()
  };
  if (Object.values(book).some(value => !value)) {
    message.textContent = 'Please fill in every field.';
    return;
  }
  const response = await fetch('/books', {
    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(book)
  });
  if (!response.ok) {
    message.textContent = 'Could not add the book.';
    return;
  }
  form.reset();
  message.textContent = '';
  await loadBooks();
});

async function removeBook(id) {
  await fetch(`/books/${id}`, {method: 'DELETE'});
  await loadBooks();
}

categoryFilter.addEventListener('change', renderBooks);
loadBooks().catch(() => { message.textContent = 'Could not load books from the API.'; });
