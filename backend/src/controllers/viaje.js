const Viaje = require('../models/viaje');
const Estacion = require('../models/estacion');

async function add(req, res) {
  const { encargado, estaciones } = req.body;
  const viaje = new Viaje({
    id: null,
    encargado: encargado,
    estaciones: estaciones
  });
  await Viaje.find({}, (err, viajes) => {
    if (err) return res.status(502).send({ msg: err, ok: false, data: null });
    if (!viajes || viajes.length === 0) {
      viaje.id = 1;
      viaje.save().then(data => {
        res.status(201).send({ msg: 'Created', ok: true, data });
      }, err => {
        res.status(502).send({ msg: err, ok: false, data: null });
      });
    } else {
      viaje.id = viajes[viajes.length - 1].id + 1;
      viaje.save().then(data => {
        res.status(201).send({ msg: 'Created', ok: true, data });
      }, err => {
        res.status(502).send({ msg: err, ok: false, data: null });
      });
    }
  });
}

async function update(req, res) {
  const { encargado, estaciones } = req.body;
  await Viaje.findOne({ id: req.params.id }, (err, estacion) => {
    if (err) return res.status(502).send({ msg: err, ok: false, data: null });
    if (!estacion) return res.status(200).send({ msg: 'Trip not found', ok: false, data: null });
    estacion.encargado = encargado;
    estacion.estaciones = estaciones;
    estacion.save().then(data => {
      res.status(201).send({ msg: 'Trip updated', ok: true, data });
    }, err => {
      res.status(502).send({ msg: err, ok: false, data: null });
    });
  });
}

async function getAll(req, res) {
  await Viaje.find({}, async (err, data) => {
    if (err) return res.status(502).send({ msg: err, ok: false, data: null });
    if (!data || data.length === 0) return res.status(200).send({ msg: 'No trips', ok: true, data: [] });
    await Estacion.find({}, async (err, data2) => {
      if (err) return res.status(502).send({ msg: err, ok: false, data: null });
      if (!data2) return res.status(404).send({ msg: 'Trip not found', ok: false, data: null });
      for (let v in data) {
        const estaciones = await data2.filter(e => data[v].estaciones.includes(e.id));
        data[v].estaciones = await estaciones;
      }
    });
    res.status(200).send({ msg: 'Obtained', ok: true, data });
  });
}

async function getOne(req, res) {
  await Viaje.findOne({ id: req.params.id }, async (err, data) => {
    if (err) return res.status(502).send({ msg: err, ok: false, data: null });
    if (!data) return res.status(404).send({ msg: 'Trip not found', ok: false, data: null });
    Estacion.find({}, async (err, data2) => {
      if (err) return res.status(502).send({ msg: err, ok: false, data: null });
      if (!data2) return res.status(404).send({ msg: 'Trip not found', ok: false, data: null });
      const estaciones = await data2.filter(e => data.estaciones.includes(e.id));
      data.estaciones = estaciones;
      res.status(200).send({ msg: 'Obtained', ok: true, data });
    });
  });
}

async function remove(req, res) {
  await Viaje.findOneAndDelete({ id: req.params.id }, (err, data) => {
    if (err) return res.status(502).send({ msg: err, ok: false, data: null });
    if (!data) return res.status(404).send({ msg: 'Trip not found', ok: false, data: null });
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
