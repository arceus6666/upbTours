const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/estaciones', require(path.join(__dirname, './routes/estaciones')));
// app.use('/viajes', require(path.join(__dirname, './routes/viajes')));
app.use('/tours', require(path.join(__dirname, './routes/tours')));
app.use('/usuarios', require(path.join(__dirname, './routes/usuarios')));

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const port = 7876;
// const mongouri = process.env.MONGODB_URI || 'mongodb://mgarciameza14:isc2020@127.0.0.1:27017/mgarciameza14?authSource=mgarciameza14';
const mongouri = process.env.MONGODB_URI || 'mongodb://localhost:27017/upbtours';

mongoose.connect(mongouri, (err, res) => {
  if (err) {
    console.log(`There was an error initializing:\n\t${err}.`);
  } else {
    console.log(`MongoDB connection established.`);
    app.listen(port, () => {
      console.log(`App listening on port: ${port}`);
    });
  }
});
