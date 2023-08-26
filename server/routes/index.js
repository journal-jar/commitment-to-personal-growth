const router = require('express').Router();
const apiRoutes = require('./api');
const entryRoutes = require('./entryRoutes');
const userRoutes = require('./userRoutes');

router.use('/api', apiRoutes);
router.use('/entry', entryRoutes);
router.use('/user', userRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;
