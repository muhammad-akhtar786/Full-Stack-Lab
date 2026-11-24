const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'books.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readBooks() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}
function writeBooks(books) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2));
}

app.get('/books', (req, res) => res.json(readBooks()));

app.post('/books', (req, res) => {
  const { title, author, category, year } = req.body;
  if (![title, author, category, year].every(value => String(value ?? '').trim())) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const books = readBooks();
  const book = {
    id: Date.now().toString(),
    title: String(title).trim(),
    author: String(author).trim(),
    category: String(category).trim(),
    year: String(year).trim()
  };
  books.push(book);
  writeBooks(books);
  res.status(201).json(book);
});

app.delete('/books/:id', (req, res) => {
  const books = readBooks();
  const updatedBooks = books.filter(book => book.id !== req.params.id);
  if (updatedBooks.length === books.length) {
    return res.status(404).json({ message: 'Book not found.' });
  }
  writeBooks(updatedBooks);
  res.json({ message: 'Book removed.' });
});

app.listen(PORT, () => console.log(`Library Book Tracker running at http://localhost:${PORT}`));
