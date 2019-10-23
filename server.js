const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let apiKey = process.env.weatherApiKey;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function(err, response, body) {
        if(err) {
            res.render('index', {weather: null, error: url});
        }else {
            let weather = JSON.parse(body)

            if (weather.main == undefined) {
                res.render('index', {weather: null, error: 'Error 2'});
            }else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });

    //res.render('index');
    //console.log(url);
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000');
})