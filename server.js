const express = require('express');
const app = express();   
const path = require('path');
const exphbs  = require('express-handlebars'); 
const request = require('request');
const dbconfig = require('./dbconfig.json');    // Load dbconfig file with API key

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));     // Sets Static Folder routes for Files in "/public", mainly for CSS and Images

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Handlebars Middleware, exphbs() is to modify config/options for hbs
app.engine('handlebars', exphbs({ 
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, '/views/layouts')
}));
app.set('view engine', 'handlebars');

// -----------------------  Routing Starts Here --------------------------------------

// Home page route
app.get('/', (req, res) => {    
    res.render('index', {       // Render "/views/index.handlebars" and use the layout "/views/layouts/index.handlebars"
        title: 'Home Page',
        css: '<link rel="stylesheet" type="text/css" href="css/home.css" >'
    }); 
});

// Cat page route
app.get('/cats', (req, res) => {
    var catJSON;    // Cat API json data
    var cats = [];  // Cat URLs array

    var options = {     // options for cat API
        method: 'GET',
        url: 'https://api.thecatapi.com/v1/images/search?limit=5',  // limit=5 returns 5 images
        headers: {
            'x-api-key': dbconfig["api-key"]
        }
    };
    
    request(options, (err, response, body) => {      // Send HTTP get request to cat API. Note: Use response instead of res, will override previous res variable above. 
        if(err){ 
            throw new Error(err);
        }

        catJSON = JSON.parse(body);     // Parse JSON formatted String into JSON

        catJSON.map(cat => cats.push(cat.url));   // For every cat.url in dogJSON, push it into cat array

        // Must call res.render() inside request() due to callback based approach of request().
        // (cats array will not be filled by the time res.render() gets called)
        res.render('gallery', {     
            title: 'Cats!',         
            css: '<link rel="stylesheet" type="text/css" href="css/gallery.css" >',
            script: '<script src="scripts/gallery.js"></script>',
            imgs: cats
        });
    });
});

// Dog page route
app.get('/dogs', (req, res) => {
    var dogJSON;    // Dog API json data
    var dogs = [];  // Dog URLs array

    var options = {     // Options for dog API
        method: 'GET',
        url: 'https://api.thedogapi.com/v1/images/search?limit=5',  // limit=5 returns 5 images
        headers: {
            'x-api-key': dbconfig["api-key"]
        }
    };
    
    request(options, (err, response, body) => {      // Send HTTP get request to cat API. Note: Use response instead of res, will override previous res variable above. 
        if(err){ 
            throw new Error(err);
        }

        dogJSON = JSON.parse(body);     // Parse JSON formatted String into JSON

        dogJSON.map(dog => dogs.push(dog.url));   // For every dog.url in dogJSON, push it into dogs array

        // Must call res.render() inside request() due to callback based approach of request().
        // (dogs array will not be filled by the time res.render() gets called)
        res.render('gallery', {
            title: 'Dogs!',
            css: '<link rel="stylesheet" type="text/css" href="css/gallery.css" >',
            script: '<script src="scripts/gallery.js"></script>',
            imgs: dogs
        });
    });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));