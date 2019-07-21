const express = require('express');     
const path = require('path');
const hbs = require('hbs');     // Load Handlebars
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '/views')));      // Sets Static Folder routes for html files in "/views"
app.use(express.static(path.join(__dirname, '/public')));     // Sets Static Folder routes for Files in "/public", mainly for CSS

app.listen(PORT, () => console.log(`Server listening on port ${port}!`));