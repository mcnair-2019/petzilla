const express = require('express');
const app = express();   
const path = require('path');
const exphbs  = require('express-handlebars'); 
const request = require('request');
const dbconfig = require('./dbconfig.json');    // Load dbconfig file with API key

const dogs = require('./public/img/Dogs');  //Get Dog paths
const cats = require('./public/img/Cats');  //Get Cats paths

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

        for(var i in catJSON) {     // Push url into array
            var item = catJSON[i];  // Store single cat objectin item
            cats.push(item.url);    // Push cat object's url 
        }

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
    res.render('gallery', {
        title: 'Dogs!',
        css: '<link rel="stylesheet" type="text/css" href="css/gallery.css" >',
        script: '<script src="scripts/gallery.js"></script>',
        imgs: dogs
    });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));