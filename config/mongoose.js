const config = require('config');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.connect(config.db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

const File = new Schema({
  name: String,
  originalName: String,
  content: Buffer,
});

File.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = { 
  mongoose: mongoose,
  model: mongoose.model("file", File),
};