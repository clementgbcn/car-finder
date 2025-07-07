import React, { useState } from 'react';
import cars from '../data/cars';
import './Credits.css';

interface CreditsProps {
  onClose: () => void;
}

const Credits: React.FC<CreditsProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique attributions
  const attributions = cars
    .filter(car => car.attribution)
    .map(car => ({
      carName: car.fullName,
      attribution: car.attribution || 'Image from Wikimedia Commons',
      author: car.author || 'Unknown',
      license: car.license || 'Unknown',
      source: car.imageSource || car.wikipediaUrl,
      imageUrl: car.imageUrl
    }))
    .filter(attr => 
      searchTerm === '' || 
      attr.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attr.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.carName.localeCompare(b.carName));

  return (
    <div className="credits-overlay">
      <div className="credits-modal">
        <div className="credits-header">
          <h2>Image Credits & Attributions</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="credits-info">
          <p>
            All car images in this game are sourced from Wikipedia and Wikimedia Commons. 
            These images are used under various Creative Commons licenses and public domain dedications.
          </p>
          <p>
            <strong>Total images:</strong> {cars.length} | <strong>With attribution:</strong> {attributions.length}
          </p>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by car name or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="credits-list">
          {attributions.length === 0 ? (
            <div className="no-results">
              {searchTerm ? (
                <p>No attributions found matching "{searchTerm}"</p>
              ) : (
                <>
                  <p>License information is currently being collected for all images.</p>
                  <p>All images are sourced from Wikipedia and Wikimedia Commons under free licenses that allow commercial use.</p>
                </>
              )}
            </div>
          ) : (
            attributions.map((attr, index) => (
              <div key={index} className="credit-item">
                <div className="credit-image">
                  <img 
                    src={attr.imageUrl} 
                    alt={attr.carName}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-car.jpg';
                    }}
                  />
                </div>
                <div className="credit-details">
                  <h4>{attr.carName}</h4>
                  <p className="attribution-text">{attr.attribution}</p>
                  {attr.license !== 'Unknown' && (
                    <div className="license-info">
                      <span className="license-badge">{attr.license}</span>
                    </div>
                  )}
                  {attr.source && (
                    <a 
                      href={attr.source} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="source-link"
                    >
                      View Source →
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="credits-footer">
          <p>
            This game respects Wikipedia's licensing requirements. All images are used in compliance 
            with their respective Creative Commons licenses or public domain status.
          </p>
          <p>
            Learn more about <a href="https://commons.wikimedia.org/wiki/Commons:Licensing" target="_blank" rel="noopener noreferrer">
              Wikimedia Commons licensing
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Credits;