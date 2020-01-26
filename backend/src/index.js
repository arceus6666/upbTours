const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// app.use('/estaciones', require(path.join(__dirname, './routes/estaciones')));
// app.use('/viajes', require(path.join(__dirname, './routes/viajes')));
app.use('/tours', require(path.join(__dirname, './routes/tours')));
app.use('/usuarios', require(path.join(__dirname, './routes/usuarios')));

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const port = 3000;
const mongouri = process.env.MONGODB_URI || 'mongodb://localhost:27017/upbtours';

function clean(txt) {
  var t = `${txt}`;
  const blank = [
    '',
    ' ',
    '  ',
    '   ',
    '    ',
    '     ',
    '      ',
    '       ',
    '        ',
    '         ',
    '          ',
    '           ',
    '            ',
    '             ',
    '              ',
    '               ',
    '                ',
    '                 ',
    '                  ',
    '                   ',
    '                    ',
    '                     ',
    '                      ',
    '                       ',
    '                        ',
    '                         ',
  ];

  const l = t.length;
  if (l > 25) {
    t = t.slice(0, 22);
    t += '...';
  } else {
    const ll = 25 - l;
    t += blank[ll];
  }
  return t;
}

mongoose.connect(mongouri, (err, res) => {
  if (err) {
    console.log(`There was an error initializing:\n\t${err}.`);
  } else {
    console.log(`+---------------------------------+`);
    console.log(`| MongoDB connection established. |`);
    console.log(`| Name: ${clean(res.name)} |`);
    console.log(`| Host: ${clean(res.host)} |`);
    console.log(`| Port: ${clean(res.port)} |`);
    console.log(`+---------------------------------+\n`);
    app.listen(port, () => {
      console.log(`App listening on port: ${port}`);
    });
  }
});
