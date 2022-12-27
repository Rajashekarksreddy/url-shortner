const express = require('express');
const router = express.Router();

const urlController= require("./urlcontroller")


router.post('/url/shorten',urlController.createUrl)
router.get('/:urlCode', urlController.geturl)

module.exports = router;