import React, { useState } from 'react';

const styles = {
  page: { padding: 16, paddingBottom: 80, maxWidth: 480, margin: '0 auto' },
  title: { fontSize: 24, fontWeight: 800, marginBottom: 8, color: '#f5f5f7' },
  subtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 6, display: 'block' },
  input: { width: '100%', padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: '#141418', color: '#f5f5f7', fontSize: 16, marginBottom: 16 },
  btn: { width: '100%', padding: 14, borderRadius: 12, background: 'linear-gradient(135deg, #34d399, #10b981)', color: '#060608', fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', marginTop: 8 },
  footer: { marginTop: 24, fontSize: 12, color: '#64748b', textAlign: 'center' },
};

export default function Add({ onAdd }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState('37.8021');
  const [lng, setLng] = useState('-122.4488');
  const [bestTime, setBestTime] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [photoBy, setPhotoBy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const latitude = parseFloat(lat) || 37.8;
    const longitude = parseFloat(lng) || -122.4;
    onAdd({
      name: name.trim(),
      address: address.trim() || 'Address not set',
      latitude,
      longitude,
      bestTime: bestTime.trim() || 'Not specified',
      score: 0,
      imageUri: imageUri.trim() || 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
      photoBy: photoBy.trim() || 'You',
    });
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Add a photo spot</h1>
      <p style={styles.subtitle}>For photographers & car photographers. Data stays on your device.</p>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Name *</label>
        <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Spot name" required />
        <label style={styles.label}>Address</label>
        <input style={styles.input} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, city" />
        <label style={styles.label}>Latitude</label>
        <input style={styles.input} value={lat} onChange={(e) => setLat(e.target.value)} placeholder="37.8021" />
        <label style={styles.label}>Longitude</label>
        <input style={styles.input} value={lng} onChange={(e) => setLng(e.target.value)} placeholder="-122.4488" />
        <label style={styles.label}>Best time</label>
        <input style={styles.input} value={bestTime} onChange={(e) => setBestTime(e.target.value)} placeholder="e.g. Golden hour" />
        <label style={styles.label}>Image URL</label>
        <input style={styles.input} value={imageUri} onChange={(e) => setImageUri(e.target.value)} placeholder="https://..." />
        <label style={styles.label}>Photo by</label>
        <input style={styles.input} value={photoBy} onChange={(e) => setPhotoBy(e.target.value)} placeholder="You" />
        <button type="submit" style={styles.btn}>Add spot</button>
      </form>
      <p style={styles.footer}>Spots you add are saved on your device. Same approach as PepTalk — no backend.</p>
    </div>
  );
}
