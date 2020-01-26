const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema({
  id: String,
  nombre: String,
  estaciones: [[{
    id: String,
    nombre: String,
    encargado: String,
    estado: String,
    codigo: String
  }]],
  encargados: [String],
  estado: Boolean
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
