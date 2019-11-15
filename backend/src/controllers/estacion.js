const Estacion = require('../models/estacion');

async function add(req, res) {
  const { nombre, encargado } = req.body;
  const estacion = new Estacion({
    id: null,
    nombre: nombre,
    encargado: encargado,
    ocupado: false
  });
  await Estacion.find({}, function (err, estaciones) {
    if (err) {
      res.status(502).send({ msg: err, ok: false, data: null });
    } else if (!estaciones || estaciones.length === 0) {
      estacion.id = 1;
      estacion.save().then(data => {
        res.status(201).send({ msg: 'Created', ok: true, data });
      }, err => {
        res.status(502).send({ msg: err, ok: false, data: null });
      });
    } else {
      estacion.id = estaciones[estaciones.length - 1].id + 1;
      estacion.save().then(data => {
        res.status(201).send({ msg: 'Created', ok: true, data });
      }, err => {
        res.status(502).send({ msg: err, ok: false, data: null });
      });
    }
  });
}

async function update(req, res) {
  const { nombre, encargado, ocupado } = req.body;
  await Estacion.findOne({ id: req.params.id }, function (err, estacion) {
    if (err) {
      res.status(502).send({ msg: err, ok: false, data: null });
    } else if (!estacion) {
      res.status(200).send({ msg: 'Stage not found', ok: false, data: null });
    } else {
      estacion.nombre = nombre;
      estacion.encargado = encargado;
      estacion.ocupado = ocupado;
      estacion.save().then(data => {
        res.status(201).send({ msg: 'Stage updated', ok: true, data });
      }, err => {
        res.status(502).send({ msg: err, ok: false, data: null });
      });
    }
  });
}

async function getAll(req, res) {
  Estacion.find({}, function (err, data) {
    if (err) {
      res.status(502).send({ msg: err, ok: false, data: null });
    } else if (!data || data.length === 0) {
      res.status(200).send({ msg: 'No stages', ok: true, data: [] });
    } else {
      res.status(200).send({ msg: 'Data', ok: true, data });
    }
  });
}

async function getOne(req, res) {
  Estacion.findOne({ id: req.params.id }, function (err, data) {
    if (err) {
      res.status(502).send({ msg: err, ok: false, data: null });
    } else if (!data) {
      res.status(404).send({ msg: 'Stage not found', ok: false, data: null });
    } else {
      res.status(200).send({ msg: 'Data', ok: true, data });
    }
  });
}

async function remove(req, res) {
  Estacion.findOneAndDelete({ id: req.params.id }, function (err, data) {
    if (err) {
      res.status(502).send({ msg: err, ok: false, data: null });
    } else if (!data) {
      res.status(404).send({ msg: 'Stage not found', ok: false, data: null });
    } else {
      res.status(200).send({ msg: 'Deleted', ok: true, data });
    }
  });
}

module.exports = {
  add,
  update,
  remove,
  getAll,
  getOne
}
