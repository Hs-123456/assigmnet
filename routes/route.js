const express = require('express');
const router = express.Router();
const employee = require('../controllers/employe')
router.use('/emplyee',employee)
module.exports = router;
