const express = require('express');
const router = express.Router();
const fileUpload = require('../controllers/file.controller');

router.post('/', fileUpload.uploadFiles);
module.exports = router;