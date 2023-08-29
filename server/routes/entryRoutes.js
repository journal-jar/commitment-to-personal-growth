const router = require('express').Router();
const { getDb } = require("../config/connection.js")
const ObjectID = require('mongodb').ObjectID;

router.get('/', (req, res) => {
  const _db = getDb()
  _db.collection('JC')
    .find({ user_id: req.session.user_id.toString() })
    .toArray()
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

router.post('/', (req, res) => {
  const _db = getDb()
  _db.collection('JC').insertOne(
    { user_id: req.session.user_id.toString(), 
      content: req.body.content }
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});


router.put('/:entry_id', (req, res) => {
  const _db = getDb()
  _db.collection('JC').insertOne(
    { title: req.body.title, author: req.body.author }
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

router.get('/:entry_id', (req, res) => {
  const _db = getDb()
  _db.collection('JC')
    .findOne({})
    .toArray()
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

module.exports = router;
