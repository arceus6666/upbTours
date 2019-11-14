const Tour = require('../models/tour');
const Viaje = require('../models/viaje');
const Estacion = require('../models/estacion');

// const viajeCtrl = require('../controllers/viaje');

const add = async (req, res) => {
  const { nombre, viajes } = req.body;
  const tour = new Tour({
    id: null,
    nombre: nombre,
    viajes: viajes,
    estado: true
  });
  await Tour.find({}, (err, tours) => {
    if (err) return res.status(502).send({ msg: err, ok: false, data: null });
    if (!tours || tours.length === 0) {
      tour.id = 1;
      tour.save().then(data => {
        res.status(201).send({ msg: 'Created', ok: true, data });
      }, err => {
        res.status(502).send({ msg: err, ok: false, data: null });
      });
    } else {
      tour.id = tours[tours.length - 1].id + 1;
      tour.save().then(data => {
        res.status(201).send({ msg: 'Created', ok: true, data });
      }, err => {
        res.status(502).send({ msg: err, ok: false, data: null });
      });
    }
  });
}

const update = async (req, res) => {
  const { nombre, viajes, estado } = req.body;
  await Tour.findOne({ id: req.params.id }, (err, tour) => {
    if (err) return res.status(502).send({ msg: err, ok: false, data: null });
    if (!tour) return res.status(200).send({ msg: 'Trip not found', ok: false, data: null });
    tour.nombre = nombre;
    tour.viajes = viajes;
    tour.estado = estado;
    tour.save().then(data => {
      res.status(201).send({ msg: 'Trip updated', ok: true, data });
    }, err => {
      res.status(502).send({ msg: err, ok: false, data: null });
    });
  });
}

const getAll = async (req, res) => {
  await Tour.find({}, async (err, data) => {
    if (err) return res.status(502).send({ msg: err, ok: false, data: null });
    if (!data || data.length === 0) return res.status(200).send({ msg: 'No trips', ok: true, data: [] });
    for (let t in data) {
      const viajes = await data[t].viajes;
      // console.log(viajes)
      for (let v in viajes) {
        await Viaje.findOne({ id: viajes[v] }, (err, data2) => {
          viajes[v] = data2;
        });
      }
      // console.log(viajes)
      for (let v in viajes) {
        const estaciones = await viajes[v].estaciones;
        for (let e in estaciones) {
          await Estacion.findOne({ id: estaciones[e] }, async (err, data3) => {
            estaciones[e] = data3;
          });
        }
        viajes[v].estaciones = await estaciones;
      }
      data[t].viajes = await viajes;
    }
    setTimeout(() => {
      res.status(200).send({ msg: 'Obtained', ok: true, data });
    }, 200)
  });
  // res.status(200).send('ok');
}

const getOne = async (req, res) => {
  await Tour.findOne({ id: req.params.id }, async (err, data) => {
    if (err) return res.status(502).send({ msg: err, ok: false, data: null });
    if (!data) return res.status(404).send({ msg: 'Tour not found', ok: false, data: null });
    await Viaje.find({}, async (err, data2) => {
      if (err) return res.status(502).send({ msg: err, ok: false, data: null });
      if (!data2) return res.status(404).send({ msg: 'Tour not found', ok: false, data: null });
      const viajes = await data2.filter(v => data.viajes.includes(v.id));
      for (let v in viajes) {
        await Estacion.find({}, async (err, data3) => {
          if (err) return res.status(502).send({ msg: err, ok: false, data: null });
          if (!data3) return res.status(404).send({ msg: 'Tour not found', ok: false, data: null });
          const estaciones = await data3.filter(e => viajes[v].estaciones.includes(e.id));
          viajes[v].estaciones = estaciones;
        });
      }
      data.viajes = viajes;
      res.status(200).send({ msg: 'Obtained', ok: true, data });
    });
  });
}

const remove = async (req, res) => {
  await Tour.findOneAndDelete({ id: req.params.id }, (err, data) => {
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
