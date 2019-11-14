const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viajeSchema = new Schema({
  id: Number,
  encargado: String,
  estaciones: [Number]
});

const Viaje = mongoose.model('Viaje', viajeSchema);

module.exports = Viaje;
