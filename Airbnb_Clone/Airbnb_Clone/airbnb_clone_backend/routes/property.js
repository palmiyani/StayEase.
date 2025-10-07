const express = require('express');
const router = express.Router();

// Property routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all properties endpoint' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create property endpoint' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get property with id: ${req.params.id}` });
});

module.exports = router;