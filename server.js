const express = require('express');     
const path = require('path');
const hbs = require('hbs');     // Load Handlebars
const port = 3000;

const app = express();

app.use(express.static(__dirname + '/views'));      // Sets routes for html files in "/views"
app.use(express.static(__dirname + '/public'));     // Sets routes for Files in "/public", mainly for CSS

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`)
});