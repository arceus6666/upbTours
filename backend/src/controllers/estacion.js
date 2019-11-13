const Estacion = require('../models/estacion');

const add = async (req, res) => {
  const { nombre, encargado } = req.body;
  const estacion = new Estacion({
    id: null,
    nombre: nombre,
    encargado: encargado,
    ocupado: false
  });
  await Estacion.find({}, (err, estaciones) => {
    if (err) return res.status(502).send({ msg: err, ok: false, data: null });
    if (!estaciones || estaciones.length === 0) {
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

const update = async (req, res) => {
  const { nombre, encargado, ocupado } = req.body;
  await Estacion.findOne({ id: req.params.id }, (err, estacion) => {
    if (err) return res.status(502).send({ msg: err, ok: false, data: null });
    if (!estacion) return res.status(200).send({ msg: 'Stage not found', ok: false, data: null });
    estacion.nombre = nombre;
    estacion.encargado = encargado;
    estacion.ocupado = ocupado;
    estacion.save().then(data => {
      res.status(201).send({ msg: 'Stage updated', ok: true, data });
    }, err => {
      res.status(502).send({ msg: err, ok: false, data: null });
    });
  });
}

const getAll = (req, res) => {
  Estacion.find({}, (err, data) => {
    if (err) return res.status(502).send({ msg: err, ok: false, data: null });
    if (!data || data.length === 0) return res.status(200).send({ msg: 'No stages', ok: true, data: [] });
    res.status(200).send({ msg: 'Data', ok: true, data });
  });
}

const getOne = (req, res) => {
  Estacion.findOne({ id: req.params.id }, (err, data) => {
    if (err) return res.status(502).send({ msg: err, ok: false, data: null });
    if (!data) return res.status(404).send({ msg: 'Stage not found', ok: false, data: null });
    res.status(200).send({ msg: 'Data', ok: true, data });
  });
}

const remove = (req, res) => {
  Estacion.findOneAndDelete({ id: req.params.id }, (err, data) => {
    if (err) return res.status(502).send({ msg: err, ok: false, data: null });
    if (!data) return res.status(404).send({ msg: 'Stage not found', ok: false, data: null });
    res.status(200).send({ msg: 'Deleted', ok: true, data });
  });
}

module.exports = {
  add,
  update,
  remove,
  getAll,
  getOne
}
