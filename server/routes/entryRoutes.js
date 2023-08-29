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
  const _db = getDb();
  console.log("entryRoutes.js Post / req.session______", req.session);

  if (req.session && req.session.user_id) {
    _db.collection('JC').insertOne(
      {
        user_id: req.session.user_id.toString(),
        content: req.body.content
      }
    )
      .then(results => res.json(results))
      .catch(err => {
        if (err) throw err;
      });
  } else {
    res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
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
