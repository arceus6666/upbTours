const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema({
  id: Number,
  nombre: String,
  viajes: [Number],
  estado: Boolean
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;