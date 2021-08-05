var express = require('express');
var router = express.Router();
const multer = require('multer');
var db = require('../loaders/mongoose.js')

router.get('/upload', (req, res) => {
	res.render('upload');
});

router.post('/upload', upload.single('uploadedFile'), (req, res) => {
	res.send('업로드 성공!');
});

module.exports = router;