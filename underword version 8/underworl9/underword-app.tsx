import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UnderwordApp = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showMap, setShowMap] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [reportLocation, setReportLocation] = useState(null);
  const navigate = useNavigate();

  // Force get current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Theme toggle handler
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Location Map component
  const LocationMap = () => {
    const map = useMap();
    
    useEffect(() => {
      if (currentLocation) {
        map.setView([currentLocation.lat, currentLocation.lng], 15);
      }
    }, [currentLocation, map]);

    return null;
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <img src="/api/placeholder/120/120" alt="Underword Logo" className="mx-auto mb-4 rounded-lg" />
          <h1 className="text-2xl font-bold">Underword</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h2 className="text-2xl font-bold">12</h2>
            <p className="text-sm">Activos 📊</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h2 className="text-2xl font-bold">5</h2>
            <p className="text-sm">Áreas 🗺️</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h2 className="text-2xl font-bold">8</h2>
            <p className="text-sm">Resueltos ✅</p>
          </div>
        </div>

        {/* Map */}
        {showMap && currentLocation && (
          <div className="mb-8 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <MapContainer
              center={[currentLocation.lat, currentLocation.lng]}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[currentLocation.lat, currentLocation.lng]} />
              <LocationMap />
            </MapContainer>
          </div>
        )}

        {/* Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            <button 
              onClick={() => navigate('/')}
              className="p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
            >
              🏠 Inicio
            </button>
            <button 
              onClick={() => setShowMap(!showMap)}
              className="p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
            >
              🗺️ Mapa
            </button>
            <button 
              onClick={() => navigate('/report')}
              className="p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
            >
              ⚠️ Alertas
            </button>
            <button 
              onClick={toggleTheme}
              className="p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
            >
              {theme === 'dark' ? '🌙' : '☀️'} Tema
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderwordApp;
