const router = require('express').Router();
const { mongoose, model } = require('../config/mongoose');
const fs = require('fs')
const multer = require('multer');

router.use(
	multer({
		dest: 'uploads/',
		limits: {
			fileSize: 1024*1024*16-1
		}
	}).single('uploadedFile'));

router.post('/', (req, res) => {
	let file = req.file;
	console.log(req.file);
	if(file.truncated) {
		next(new Error('용량 초과'));
		return;
	}
	let originalName = file.originalname;
	let size = file.size;
	let path = __dirname + '\\..\\uploads\\' + file.filename;
	console.log(path);
	fs.open(path, 'r', (err, fd) => {
		let buf = new Buffer(size);
		fs.read(fd, buf, 0, buf.length, null, (err, bytes, buffer) => {
			let obj = {
				'name': file.filename,
				'originalName': originalName,
				'content': buffer
			};
			let data = new model(obj);
			data.save((err) => {
				fs.unlink(path, () => {});
				res.redirect('/');
			})
		})
	});
});

module.exports = router;