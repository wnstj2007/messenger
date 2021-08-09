var express = require('express');
var router = express.Router();
//var multer = require('multer');
//var upload = multer({dest: 'uploads/'})


router.get('/', (req, res) => {
	res.render('chatPage');
});

/*
router.post('/', upload.single('uploadedFile'), (req, res) => {
	console.log(req.file);
});
*/

module.exports = router;