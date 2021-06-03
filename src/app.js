// Weather Jankari APP


// All neccesary imports
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();



// Port And Hostname
const port = process.env.PORT || 80;
const __hostname = '127.0.0.1';

// Path For Static files
const staticFilesPath = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', templatesPath);
hbs.registerPartials(partialsPath);
app.use(express.static(staticFilesPath));


// Routing Handeled here.
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/weather", (req, res) => {
    res.render("weather");
});



app.get("*", (req, res) => {
    res.render("err404", {
        errorComment: "Oops! The Page you requested can't be found."
    });
    res.status(404);
});

app.listen(port, () => {
    console.log(`Listening at http://${__hostname}:${port}`);
});