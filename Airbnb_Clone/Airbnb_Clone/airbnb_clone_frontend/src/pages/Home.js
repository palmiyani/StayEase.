import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';

// Sample property data with real images (moved outside component)
const allProperties = [
  {
    id: 1,
    title: 'Beautiful Beach House',
    location: 'Miami, Florida',
    price: 150,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    imageText: 'Beach House'
  },
  {
    id: 2,
    title: 'Modern City Apartment',
    location: 'New York, NY',
    price: 200,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    imageText: 'City Apartment'
  },
  {
    id: 3,
    title: 'Cozy Mountain Cabin',
    location: 'Denver, Colorado',
    price: 120,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    imageText: 'Mountain Cabin'
  },
  {
    id: 4,
    title: 'Luxury Villa',
    location: 'Los Angeles, CA',
    price: 300,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    imageText: 'Luxury Villa'
  },
  {
    id: 5,
    title: 'Historic Townhouse',
    location: 'Boston, MA',
    price: 180,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    imageText: 'Historic House'
  },
  {
    id: 6,
    title: 'Lakefront Cottage',
    location: 'Seattle, WA',
    price: 140,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    imageText: 'Lake Cottage'
  }
];

const Home = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(allProperties);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchLocation.trim()) {
      // If search is empty, show all properties
      setFilteredProperties(allProperties);
    } else {
      // Filter properties based on location search
      const filtered = allProperties.filter(property =>
        property.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
        property.title.toLowerCase().includes(searchLocation.toLowerCase())
      );
      setFilteredProperties(filtered);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchLocation(value);
    
    // Real-time search as user types
    if (!value.trim()) {
      setFilteredProperties(allProperties);
    } else {
      const filtered = allProperties.filter(property =>
        property.location.toLowerCase().includes(value.toLowerCase()) ||
        property.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProperties(filtered);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Find your next adventure</h1>
          <p>Discover unique places to stay from local hosts in 191+ countries</p>
          
          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={searchLocation}
              onChange={handleSearchChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      {/* Properties Section */}
      <section className="properties-section">
        <div className="container">
          <h2 className="section-title">
            {searchLocation ? `Results for "${searchLocation}"` : 'Explore Amazing Places'}
          </h2>
          {filteredProperties.length > 0 ? (
            <div className="properties-grid">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No properties found</h3>
              <p>Try searching for a different location or clear your search to see all properties.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;