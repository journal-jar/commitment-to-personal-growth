const router = require('express').Router();

// /api/users
router.get('/', (req, res) => {
  db.collection('JJ')
    .find({})
    .toArray()
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

router.post('/', (req, res) => {
  db.collection('JJ').insertOne(
    { title: req.body.title, author: req.body.author }
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

router.put('/:user_id', (req, res) => {
  db.collection('JJ').insertOne(
    { title: req.body.title, author: req.body.author }
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

router.get('/:user_id', (req, res) => {
  db.collection('JJ')
    .findOne({})
    .toArray()
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

module.exports = router;
