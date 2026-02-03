import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// Fix default marker icon in Vite (paths break otherwise)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const center = [37.8021, -122.4488];

function FitBounds({ spots }) {
  const map = useMap();
  useEffect(() => {
    if (!spots.length) return;
    const bounds = L.latLngBounds(spots.map((s) => [s.latitude, s.longitude]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [map, spots]);
  return null;
}

export default function Map({ allSpots }) {
  return (
    <div style={{ flex: 1, minHeight: 'calc(100vh - 56px)', position: 'relative' }}>
      <MapContainer center={center} zoom={4} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FitBounds spots={allSpots} />
        {allSpots.map((spot) => (
          <Marker key={spot.id} position={[spot.latitude, spot.longitude]}>
            <Popup>
              <Link to={`/spot/${spot.id}`} style={{ color: '#34d399', fontWeight: 600 }}>{spot.name}</Link>
              <br />
              <small style={{ color: '#64748b' }}>{spot.bestTime}</small>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
