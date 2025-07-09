import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let books = [
    {"id":1, "title": "Famous Five", "author": "Enid Blyton"},
    {"id":2, "title": "IT", "author": "Stephen King"},
    {"id":3, "title": "Harry Potter", "author": "J K Rowling"}
];

app.get('/books', (req, res) =>{
    res.send(books);
});

app.post('/books', (req, res) =>{
    const {title, author} = req.body;
    const newBook = {
        id:books.length + 1,
        title,
        author
    };

    books.push(newBook);
    res.status(201).send(`Book added: ${JSON.stringify(newBook)}`);
});

app.put('/books/:id', (req, res) =>{
    const bookId = parseInt(req.params.id);
    const {title, author} = req.body;
    const book = books.find(b => b.id === bookId);

    if(!book)
    {
        return res.status(404).send('Book not found');
    }

    book.title = title || book.title;
    book.author = author || book.author;

    res.send(`Book details updated: ${JSON.stringify(book)}`);
});

app.delete('/books/:id', (req, res) =>{
    const bookId = parseInt(req.params.id);
    const index = books.findIndex( p => p.id === bookId);

    if(index === -1)
    {
        return res.status(404).send('Book not found');
    }

    const deletedBook = books.splice(index, 1);
    res.send(`Book deleted: ${JSON.stringify(deletedBook[0])}`);
});

app.listen(port, () =>{
    console.log(`Server is running at http://localhost:${port}`);
});