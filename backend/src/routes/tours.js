const express = require('express');
// const path = require('path');
// const fs = require('fs');
const ctrl = require('../controllers/tour');

const router = express.Router();
// const dir = path.join(__dirname, '../data/tours.json');

// router.get('/', async (req, res) => {
//   await fs.readFile(dir, 'utf8', (err, tours) => {
//     if (err) {
//       return res.status(500).json({ ok: false, msg: 'File read failed', data: err });
//     }
//     return res.status(200).json({ ok: true, msg: '', data: JSON.parse(tours) });
//   });
// });
router.get('/', ctrl.getAll);

// router.get('/:id', async (req, res) => {
//   const id = parseInt(req.params.id);
//   await fs.readFile(dir, 'utf8', (err, tours) => {
//     if (err) {
//       return res.status(500).json({ ok: false, msg: 'File read failed', data: err });
//     }
//     const d = JSON.parse(tours);
//     const tour = d.find(s => s.id === id);
//     if (!tour) return res.status(404).json({ ok: false, msg: 'Not Found', data: [] });
//     return res.status(200).json({ ok: true, msg: 'Found', data: tour });
//   });
// });
router.get('/:id', ctrl.getOne);

// router.post('/', async (req, res) => {
//   const { nombre, viajes } = req.body;
//   await fs.readFile(dir, 'utf8', async (err, data) => {
//     if (err) {
//       return res.status(500).json({ ok: false, msg: 'File read failed', data: err });
//     }
//     const tours = await JSON.parse(data);
//     const id = tours[tours.length - 1].id + 1;
//     const tour = await tours.find(s => s.id === id);
//     if (tour) return res.status(409).json({ ok: false, msg: 'Tour already exists', data: tour });
//     await tours.push({ id, encargado, estacion, estado: true });
//     await fs.writeFile(dir, JSON.stringify(tours, null, 2), err => {
//       if (err) {
//         return res.status(500).json({ ok: false, msg: 'File writing failed', data: err });
//       } else {
//         return res.status(201).json({ ok: true, msg: 'Created', data: { id, nombre, viajes, estado: true } });
//       }
//     });
//   });
// });
router.post('/', ctrl.add);

// router.put('/:id', async (req, res) => {
//   const id = parseInt(req.params.id);
//   const { nombre, viajes, estado } = req.body;
//   await fs.readFile(dir, 'utf8', async (err, data) => {
//     if (err) {
//       return res.status(500).json({ ok: false, msg: 'File read failed', data: err });
//     }
//     const tours = await JSON.parse(data);
//     const index = await tours.findIndex(tour => tour.id === id);
//     if (index < 0) return res.status(404).json({ ok: false, msg: 'Not Found', data: [] });
//     tours[index] = { id, nombre, viajes, estado };
//     await fs.writeFile(dir, JSON.stringify(tours, null, 2), err => {
//       if (err) return res.status(500).json({ ok: false, msg: 'File writing failed', data: err });
//       return res.status(202).json({ ok: true, msg: 'Modified', data: tours[index] });
//     });
//   });
// });
router.put('/:id', ctrl.update);

// router.delete('/:id', async (req, res) => {
//   const id = parseInt(req.params.id);
//   await fs.readFile(dir, 'utf8', async (err, data) => {
//     if (err) {
//       return res.status(500).json({ ok: false, msg: 'File read failed', data: err });
//     }
//     const tours = await JSON.parse(data);
//     const index = await tours.findIndex(tour => tour.id === id);
//     if (index < 0) return res.status(404).json({ ok: false, msg: 'Not Found', data: [] });
//     await tours.splice(index, 1);
//     await fs.writeFile(dir, JSON.stringify(tours, null, 2), err => {
//       if (err) return res.status(500).json({ ok: false, msg: 'File writing failed', data: err });
//       return res.status(200).json({ ok: true, msg: 'Deleted', data: [] });
//     });
//   });
// });
router.delete('/:id', ctrl.remove);

module.exports = router;
