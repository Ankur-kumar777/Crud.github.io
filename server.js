const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set HTML as view engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

// Sample data
let data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
];

// Routes
app.get('/', (req, res) => {
    res.render('index.html', { data });
});

// Create
app.post('/', (req, res) => {
    const { name } = req.body;
    const id = data.length + 1;
    data.push({ id, name });
    res.redirect('/');
});

// Update (Edit)
app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(item => item.id === id);
    res.render('edit.html', { item });
});

// Update (Save)
app.post('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index].name = name;
    }
    res.redirect('/');
});

// Delete
app.get('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    data = data.filter(item => item.id !== id);
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
