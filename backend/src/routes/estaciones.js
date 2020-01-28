const express = require('express');
const ctrl = require('../controllers/estacion');

const router = express.Router();

router.get('/', ctrl.getAll);
router.get('/:codigo', ctrl.getOne);
router.post('/', ctrl.add);
router.put('/:codigo', ctrl.update);
router.delete('/:codigo', ctrl.remove);

module.exports = router;
