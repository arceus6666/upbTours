const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/estaciones', require(path.join(__dirname, '/routes/estaciones')));
app.use('/viajes', require(path.join(__dirname, '/routes/viajes')));
app.use('/tours', require(path.join(__dirname, '/routes/tours')));

mongoose.set('useCreateIndex', true);

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/upbtours',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) return console.log(`Hubo un error al inicializar: ${err}.`);
    console.log('Conexion a DB establecida.');
    app.listen(3000, () => {
      console.log('Escuchando en el puerto 3000.');
    });
  }
);
