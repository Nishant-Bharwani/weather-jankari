// Weather Jankari APP

// All neccesary imports
const express = require('express');
const app = express();
const path = require('path');
const router = require('./routers/routes');
const hbs = require('hbs');

// Port And Hostname
const port = process.env.PORT || 8000;
const __hostname = '127.0.0.1';

// Path For Static files
const staticFilesPath = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', templatesPath);
hbs.registerPartials(partialsPath);
app.use(express.static(staticFilesPath));
app.use(router);




app.listen(port, () => {
    console.log(`Listening at http://${__hostname}:${port}`);
});