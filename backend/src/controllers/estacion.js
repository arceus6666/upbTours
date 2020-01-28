const Estacion = require('../models/estacion');

async function add(req, res) {
  const { nombre, encargado, codigo } = req.body;
  const estacion = new Estacion({
    nombre: nombre,
    encargado: encargado || '',
    codigo: codigo
  });

  await Estacion.find({}, function (err, estaciones) {
    if (err) {
      res.send({ msg: err, ok: false, data: null });
    } else {
      estacion.save().then(function (data) {
        res.send({ msg: 'Created', ok: true, data });
      }, function (err) {
        res.send({ msg: err, ok: false, data: null });
      });
    }
  });
}

async function update(req, res) {
  const { nombre, encargado, codigo } = req.body;
  await Estacion.findOne({ codigo: req.params.codigo }, function (err, estacion) {
    if (err) {
      res.send({ msg: err, ok: false, data: null });
    } else if (!estacion) {
      res.send({ msg: 'Stage not found', ok: false, data: null });
    } else {
      estacion.nombre = nombre;
      estacion.encargado = encargado;
      estacion.codigo = codigo;
      estacion.save().then(function (data) {
        res.send({ msg: 'Stage updated', ok: true, data });
      }, function (err)  {
        res.send({ msg: err, ok: false, data: null });
      });
    }
  });
}

async function getAll(req, res) {
  Estacion.find({}, function (err, data) {
    if (err) {
      res.send({ msg: err, ok: false, data: null });
    } else if (!data || data.length === 0) {
      res.send({ msg: 'No stages', ok: true, data: [] });
    } else {
      res.send({ msg: 'Data', ok: true, data });
    }
  });
}

async function getOne(req, res) {
  Estacion.findOne({ codigo: req.params.codigo }, function (err, data) {
    if (err) {
      res.send({ msg: err, ok: false, data: null });
    } else if (!data) {
      res.send({ msg: 'Stage not found', ok: false, data: null });
    } else {
      res.send({ msg: 'Stage obtained', ok: true, data });
    }
  });
}

async function remove(req, res) {
  Estacion.findOneAndDelete({ codigo: req.params.codigo }, function (err, data) {
    if (err) {
      res.send({ msg: err, ok: false, data: null });
    } else if (!data) {
      res.send({ msg: 'Stage not found', ok: false, data: null });
    } else {
      res.send({ msg: 'Deleted', ok: true, data });
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
