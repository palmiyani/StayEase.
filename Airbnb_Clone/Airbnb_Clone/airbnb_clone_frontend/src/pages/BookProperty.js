import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { bookingsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state?.property || {};
  const { isAuthenticated, loading } = useAuth();

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  const nights = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    return Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  }, [formData.checkIn, formData.checkOut]);

  const totalAmount = useMemo(() => {
    if (!property?.price || !nights) return 0;
    return nights * property.price * (Number(formData.guests) || 1);
  }, [nights, property, formData.guests]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.checkIn || !formData.checkOut) {
      alert('Please select dates');
      return;
    }
    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      alert('Check-out must be after check-in');
      return;
    }

    try {
      setBookingLoading(true);
      await bookingsAPI.create({
        propertyId: id,
        propertyTitle: property.title,
        propertyLocation: property.location,
        pricePerNight: property.price,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: Number(formData.guests),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        specialRequests: formData.specialRequests,
        totalAmount
      });
      alert('Booking confirmed!');
      navigate('/');
    } catch (err) {
      alert(err?.message || 'Failed to create booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return null;

  if (!isAuthenticated()) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: 420,
          width: '100%'
        }}>
          <h2 style={{ marginBottom: 8 }}>Login required</h2>
          <p style={{ marginBottom: 16 }}>Please login to continue with booking.</p>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
    );
  }

  const backgroundUrl = property?.image || 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d95?q=80&w=1600&auto=format&fit=crop';

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url(${backgroundUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '40px 16px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 960,
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 24
      }}>
        <div style={{
          background: 'white',
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: 4 }}>Book {property?.title || 'Property'}</h2>
          <p style={{ marginTop: 0, color: '#666' }}>{property?.location}</p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label>Check-in</label>
                <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required style={{ width: '100%' }} />
              </div>
              <div>
                <label>Check-out</label>
                <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required style={{ width: '100%' }} />
              </div>
              <div>
                <label>Guests</label>
                <select name="guests" value={formData.guests} onChange={handleChange} style={{ width: '100%' }}>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
              <div>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%' }} />
              </div>
              <div>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <label>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%' }} />
            </div>

            <div style={{ marginTop: 16 }}>
              <label>Special Requests</label>
              <textarea name="specialRequests" rows="3" value={formData.specialRequests} onChange={handleChange} style={{ width: '100%' }} />
            </div>

            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <strong>Total: ${totalAmount}</strong>
              <button type="submit" className="btn btn-primary" disabled={bookingLoading || totalAmount <= 0}>
                {bookingLoading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
        }}>
          <img src={property?.image} alt={property?.title} style={{ width: '100%', borderRadius: 12, marginBottom: 12 }} />
          <div>
            <h3 style={{ marginTop: 0 }}>{property?.title}</h3>
            <p style={{ margin: 0, color: '#666' }}>{property?.location}</p>
            <p style={{ margin: '8px 0 0 0' }}>${property?.price}/night</p>
            {nights > 0 && (
              <p style={{ margin: '8px 0 0 0', color: '#444' }}>
                {nights} night{nights === 1 ? '' : 's'} × {formData.guests} guest{formData.guests === 1 ? '' : 's'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookProperty;


