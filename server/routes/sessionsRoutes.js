const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('sessionRoutes.js get /___________', req.session);
    res.send(req.session);
  });

module.exports = router