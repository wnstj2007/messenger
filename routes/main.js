var express = require('express');
var router = express.Router();

app.get('/', (req, res) => {
	res.render('chatPage');
});

module.exports = router;