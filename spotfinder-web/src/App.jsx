import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { CURATED_SPOTS } from './data/curatedSpots';
import { loadUserSpots, saveUserSpots, loadFavorites, saveFavorites } from './data/spotStore';
import Feed from './pages/Feed';
import Map from './pages/Map';
import Add from './pages/Add';
import Saved from './pages/Saved';
import SpotDetail from './pages/SpotDetail';

export default function App() {
  const [userSpots, setUserSpots] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUserSpots(loadUserSpots());
    setFavoriteIds(loadFavorites());
    setReady(true);
  }, []);

  const allSpots = [...CURATED_SPOTS, ...userSpots];

  const addSpot = useCallback((spot) => {
    const id = `user-${Date.now()}`;
    const newSpot = { ...spot, id };
    const next = [newSpot, ...userSpots];
    setUserSpots(next);
    saveUserSpots(next);
    navigate('/');
  }, [userSpots, navigate]);

  const updateSpot = useCallback((spotId, updates) => {
    const spot = userSpots.find((s) => s.id === spotId);
    if (!spot) return;
    const updated = { ...spot, ...updates };
    const next = userSpots.map((s) => (s.id === spotId ? updated : s));
    setUserSpots(next);
    saveUserSpots(next);
  }, [userSpots]);

  const toggleFavorite = useCallback((spotId) => {
    const next = favoriteIds.includes(spotId)
      ? favoriteIds.filter((id) => id !== spotId)
      : [...favoriteIds, spotId];
    setFavoriteIds(next);
    saveFavorites(next);
  }, [favoriteIds]);

  const getSpotById = (id) => allSpots.find((s) => s.id === id);
  const isUserSpot = (spotId) => userSpots.some((s) => s.id === spotId);
  const isFavorite = (spotId) => favoriteIds.includes(spotId);

  if (!ready) return <div style={{ padding: 20, textAlign: 'center' }}>Loading…</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<Feed allSpots={allSpots} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} />} />
        <Route path="/map" element={<Map allSpots={allSpots} />} />
        <Route path="/add" element={<Add onAdd={addSpot} />} />
        <Route path="/saved" element={<Saved allSpots={allSpots} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} />} />
        <Route path="/spot/:id" element={<SpotDetail getSpotById={getSpotById} isUserSpot={isUserSpot} isFavorite={isFavorite} toggleFavorite={toggleFavorite} updateSpot={updateSpot} />} />
      </Routes>
      <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '12px 0', background: '#0f0f12', borderTop: '1px solid rgba(255,255,255,0.08)', position: 'sticky', bottom: 0 }}>
        <Link to="/" style={{ color: '#94a3b8' }}>For You</Link>
        <Link to="/map" style={{ color: '#94a3b8' }}>Map</Link>
        <Link to="/add" style={{ color: '#34d399' }}>Add</Link>
        <Link to="/saved" style={{ color: '#94a3b8' }}>Saved</Link>
      </nav>
    </div>
  );
}
