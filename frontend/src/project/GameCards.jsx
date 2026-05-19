import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SPORT_CONFIG = {
  Football:   { color: '#16a34a', bg: '#dcfce7', icon: '⚽' },
  Cricket:    { color: '#2563eb', bg: '#dbeafe', icon: '🏏' },
  Basketball: { color: '#d97706', bg: '#fef3c7', icon: '🏀' },
  Badminton:  { color: '#7c3aed', bg: '#ede9fe', icon: '🏸' },
  Tennis:     { color: '#dc2626', bg: '#fee2e2', icon: '🎾' },
  Volleyball: { color: '#0891b2', bg: '#cffafe', icon: '🏐' },
  Other:      { color: '#6b7280', bg: '#f3f4f6', icon: '🎮' },
}

const Tag = ({ label, color, bg }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5,
    background: bg, color, border: `1px solid ${color}22`,
    fontSize: 11, fontWeight: 700, padding: '3px 11px',
    borderRadius: 20, letterSpacing: '0.04em',
  }}>
    {label}
  </span>
)

const formatTime = (raw) => {
  if (!raw) return '—'
  try {
    const date = new Date(raw)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const time = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    if (date.toDateString() === today.toDateString()) return `Today, ${time}`
    if (date.toDateString() === tomorrow.toDateString()) return `Tomorrow, ${time}`
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + `, ${time}`
  } catch { return raw }
}

const GameCards = () => {
  const [games, setGames]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState('')

  useEffect(() => {
    axios.get('http://localhost:8081/game')
      .then(res => setGames(res.data.slice(0, 3)))   // show first 3
      .catch(() => setError('Could not load games.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 24 }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, height: 220,
          background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
          backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite',
        }} />
      ))}
    </div>
  )

  if (error) return (
    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12,
      padding: '14px 18px', color: '#dc2626', fontSize: '0.88rem', marginBottom: 24 }}>
      ⚠️ {error}
    </div>
  )

  return (
    <>
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 24 }}>
        {games.map((game, i) => {
          const sp        = SPORT_CONFIG[game.game] || SPORT_CONFIG.Other
          const highlight = i === 0
          const filled    = Number(game.currentplayers || 0)
          const total     = Number(game.totalplayers   || 0)
          const spotsLeft = total - filled
          const isFull    = spotsLeft <= 0

          const sportLabel = `${sp.icon} ${game.game || 'Game'}`
          const details = [
            { label: 'Time',     val: formatTime(game.time) },
            { label: 'Location', val: game.location || game.venuename || '—' },
            { label: 'Spots',    val: isFull ? 'Full' : `${spotsLeft} left` },
            { label: 'Fee',      val: game.price ? `₹${game.price} / player` : 'Free' },
          ]

          return (
            <div key={game.id || i} style={{
              background: '#fff',
              border: highlight ? `2px solid ${sp.color}` : '1px solid #e5e7eb',
              borderRadius: 16, padding: 24,
              boxShadow: highlight ? `0 4px 20px ${sp.color}20` : '0 1px 4px rgba(0,0,0,0.04)',
              display: 'flex', flexDirection: 'column', gap: 14,
              position: 'relative',
            }}>

              {highlight && (
                <div style={{
                  position: 'absolute', top: -1, right: 18,
                  background: sp.color, color: '#fff',
                  fontSize: 10, fontWeight: 700,
                  padding: '3px 10px', borderRadius: '0 0 8px 8px',
                  letterSpacing: '0.05em',
                }}>FEATURED</div>
              )}

              <Tag label={sportLabel} color={sp.color} bg={sp.bg} />

              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#111827' }}>
                {game.venuename || 'Game'}
              </div>

              <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>
                Hosted by <strong style={{ color: '#374151' }}>{game.hostname || '—'}</strong>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {details.map(({ label, val }) => (
                  <div key={label}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>
                      {label}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>
                      {val}
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/getgames" style={{ textDecoration: 'none' }}>
                <button style={{
                  width: '100%',
                  background: highlight ? sp.color : '#f9fafb',
                  color: highlight ? '#fff' : '#374151',
                  border: highlight ? 'none' : '1px solid #d1d5db',
                  padding: 11, borderRadius: 10,
                  fontWeight: 700, fontSize: '0.88rem',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  Join this game
                </button>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default GameCards