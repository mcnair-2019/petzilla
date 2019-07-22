const express = require('express');
const app = express();   
const path = require('path');
const exphbs  = require('express-handlebars'); 

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));     // Sets Static Folder routes for Files in "/public", mainly for CSS and Images

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Handlebars Middleware, exphbs() is to modify config/options for hbs
app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: path.join(__dirname, '/views/layouts')}));
app.set('view engine', 'handlebars');

// Home page route
app.get('/', (req, res) => {
    res.render('index', {layout: 'index.handlebars'}); // Render "/views/index.handlebars" and use the layout "/views/layouts/index.handlebars"
});

// Cat page route
app.get('/cats', (req, res) => {
    res.send('This will be cat slideshow!');
});

// Dog page route
app.get('/dogs', (req, res) => {
    res.send('This will be dog slideshow!');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));