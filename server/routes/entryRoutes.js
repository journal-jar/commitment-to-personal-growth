const router = require('express').Router();
const { getDb } = require("../config/connection.js")

// /api/entries
router.get('/', (req, res) => {
  const db = getDb()
  db.collection('J')
    .find({})
    .toArray()
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

router.post('/', (req, res) => {
  const db = getDb()
  db.collection('J').insertOne(
    { content: req.body.content }
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

router.put('/:entry_id', (req, res) => {
  const db = getDb()
  db.collection('JJ').insertOne(
    { title: req.body.title, author: req.body.author }
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

router.get('/:entry_id', (req, res) => {
  const db = getDb()
  db.collection('JJ')
    .findOne({})
    .toArray()
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

module.exports = router;
