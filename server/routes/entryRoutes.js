const router = require('express').Router();
const { getDb } = require("../config/connection.js")
const ObjectID = require('mongodb').ObjectID;
const { encrypt, decrypt } = require("./encryption.js")
const uuid = require("uuid/v4")

router.get('/', (req, res) => {
  const _db = getDb();
  _db.collection('JC')
    .find({ frameworkId: req.session.user_id.toString() })
    .toArray()
    .then(results => {
      // Decrypt content property before sending as response
      const decryptedResults = results.map(entry => ({
        ...entry,
        content: decrypt(entry.content)
      }));
      res.json(decryptedResults);
      console.log("This is the result of get from DB: ", decryptedResults);
    })
    .catch(err => {
      if (err) throw err;
    });
});

router.post('/', (req, res) => {
  const _db = getDb();
  console.log("entryRoutes.js Post / req.session______", req.session);

  if (req.session && req.session.user_id) {
    // Encrypt content property before storing in the database
    const encryptedContent = encrypt(req.body.content['content']);
    // Currently, store tags as a single string, since encrypt() unction
    // does not support arrays
    const encryptedTags = encrypt(req.body.content['tags'].join()); 
    const encryptedSummary = encrypt(req.body.content['summary']);

    var collectionItem = {
      uuid: uuid(),
      user_id: req.session.user_id.toString(),
      content: encryptedContent,
      tags: encryptedTags,
      summary: encryptedSummary,
      date_created: Date.now(),
      date_last_modified: Date.now()
    }

    _db.collection('JC').insertOne(collectionItem)
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
