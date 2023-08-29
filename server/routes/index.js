const router = require('express').Router();
const apiRoutes = require('./api');
const entryRoutes = require('./entryRoutes');
const userRoutes = require('./userRoutes');
const sessionRoutes = require("./sessionsRoutes")

router.use('/api', apiRoutes);
router.use('/entry', entryRoutes);
router.use('/user', userRoutes);
router.use("/session", sessionRoutes)


module.exports = router;
