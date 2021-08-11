var router = require('express').Router();
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

router.post('/', upload.single('uploadedFile'), (req, res) => {
	console.log(req.file);
	res.redirect('/');
});

module.exports = router;