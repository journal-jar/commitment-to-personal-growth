const router = require('express').Router();
const aiRoutes = require("./aiRoutes")

router.use('/openai', aiRoutes)

module.exports = router;
