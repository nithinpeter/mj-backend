var db = require('../db')

var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
  var collection = db.get().collection('movies')

  collection.find().toArray(function (err, docs) {
    if (err) {
      console.log('An error occurred white fetcing.')
      return;
    }

    res.json(docs);
  })
});

router.post('/', function (req, res) {
  console.dir(req.body);

  db.get().collection('movies').insertOne({
    _id: 1,
    title: req.body.title,
    hero: req.body.hero
  }, function (err, result) {
    if(err) {
      console.log('An error occurred while inserting.')
      return;
    }
  });
});

router.get('/:movieId', function (req, res) {
  var cursor = db.get().collection('movies').findOne({
    _id: parseInt(req.params.movieId)
  }, function (err, result) {
    if(err) {
      console.log('An error occurred while fetching.')
      return;
    }
    res.json(result);
  });
  
});



module.exports = router;

