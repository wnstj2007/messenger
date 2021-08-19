const router = require('express').Router();
const { mongoose, model } = require('../config/mongoose');

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    model.findOne({"id": req.params.id}).exec((err, data) => {
        console.log(data);
        res.setHeader("Content-Disposition", "attachment; filename="+encodeURI(data.originalName));
        res.setHeader("Content-Type", "binary/octet-stream");
        res.end(data.content);
    })
});

module.exports = router;