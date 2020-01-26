const Tour = require('../models/tour');

async function add(req, res) {
  // console.log('Adding\n', req.body);
  const { id, nombre, estaciones, encargados, estado } = req.body;
  const tour = new Tour({
    id: id,
    nombre: nombre,
    estaciones: estaciones,
    encargados: encargados,
    estado: estado
  });
  tour.save().then(data => {
    res.send({ msg: 'Tour created', ok: true, data });
  }, err => {
    res.send({ msg: err, ok: false, data: null });
  });
}

async function update(req, res) {
  // console.log('update');
  const { nombre, estaciones, encargados, estado } = req.body;
  await Tour.findOne({ id: req.params.id }, function (err, tour) {
    if (err) {
      res.send({ msg: err, ok: false, data: null });
    } else if (!tour) {
      res.send({ msg: 'Tour not found', ok: false, data: null });
    } else {
      tour.nombre = nombre;
      tour.estaciones = estaciones;
      tour.encargados = encargados;
      tour.estado = estado;
      tour.save().then(data => {
        res.send({ msg: 'Tour updated', ok: true, data });
      }, err => {
        res.send({ msg: err, ok: false, data: null });
      });
    }
  });
}

async function getAll(req, res) {
  // console.log('get all');
  await Tour.find({}, async function (err, data) {
    if (err) {
      res.send({ msg: err, ok: false, data: null });
    } else if (!data || data.length === 0) {
      res.send({ msg: 'No tours found', ok: true, data: [] });
    } else {
      res.send({ msg: 'Tours obtained', ok: true, data });
    }
  });
}

async function getOne(req, res) {
  // console.log('get one');
  await Tour.findOne({ id: req.params.id }, async function (err, data) {
    if (err) {
      res.send({ msg: err, ok: false, data: null });
    } else if (!data) {
      res.send({ msg: 'Tour not found', ok: false, data: null });
    } else {
      res.send({ msg: 'Tour obtained', ok: true, data });
    }
  });
}

async function remove(req, res) {
  // console.log('remove');
  await Tour.findOneAndDelete({ id: req.params.id }, function (err, data) {
    if (err) {
      res.send({ msg: err, ok: false, data: null });
    } else if (!data) {
      res.send({ msg: 'Tour not found', ok: false, data: null });
    } else {
      res.send({ msg: 'Tour deleted', ok: true, data });
    }
  });
}

function test(req, res) {
  console.log('test post')
  res.send({})
}

module.exports = {
  add,
  update,
  remove,
  getAll,
  getOne,
  test
}
