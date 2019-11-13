const express = require('express');
// const path = require('path');
// const fs = require('fs');
const ctrl = require('../controllers/estacion');

const router = express.Router();
// const dir = path.join(__dirname, '../data/estaciones.json');

// router.get('/', async (req, res) => {
//   await fs.readFile(dir, 'utf8', (err, stages) => {
//     if (err) {
//       // console.log("File read failed:", err)
//       return res.status(500).json({ ok: false, msg: 'File read failed', data: err });
//     }
//     return res.status(200).json({ ok: true, msg: '', data: JSON.parse(stages) });
//   });
// });
router.get('/', ctrl.getAll);

// router.get('/:id', async (req, res) => {
//   const id = parseInt(req.params.id);
//   await fs.readFile(dir, 'utf8', (err, stages) => {
//     if (err) return res.status(500).json({ ok: false, msg: 'File read failed', data: err });
//     const d = JSON.parse(stages);
//     const stage = d.find(s => s.id === id);
//     if (!stage) return res.status(404).json({ ok: false, msg: 'Not Found', data: [] });
//     return res.status(200).json({ ok: true, msg: 'Found', data: stage });
//   });
// });
router.get('/:id', ctrl.getOne);

// router.post('/', async (req, res) => {
//   const { nombre, encargado } = req.body;
//   await fs.readFile(dir, 'utf8', async (err, data) => {
//     if (err) return res.status(500).json({ ok: false, msg: 'File read failed', data: err });
//     const stages = await JSON.parse(data);
//     const id = stages[stages.length - 1] + 1;
//     const stage = await stages.find(s => s.nombre === nombre);
//     if (stage) return res.status(409).json({ ok: false, msg: 'Stage already exists', data: stage });
//     await stages.push({ nombre, encargado, id, ocupado: false });
//     await fs.writeFile(dir, JSON.stringify(stages, null, 2), err => {
//       if (err) return res.status(500).json({ ok: false, msg: 'File writing failed', data: err });
//       return res.status(201).json({ ok: true, msg: 'Created', data: { nombre, encargado, id, ocupado: false } });
//     });
//   });
// });
router.post('/', ctrl.add);

// router.put('/:id', async (req, res) => {
//   const id = parseInt(req.params.id);
//   const { nombre, encargado, ocupado } = req.body;
//   await fs.readFile(dir, 'utf8', async (err, data) => {
//     if (err) return res.status(500).json({ ok: false, msg: 'File read failed', data: err });
//     const stages = await JSON.parse(data);
//     const index = await stages.findIndex(stage => stage.id === id);
//     if (index < 0) return res.status(404).json({ ok: false, msg: 'Not Found', data: [] });
//     stages[index] = { id, nombre, encargado, ocupado };
//     await fs.writeFile(dir, JSON.stringify(stages, null, 2), err => {
//       if (err) return res.status(500).json({ ok: false, msg: 'File writing failed', data: err });
//       return res.status(202).json({ ok: true, msg: 'Modified', data: stages[index] });
//     });
//   });
// });
router.put('/:id', ctrl.update);

// router.delete('/:id', async (req, res) => {
//   const id = parseInt(req.params.id);
//   await fs.readFile(dir, 'utf8', async (err, data) => {
//     if (err) return res.status(500).json({ ok: false, msg: 'File read failed', data: err });
//     const stages = await JSON.parse(data);
//     const index = await stages.findIndex(stage => stage.id === id);
//     if (index < 0) return res.status(404).json({ ok: false, msg: 'Not Found', data: [] });
//     await stages.splice(index, 1);
//     await fs.writeFile(dir, JSON.stringify(stages, null, 2), err => {
//       if (err) return res.status(500).json({ ok: false, msg: 'File writing failed', data: err });
//       return res.status(200).json({ ok: true, msg: 'Deleted', data: [] });
//     });
//   });
// });
router.delete('/:id', ctrl.remove);

module.exports = router;
