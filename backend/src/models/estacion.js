const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estacionSchema = new Schema({
  id: {
    type: String,
    default: null
  },
  nombre: String,
  encargado: {
    type: String,
    default: '---'
  },
  estado: {
    type: String,
    default: 'previsto'
  },
  codigo: String
});

const Estacion = mongoose.model('Estacion', estacionSchema);

module.exports = Estacion;
