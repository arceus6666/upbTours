const Usuario = require('../models/usuario')

function add(req, res) {
  const usuario = new Usuario({
    codigo: req.body.codigo,
    password: req.body.password,
    esAdmin: req.body.esAdmin || false
  });

  usuario.save().then(usuario => {
    res.status(201).send({ msg: 'Created', ok: true, data: usuario });
  }, err => {
    res.status(502).send({ msg: err, ok: false, data: null });
  });
}

function login(req, res) {
  const { codigo, password } = req.body;
  if (typeof codigo === 'undefined' || typeof password === 'undefined') {
    res.status(400).send({ msg: 'Error', ok: false, data: null });
  } else {
    Usuario.findOne({ codigo: codigo }, function (err, usuario) {
      if (err) {
        res.status(502).send({ msg: err, ok: false, data: null });
      } else if (!usuario) {
        res.status(204).send({ msg: 'User not found', ok: false });
      } else if (usuario.password !== password) {
        res.status(401).send({ msg: 'Wrong password', ok: false, data: null });
      } else {
        res.status(202).send({ msg: 'Obtained', ok: true, data: { esAdmin: usuario.esAdmin } });
      }
    });
  }
}

function update(req, res) {
  const { codigo, password, esAdmin } = req.body;
  Usuario.findOne({ codigo: codigo }, function (err, usuario) {
    if (err) {
      res.status(502).send({ msg: err, ok: false, data: null });
    } else if (!usuario) {
      res.status(204).send({ msg: 'User not found', ok: false, data: null });
    } else {
      usuario.password = password;
      usuario.esAdmin = esAdmin;
      usuario.save().then(usuario => {
        res.status(202).send({ msg: 'Updated', ok: true, data: usuario });
      }, err => {
        res.status(502).send({ msg: err, ok: false, data: null });
      });
    }
  });
}

function getAll(req, res) {
  Usuario.find({}, function (err, usuarios) {
    if (err) {
      res.status(502).send({ msg: err, ok: false });
    } else if (!usuarios || usuarios.length === 0) {
      res.status(204).send({ msg: 'No users', ok: false });
    } else {
      res.status(200).send({ msg: 'Obtained', ok: true, data: usuarios });
    }
  });
}

function remove(req, res) {
  Usuario.findOneAndDelete({ codigo: req.params.id }, function (err, data) {
    if (err) {
      res.status(502).send({ msg: err, ok: false, data: null });
    } else if (!data) {
      res.status(404).send({ msg: 'User not found', ok: false, data: null });
    } else {
      res.status(200).send({ msg: 'Deleted', ok: true, data });
    }
  });
}



module.exports = {
  add,
  login,
  update,
  getAll,
  remove
}
