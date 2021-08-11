const config = require('config');
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect(config.db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const File = new Schema({
  name: String,
  originalName: String,
  content: Buffer,
});

module.exports = { 
  mongoose: mongoose,
  model = mongoose.model("chat", File),
};