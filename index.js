const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// In-memory array to store book data
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 15.99 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 12.99 },
  // Add more books as needed
];

app.use(bodyParser.json());

// Welcome message for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Book Cart API!');
});

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Get a specific book by ID
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    res.status(404).json({ error: 'Book not found' });
  } else {
    res.json(book);
  }
});
// Add a new book
app.post('/books', (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    res.status(201).json(newBook);
  });
  
  // Update a book by ID
  app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;
    const index = books.findIndex(b => b.id === bookId);
  
    if (index === -1) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      books[index] = { ...books[index], ...updatedBook };
      res.json(books[index]);
    }
  });
  
  // Delete a book by ID
  app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    books = books.filter(b => b.id !== bookId);
    res.json({ message: 'Book deleted successfully' });
  });
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
  