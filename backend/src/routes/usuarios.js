const express = require('express');
const ctrl = require('../controllers/usuario');

const router = express.Router();

router.post('/login', ctrl.login);
router.post('/add', ctrl.add);
router.put('/', ctrl.update);
router.get('/all', ctrl.getAll);
router.delete('/:id', ctrl.remove);

module.exports = router;
