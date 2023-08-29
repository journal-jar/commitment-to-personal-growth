const router = require('express').Router();
const { getDb } = require("../config/connection.js")
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    try {
        const _db = getDb();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Insert into MongoDB
        const result = await _db.collection('UC').insertOne({
            email: req.body.email,
            password: hashedPassword
        });

        // Session setup
        req.session.loggedIn = true;
        req.session.user_id = result.insertedId.toString();
        req.session.email = req.body.email;
        console.log('userRoutes.js post /___________', req.session);

        res.status(200).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// Login
router.post('/login', async (req, res) => {
    try {
        const _db = getDb();
        
        // Find user in MongoDB by email
        const dbUserData = await _db.collection('UC').findOne({
            email: req.body.email
        });

        if (!dbUserData) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }
        
        // Verify password using bcrypt
        const validPassword = await bcrypt.compare(req.body.password, dbUserData.password);
        
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }
        
        // Session setup
        req.session.loggedIn = true;
        req.session.user_id = dbUserData._id.toString();
        req.session.email = dbUserData.email;
        
        res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// Logout
router.post('/logout', (req, res) => {
    console.log("userRoutes.js /logout_____")
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
