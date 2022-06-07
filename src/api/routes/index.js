const express = require('express')
const router = express.Router()

const ytroute = require('./yt.route')
router.use('/v1', ytroute)
module.exports = router