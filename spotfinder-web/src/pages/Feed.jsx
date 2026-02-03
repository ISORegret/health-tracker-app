import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  page: { padding: 16, paddingBottom: 80 },
  title: { fontSize: 24, fontWeight: 800, marginBottom: 16, color: '#f5f5f7' },
  card: { background: '#141418', borderRadius: 16, overflow: 'hidden', marginBottom: 12, border: '1px solid rgba(255,255,255,0.08)' },
  cardImage: { width: '100%', aspectRatio: '16/10', objectFit: 'cover' },
  cardBody: { padding: 14 },
  cardTitle: { fontSize: 17, fontWeight: 700, color: '#f5f5f7', marginBottom: 4 },
  cardMeta: { fontSize: 13, color: '#94a3b8' },
  heart: { position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: 20, padding: 8, cursor: 'pointer', color: '#fff', fontSize: 18 },
};

export default function Feed({ allSpots, favoriteIds, toggleFavorite }) {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>For You</h1>
      {allSpots.map((spot) => (
        <Link key={spot.id} to={`/spot/${spot.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
          <div style={styles.card}>
            <div style={{ position: 'relative' }}>
              <img src={spot.imageUri} alt={spot.name} style={styles.cardImage} />
              <button
                type="button"
                style={styles.heart}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(spot.id); }}
                aria-label={favoriteIds.includes(spot.id) ? 'Unsave' : 'Save'}
              >
                {favoriteIds.includes(spot.id) ? '❤️' : '🤍'}
              </button>
            </div>
            <div style={styles.cardBody}>
              <div style={styles.cardTitle}>{spot.name}</div>
              <div style={styles.cardMeta}>{spot.bestTime} · Score {spot.score}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
