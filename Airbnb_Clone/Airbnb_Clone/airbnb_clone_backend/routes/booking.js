const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Create a booking
router.post('/', async (req, res) => {
  try {
    const {
      propertyId,
      propertyTitle,
      propertyLocation,
      pricePerNight,
      checkIn,
      checkOut,
      guests,
      name,
      email,
      phone,
      specialRequests,
      totalAmount
    } = req.body;

    if (!propertyId || !propertyTitle || !propertyLocation || !pricePerNight || !checkIn || !checkOut || !guests || !name || !email || !totalAmount) {
      return res.status(400).json({ message: 'Missing required booking fields' });
    }

    const booking = await Booking.create({
      propertyId,
      propertyTitle,
      propertyLocation,
      pricePerNight,
      checkIn,
      checkOut,
      guests,
      name,
      email,
      phone,
      specialRequests,
      totalAmount
    });

    res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    console.error('Create booking error:', err);
    res.status(500).json({ message: 'Server error creating booking' });
  }
});

module.exports = router;


