const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
  codigo: {
    type: Number,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true
  }
});

var Usuario = mongoose.model('Usuario', userSchema);

module.exports = Usuario;
