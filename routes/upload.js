var express = require('express');
var router = express.Router();

app.get('/upload', (req, res) => {
	res.render('upload');
});

module.exports = router;