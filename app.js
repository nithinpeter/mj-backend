var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');
var url = 'mongodb://' + process.env.DB_USER_NAME + ':'+ process.env.DB_PASSWORD + '@ds011251.mlab.com:11251/mallujunkies';
// var url = 'mongodb://localhost:27017/restaurants';

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/movies', require('./api/movies'));

// Connect to Mongo on start
db.connect(url, function (err) {
    if (err) {
        console.log('Unable to connect to Mongo.')
        process.exit(1)
    } else {
        console.log('Connected to Mongo server.')
        var port = process.env.PORT || 3100;
        app.listen(port, function () {
            console.log('Listening on port ' + port);
        })
    }
});