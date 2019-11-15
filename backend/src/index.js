const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/estaciones', require(path.join(__dirname, './routes/estaciones')));
app.use('/viajes', require(path.join(__dirname, './routes/viajes')));
app.use('/tours', require(path.join(__dirname, './routes/tours')));
app.use('/usuarios', require(path.join(__dirname, './routes/usuarios')));

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const mongouri = process.env.MONGODB_URI || 'mongodb://localhost:27017/upbtours';

mongoose.connect(mongouri, (err, res) => {
  if (err) {
    console.log(`Hubo un error al inicializar: \n\t${err}.`);
  } else {
    console.log('Conexion a Mongo establecida.');
    app.listen(3000, () => {
      console.log('Escuchando en el puerto 3000.');
    });
  }
});
