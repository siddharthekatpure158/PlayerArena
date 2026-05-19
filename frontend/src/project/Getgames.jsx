import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SportConfig = {
  Football:   { icon: '⚽', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', tag: '#dcfce7' },
  Cricket:    { icon: '🏏', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', tag: '#dbeafe' },
  Basketball: { icon: '🏀', color: '#d97706', bg: '#fffbeb', border: '#fde68a', tag: '#fef3c7' },
  Badminton:  { icon: '🏸', color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe', tag: '#ede9fe' },
  Tennis:     { icon: '🎾', color: '#dc2626', bg: '#fef2f2', border: '#fecaca', tag: '#fee2e2' },
  Volleyball: { icon: '🏐', color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc', tag: '#cffafe' },
  Other:      { icon: '🎮', color: '#6b7280', bg: '#f9fafb', border: '#e5e7eb', tag: '#f3f4f6' },
}

const getSport = (game = '') => SportConfig[game] || SportConfig.Other

const formatTime = (raw) => {
  if (!raw) return '—'
  try {
    return new Date(raw).toLocaleString('en-IN', {
      day: 'numeric', month: 'short',
      hour: '2-digit', minute: '2-digit',
    })
  } catch { return raw }
}

// ── Game Card ────────────────────────────────────────────────────────────────
const GameCard = ({ game, onJoin, joining, isJoined }) => {  // ✅ added isJoined prop
  const sp       = getSport(game.game)
  const filled   = Number(game.currentplayers || 0)
  const total    = Number(game.totalplayers   || 0)
  const spotsLeft = total - filled
  const pct      = total ? Math.min(100, Math.round((filled / total) * 100)) : 0
  const isFull   = spotsLeft <= 0
  const gameId   = game.id                                   

  // button state logic
  const btnDisabled = isFull || isJoined || joining === gameId
  const btnBg = isFull
    ? '#f3f4f6'
    : isJoined
    ? '#f0fdf4'
    : joining === gameId
    ? sp.bg
    : sp.color
  const btnColor = isFull
    ? '#9ca3af'
    : isJoined
    ? '#16a34a'
    : joining === gameId
    ? sp.color
    : '#fff'
  const btnBorder = isFull
    ? '1px solid #e5e7eb'
    : isJoined
    ? '1px solid #bbf7d0'
    : joining === gameId
    ? `1px solid ${sp.border}`
    : 'none'
  const btnLabel = isFull
    ? 'Game Full'
    : isJoined
    ? '✓ Already Joined'
    : joining === gameId
    ? 'Joining...'
    : `Join Game ${sp.icon}`

  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${isFull ? '#fecaca' : isJoined ? '#bbf7d0' : '#e5e7eb'}`, // ✅ green border if joined
      borderRadius: '16px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      transition: 'transform 0.18s, box-shadow 0.18s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)' }}
    >
      {/* Top accent */}
      <div style={{ height: 4, background: isFull ? '#dc2626' : isJoined ? '#16a34a' : `linear-gradient(90deg, ${sp.color}, ${sp.color}88)` }} />

      <div style={{ padding: '20px 20px 0' }}>

        {/* Sport tag + spots badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: sp.tag, border: `1px solid ${sp.border}`,
            color: sp.color, fontSize: 11, fontWeight: 700,
            padding: '3px 11px', borderRadius: 20, letterSpacing: '0.04em',
          }}>
            {sp.icon} {game.game || 'Game'}
          </span>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
            background: isFull ? '#fef2f2' : spotsLeft <= 2 ? '#fffbeb' : '#f0fdf4',
            color:      isFull ? '#dc2626' : spotsLeft <= 2 ? '#d97706' : '#16a34a',
            border: `1px solid ${isFull ? '#fecaca' : spotsLeft <= 2 ? '#fde68a' : '#bbf7d0'}`,
          }}>
            {isFull ? 'Full' : `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`}
          </span>
        </div>

        {/* Venue */}
        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: '0 0 4px', lineHeight: 1.2 }}>
          {game.venuename || 'Venue'}
        </h3>

        {/* Host avatar + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: sp.bg, border: `1px solid ${sp.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: sp.color,
          }}>
            {(game.hostname || 'H')[0].toUpperCase()}
          </div>
          <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
            Hosted by <strong style={{ color: '#374151' }}>{game.hostname || '—'}</strong>
          </span>
        </div>

        {/* Info grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: 14 }}>
          {[
            { icon: '📍', label: 'Location', val: game.location },
            { icon: '🕐', label: 'Time',     val: formatTime(game.time) },
            { icon: '👥', label: 'Players',  val: `${filled} / ${total}` },
            { icon: '💰', label: 'Per head',  val: game.price ? `₹${game.price}` : 'Free' },
          ].map(({ icon, label, val }) => (
            <div key={label} style={{ background: '#f9fafb', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 3 }}>
                {icon} {label}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827', wordBreak: 'break-word' }}>
                {val || '—'}
              </div>
            </div>
          ))}
        </div>

        {/* Fill bar */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>Players joined</span>
            <span style={{ fontSize: 11, color: sp.color, fontWeight: 700 }}>{pct}%</span>
          </div>
          <div style={{ height: 6, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 4,
              width: `${pct}%`,
              background: isFull ? '#dc2626' : pct > 70 ? '#d97706' : sp.color,
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      </div>

      {/* Join button */}
      <div style={{ padding: '0 20px 20px', marginTop: 'auto' }}>
        <button
          onClick={() => !btnDisabled && onJoin(gameId)}
          disabled={btnDisabled}
          style={{
            width: '100%', padding: '12px',
            borderRadius: 10,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700, fontSize: '0.9rem',
            cursor: btnDisabled ? 'not-allowed' : 'pointer',
            background: btnBg,
            color: btnColor,
            border: btnBorder,
            transition: 'all 0.2s',
          }}
        >
          {btnLabel}
        </button>
      </div>
    </div>
  )
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
const Skeleton = () => (
  <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, overflow: 'hidden' }}>
    <div style={{ height: 4, background: '#e5e7eb' }} />
    <div style={{ padding: 20 }}>
      {[100, 60, 80, 40].map((w, i) => (
        <div key={i} style={{
          height: i === 0 ? 20 : 14, width: `${w}%`,
          background: '#f3f4f6', borderRadius: 6, marginBottom: 12,
          animation: 'pulse 1.5s ease-in-out infinite',
        }} />
      ))}
    </div>
  </div>
)

// ── Main ──────────────────────────────────────────────────────────────────────
const Getgames = () => {
  const [data,    setData]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [joining, setJoining] = useState(null)
  const [joined,  setJoined]  = useState([])       // stores game IDs already joined
  const [sport,   setSport]   = useState('All')
  const [search,  setSearch]  = useState('')

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get('http://localhost:8081/game')
        setData(res.data)
      } catch (err) {
        setError('Could not load games. Make sure your server is running.')
      } finally {
        setLoading(false)
      }
    }
    fetchdata()
  }, [])

  const handleJoin = async (id) => {
    if (!id || joined.includes(id)) return          // ✅ block duplicate joins
    setJoining(id)
    try {
      await axios.put(`http://localhost:8081/game/join/${id}`)
      setJoined(prev => [...prev, id])
      setData(prev => prev.map(g =>
        g.id === id                                  // ✅ Java uses .id not ._id
          ? { ...g, currentplayers: Number(g.currentplayers || 0) + 1 }
          : g
      ))
    } catch (err) {
      // backend throws RuntimeException when full
      alert(err?.response?.data?.message || 'Game is already full!')
    } finally {
      setJoining(null)
    }
  }

  const sports   = ['All', ...Object.keys(SportConfig).filter(s => s !== 'Other')]
  const filtered = data.filter(g => {
    const matchSport  = sport === 'All' || g.game === sport
    const matchSearch = !search ||
      (g.venuename || '').toLowerCase().includes(search.toLowerCase()) ||
      (g.location  || '').toLowerCase().includes(search.toLowerCase()) ||
      (g.hostname  || '').toLowerCase().includes(search.toLowerCase())
    return matchSport && matchSearch
  })

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'DM Sans', sans-serif", padding: '40px 20px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        input::placeholder { color: #9ca3af; }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{
            display: 'inline-block',
            background: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: 20, padding: '4px 14px',
            fontSize: 11, fontWeight: 700, color: '#16a34a',
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14,
          }}>🤝 Join a Game</div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                fontWeight: 800, color: '#111827', lineHeight: 1.05, margin: '0 0 8px',
              }}>
                Open games<br /><span style={{ color: '#16a34a' }}>near you</span>
              </h1>
              <p style={{ color: '#6b7280', fontSize: '0.92rem', margin: 0 }}>
                {loading ? 'Loading...' : `${filtered.length} game${filtered.length !== 1 ? 's' : ''} available`}
              </p>
            </div>

            {/* Search */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#fff', border: '1.5px solid #e5e7eb',
              borderRadius: 10, padding: '9px 14px', minWidth: 240,
            }}>
              <span>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search venue, location..."
                style={{
                  border: 'none', outline: 'none', background: 'transparent',
                  fontSize: '0.88rem', color: '#111827',
                  fontFamily: "'DM Sans',sans-serif", width: '100%',
                }}
              />
            </div>
          </div>
        </div>

        {/* Sport filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {sports.map(s => {
            const active = sport === s
            const cfg    = SportConfig[s]
            return (
              <button key={s} onClick={() => setSport(s)} style={{
                background: active ? (cfg?.color ?? '#16a34a') : '#fff',
                color:      active ? '#fff' : '#374151',
                border:     active ? 'none' : '1px solid #d1d5db',
                padding: '7px 18px', borderRadius: 20,
                fontWeight: 600, fontSize: '0.83rem', cursor: 'pointer',
                fontFamily: "'DM Sans',sans-serif",
                boxShadow: active ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                transition: 'all 0.18s',
              }}>
                {cfg ? `${cfg.icon} ` : ''}{s}
              </button>
            )
          })}
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '20px 24px', color: '#dc2626', fontSize: '0.9rem', marginBottom: 32 }}>
            ⚠️ {error}
          </div>
        )}

        {/* Skeletons */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 20 }}>
            {[1,2,3,4,5,6].map(i => <Skeleton key={i} />)}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🏟️</div>
            <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: 8 }}>No games found</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Try a different sport or search term.</p>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && filtered.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px,1fr))', gap: 20 }}>
            {filtered.map((game, i) => (
              <div key={game.id || i} style={{ position: 'relative' }}>
                {joined.includes(game.id) && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12, zIndex: 2,
                    background: '#16a34a', color: '#fff',
                    fontSize: 10, fontWeight: 700, padding: '3px 10px',
                    borderRadius: 20, letterSpacing: '0.05em',
                  }}>✓ JOINED</div>
                )}
                <GameCard
                  game={game}
                  onJoin={handleJoin}
                  joining={joining}
                  isJoined={joined.includes(game.id)}    // ✅ pass isJoined per card
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Getgames