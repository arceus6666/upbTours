const Tour = require('../models/tour');
const Viaje = require('../models/viaje');
const Estacion = require('../models/estacion');

async function add(req, res) {
  const { nombre, viajes } = req.body;
  const tour = new Tour({
    id: null,
    nombre: nombre,
    viajes: viajes,
    estado: true
  });
  await Tour.find({}, function (err, tours) {
    if (err) {
      res.status(502).send({ msg: err, ok: false, data: null });
    } else if (!tours || tours.length === 0) {
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

async function update(req, res) {
  const { nombre, viajes, estado } = req.body;
  await Tour.findOne({ id: req.params.id }, function (err, tour) {
    if (err) {
      res.status(502).send({ msg: err, ok: false, data: null });
    } else if (!tour) {
      res.status(200).send({ msg: 'Trip not found', ok: false, data: null });
    } else {
      tour.nombre = nombre;
      tour.viajes = viajes;
      tour.estado = estado;
      tour.save().then(data => {
        res.status(201).send({ msg: 'Trip updated', ok: true, data });
      }, err => {
        res.status(502).send({ msg: err, ok: false, data: null });
      });
    }
  });
}

async function getAll(req, res) {
  await Tour.find({}, async function (err, data) {
    if (err) {
      res.status(502).send({ msg: err, ok: false, data: null });
    } else if (!data || data.length === 0) {
      res.status(200).send({ msg: 'No trips', ok: true, data: [] });
    } else {
      for (let t in data) {
        const viajes = await data[t].viajes;
        for (let v in viajes) {
          await Viaje.findOne({ id: viajes[v] }, (err, data2) => {
            viajes[v] = data2;
          });
        }
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
    }
  });
}

async function getOne(req, res) {
  await Tour.findOne({ id: req.params.id }, async function (err, data) {
    if (err) {
      res.status(502).send({ msg: err, ok: false, data: null });
    } else if (!data) {
      res.status(404).send({ msg: 'Tour not found', ok: false, data: null });
    } else {
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
    }
  });
}

async function remove(req, res) {
  await Tour.findOneAndDelete({ id: req.params.id }, function (err, data) {
    if (err) {
      res.status(502).send({ msg: err, ok: false, data: null });
    } else if (!data) {
      res.status(404).send({ msg: 'Trip not found', ok: false, data: null });
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
