const express = require('express');
const bodyParser = require('body-parser');

const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index');
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = 'api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}'
    
    res.render('index');
    //console.log(req.body.city);
    console.log(value);
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000');
})