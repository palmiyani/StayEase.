const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  propertyId: { type: String, required: true },
  propertyTitle: { type: String, required: true },
  propertyLocation: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true, min: 1 },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  specialRequests: { type: String },
  totalAmount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);


