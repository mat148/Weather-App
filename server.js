const express = require('express');
const bodyParser = require('body-parser');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

console.log('No value for FOO yet:', process.env.weatherApiKey);

const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index');
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let apiKey = process.env.weatherApiKey;
    let url = 'api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}'

    res.render('index');
    console.log(url);
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000');
})