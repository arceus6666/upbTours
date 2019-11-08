const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/estaciones', require(path.join(__dirname,'/routes/estaciones')));
app.use('/viajes', require(path.join(__dirname,'/routes/viajes')));
app.use('/tours', require(path.join(__dirname,'/routes/tours')));

app.listen(3000, () => {
  console.log('Escuchando en el puerto 3000.');
});
