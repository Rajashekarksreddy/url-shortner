const express = require('express');
const router = express.Router();

const urlController= require("./urlcontroller")


router.post('/url/shorten',urlController.createUrl)

module.exports = router;