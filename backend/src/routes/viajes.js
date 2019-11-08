const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const dir = path.join(__dirname, '../data/viajes.json');

router.get('/', async (req, res) => {
  await fs.readFile(dir, 'utf8', (err, trips) => {
    if (err) {
      return res.status(500).json({ ok: false, msg: 'File read failed', data: err });
    }
    return res.status(200).json({ ok: true, msg: '', data: JSON.parse(trips) });
  });
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await fs.readFile(dir, 'utf8', (err, trips) => {
    if (err) {
      return res.status(500).json({ ok: false, msg: 'File read failed', data: err });
    }
    const d = JSON.parse(trips);
    const trip = d.find(s => s.id === id);
    if (!trip) return res.status(404).json({ ok: false, msg: 'Not Found', data: [] });
    return res.status(200).json({ ok: true, msg: 'Found', data: trip });
  });
});

router.post('/', async (req, res) => {
  const { id, encargado, estacion } = req.body;
  await fs.readFile(dir, 'utf8', async (err, data) => {
    if (err) {
      return res.status(500).json({ ok: false, msg: 'File read failed', data: err });
    }
    const trips = await JSON.parse(data);
    const trip = await trips.find(s => s.id === id);
    if (trip) return res.status(409).json({ ok: false, msg: 'Trip already exists', data: trip });
    await trips.push({ id, encargado, estacion });
    await fs.writeFile(dir, JSON.stringify(trips, null, 2), err => {
      if (err) {
        return res.status(500).json({ ok: false, msg: 'File writing failed', data: err });
      } else {
        // console.log('Successfully wrote file')
        return res.status(201).json({ ok: true, msg: 'Created', data: { id, encargado, estacion } });
      }
    });
  });
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { encargado, estacion } = req.body;
  await fs.readFile(dir, 'utf8', async (err, data) => {
    if (err) {
      return res.status(500).json({ ok: false, msg: 'File read failed', data: err });
    }
    const trips = await JSON.parse(data);
    const index = await trips.findIndex(trip => trip.id === id);
    if (index < 0) return res.status(404).json({ ok: false, msg: 'Not Found', data: [] });
    trips[index] = { id, encargado, estacion };
    await fs.writeFile(dir, JSON.stringify(trips, null, 2), err => {
      if (err) return res.status(500).json({ ok: false, msg: 'File writing failed', data: err });
      return res.status(202).json({ ok: true, msg: 'Modified', data: trips[index] });
    });
  });
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await fs.readFile(dir, 'utf8', async (err, data) => {
    if (err) {
      return res.status(500).json({ ok: false, msg: 'File read failed', data: err });
    }
    const trips = await JSON.parse(data);
    const index = await trips.findIndex(trip => trip.id === id);
    if (index < 0) return res.status(404).json({ ok: false, msg: 'Not Found', data: [] });
    await trips.splice(index, 1);
    await fs.writeFile(dir, JSON.stringify(trips, null, 2), err => {
      if (err) return res.status(500).json({ ok: false, msg: 'File writing failed', data: err });
      return res.status(200).json({ ok: true, msg: 'Deleted', data: [] });
    });
  });
});

module.exports = router;
