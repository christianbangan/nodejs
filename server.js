const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('There is an error');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

hbs.registerHelper('allCaps', (text) => {
    return text.toUpperCase();
})
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/projects', () => {
    res.render('projects.hbs');
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Homepage',
        welcomeNote: 'Welcome to my website',
        currentYear: new Date().getFullYear()
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});