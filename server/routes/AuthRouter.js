const express = require('express');
const router = express.Router();

router.use('/Login', require('../api/auth/Login'));

module.exports = router;
