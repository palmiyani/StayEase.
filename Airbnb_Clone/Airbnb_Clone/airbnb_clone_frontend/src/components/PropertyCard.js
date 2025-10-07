import React from 'react';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const handleImageError = (e) => {
    // Fallback to placeholder if image fails to load
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  

  return (
    <div className="property-card">
      <div className="property-image-container">
        <img 
          src={property.image} 
          alt={property.title}
          className="property-image"
          onError={handleImageError}
        />
        <div className="property-image-fallback">
          {property.imageText || 'Property Image'}
        </div>
      </div>
      <div className="property-info">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-location">{property.location}</p>
        <p className="property-price">${property.price}/night</p>
      </div>
      <div className="property-actions">
        <button
          type="button"
          className="btn btn-primary book-button"
          onClick={() => navigate(`/book/${property.id}`, { state: { property } })}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;