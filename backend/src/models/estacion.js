const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estacionSchema = new Schema({
  id: Number,
  nombre: String,
  encargado: String,
  ocupado: Boolean
});

const Estacion = mongoose.model('Estacion', estacionSchema);

module.exports = Estacion;
