const Usuario = require('../models/usuario')

function add(req, res) {
  const usuario = new Usuario({
    codigo: req.body.codigo,
    password: req.body.password,
    role: req.body.role || 0
  });

  usuario.save().then(function (u) {
    res.send({ msg: 'Created', ok: true, data: u });
  }, function (err) {
    res.send({ msg: err, ok: false, data: null });
  });
}

function login(req, res) {
  const { codigo, password } = req.body;
  if (typeof codigo === 'undefined' || typeof password === 'undefined') {
    res.send({ msg: 'Error', ok: false, data: null });
  } else {
    Usuario.findOne({ codigo: codigo }, function (err, usuario) {
      if (err) {
        res.send({ msg: err, ok: false, data: null });
      } else if (!usuario) {
        res.send({ msg: 'User not found', ok: false });
      } else if (usuario.password !== password) {
        res.send({ msg: 'Wrong password', ok: false, data: null });
      } else {
        res.send({ msg: 'Obtained', ok: true, data: { role: usuario.role } });
      }
    });
  }
}

function update(req, res) {
  const { codigo, password, role } = req.body;
  Usuario.findOne({ codigo: codigo }, function (err, usuario) {
    if (err) {
      res.send({ msg: err, ok: false, data: null });
    } else if (!usuario) {
      res.send({ msg: 'User not found', ok: false, data: null });
    } else {
      usuario.password = password;
      usuario.role = role;
      usuario.save().then(function (usuario) {
        res.send({ msg: 'Updated', ok: true, data: usuario });
      }, function (err) {
        res.send({ msg: err, ok: false, data: null });
      });
    }
  });
}

function getAll(req, res) {
  Usuario.find({}, function (err, usuarios) {
    if (err) {
      res.send({ msg: err, ok: false });
    } else if (!usuarios || usuarios.length === 0) {
      res.send({ msg: 'No users', ok: false });
    } else {
      res.send({ msg: 'Obtained', ok: true, data: usuarios });
    }
  });
}

function remove(req, res) {
  Usuario.findOneAndDelete({ codigo: req.params.id }, function (err, data) {
    if (err) {
      res.send({ msg: err, ok: false, data: null });
    } else if (!data) {
      res.send({ msg: 'User not found', ok: false, data: null });
    } else {
      res.send({ msg: 'Deleted', ok: true, data });
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
