 import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GameCards from './GameCards'

const InfoCard = ({ icon, title, value, sub, accent }) => (
  <div style={{
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '14px',
    padding: '22px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  }}>
    <span style={{ fontSize: '1.4rem' }}>{icon}</span>
    <div style={{ fontSize: '1.9rem', fontWeight: 700, color: '#111827', fontFamily: "'Barlow Condensed',sans-serif" }}>{value}</div>
    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: accent }}>{title}</div>
    <div style={{ fontSize: '0.76rem', color: '#9ca3af' }}>{sub}</div>
  </div>
)

const Step = ({ num, title, desc }) => (
  <div style={{
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    padding: '28px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  }}>
    <div style={{
      width: 38, height: 38, borderRadius: '50%',
      background: '#f0fdf4',
      border: '2px solid #bbf7d0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#16a34a', fontWeight: 800, fontSize: '0.95rem',
    }}>{num}</div>
    <div style={{ fontWeight: 700, color: '#111827', fontSize: '1rem' }}>{title}</div>
    <div style={{ fontSize: '0.83rem', color: '#6b7280', lineHeight: 1.6 }}>{desc}</div>
  </div>
)

const HomePage = () => {
  const [location, setLocation] = useState('')
  const [sport, setSport] = useState('All')
  const sports = ['All', 'Football', 'Cricket', 'Basketball', 'Badminton', 'Tennis']

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: '#f8fafc',
      minHeight: '100vh',
      color: '#111827',
    }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(160deg, #052e16 0%, #14532d 55%, #166534 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '90px 28px 80px',
      }}>
        {/* Field lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }}
          viewBox="0 0 1200 500" fill="none">
          <rect x="80" y="40" width="1040" height="420" rx="4" stroke="white" strokeWidth="2"/>
          <line x1="600" y1="40" x2="600" y2="460" stroke="white" strokeWidth="2"/>
          <circle cx="600" cy="250" r="90" stroke="white" strokeWidth="2"/>
          <circle cx="600" cy="250" r="8" fill="white"/>
          <rect x="80" y="155" width="120" height="190" stroke="white" strokeWidth="1.5"/>
          <rect x="1000" y="155" width="120" height="190" stroke="white" strokeWidth="1.5"/>
        </svg>

        {/* Glow */}
        <div style={{
          position: 'absolute', top: '-80px', right: '8%',
          width: '420px', height: '420px',
          background: 'radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Live pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: '20px', padding: '6px 16px',
            fontSize: '12px', fontWeight: 600, color: '#bbf7d0',
            marginBottom: '28px',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
            38 live games happening now
          </div>

          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
            fontWeight: 800,
            lineHeight: 1.0,
            marginBottom: '20px',
            color: '#fff',
            maxWidth: '680px',
          }}>
            Book turf. Join games.<br />
            <span style={{ color: '#4ade80' }}>Play your sport.</span>
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.65)',
            maxWidth: '500px',
            lineHeight: 1.75,
            marginBottom: '40px',
          }}>
            Find and book sports turfs near you, discover gyms for training,
            create your own match or jump into an open game — all in one place.
          </p>

          {/* Search */}
          <div style={{
            display: 'flex',
            gap: '10px',
            maxWidth: '540px',
            background: 'rgba(255,255,255,0.97)',
            borderRadius: '14px',
            padding: '8px 8px 8px 18px',
            alignItems: 'center',
            marginBottom: '56px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>📍</span>
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Enter your location..."
              style={{
                flex: 1, background: 'transparent', border: 'none',
                outline: 'none', color: '#111827', fontSize: '0.95rem',
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <Link to="/book" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                color: '#fff', border: 'none', padding: '10px 22px',
                borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem',
                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap',
              }}>Find Turfs →</button>
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px', maxWidth: '660px' }}>
            <InfoCard icon="🏟️" value="120+" title="Turfs listed"    sub="Across your city"      accent="#16a34a" />
            <InfoCard icon="👟" value="4,800+" title="Active players" sub="Joined this month"     accent="#2563eb" />
            <InfoCard icon="🎮" value="38"    title="Live games"     sub="Open to join now"      accent="#d97706" />
            <InfoCard icon="⭐" value="4.8"   title="Avg rating"     sub="From verified reviews" accent="#7c3aed" />
          </div>
        </div>
      </section>

      {/* ── WHAT TO DO ───────────────────────────────────────────────── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 28px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#16a34a', marginBottom: '10px' }}>What you can do</p>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '2.2rem', fontWeight: 700, marginBottom: '10px', color: '#111827' }}>Everything sports, in one place</h2>
        <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '36px', maxWidth: '480px', lineHeight: 1.65 }}>
          From finding the right turf to organising a match with friends — TurfZone handles it all.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
          {[
            { icon: '📅', title: 'Book a Turf',      desc: 'Browse available time slots, pick your sport and location, confirm your booking instantly. No calls needed.',            to: '/book',       accent: '#16a34a', accentBg: '#f0fdf4', border: '#bbf7d0', cta: 'Browse turfs →' },
            { icon: '🏋️', title: 'Find Gyms Nearby', desc: 'Discover training centres, strength gyms and fitness studios close to your location. Filter by sport type.',             to: '/train',      accent: '#2563eb', accentBg: '#eff6ff', border: '#bfdbfe', cta: 'Find gyms →' },
            { icon: '🎮', title: 'Create a Game',    desc: 'Host your own match — set sport, date & time, decide player limit. Your game goes live and others can join.',             to: '/creategame', accent: '#d97706', accentBg: '#fffbeb', border: '#fde68a', cta: 'Create game →' },
            { icon: '🤝', title: 'Join a Game',      desc: 'Browse open matches near you, sorted by sport and available spots. See details and join with one tap.',                   to: '/getgames',   accent: '#7c3aed', accentBg: '#faf5ff', border: '#ddd6fe', cta: 'See all games →' },
          ].map(({ icon, title, desc, to, accent, accentBg, border, cta }) => (
            <div key={title} style={{
              background: accentBg,
              border: `1px solid ${border}`,
              borderRadius: '16px',
              padding: '28px 24px',
              display: 'flex', flexDirection: 'column', gap: '12px',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '12px',
                background: '#fff', border: `1px solid ${border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>{title}</div>
              <div style={{ fontSize: '0.83rem', color: '#6b7280', lineHeight: 1.65, flex: 1 }}>{desc}</div>
              <Link to={to} style={{ textDecoration: 'none' }}>
                <button style={{
                  background: accent, color: '#fff',
                  border: 'none', padding: '9px 18px',
                  borderRadius: '9px', fontWeight: 700, fontSize: '0.83rem',
                  cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                }}>{cta}</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e5e7eb', maxWidth: '1200px', margin: '0 auto' }} />

      {/* ── SPORT FILTER ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 28px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#16a34a', marginBottom: '10px' }}>Browse by sport</p>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '2.2rem', fontWeight: 700, marginBottom: '24px', color: '#111827' }}>What are you playing today?</h2>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {sports.map(s => (
            <button key={s} onClick={() => setSport(s)} style={{
              background: sport === s ? '#16a34a' : '#fff',
              color: sport === s ? '#fff' : '#374151',
              border: sport === s ? 'none' : '1px solid #d1d5db',
              padding: '8px 20px', borderRadius: '20px',
              fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: sport === s ? '0 4px 12px rgba(22,163,74,0.25)' : 'none',
              transition: 'all 0.18s',
            }}>{s}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
          {[
            { icon: '⚽', sport: 'Football',   turfs: '42 turfs', color: '#16a34a', bg: '#f0fdf4' },
            { icon: '🏏', sport: 'Cricket',    turfs: '28 turfs', color: '#2563eb', bg: '#eff6ff' },
            { icon: '🏀', sport: 'Basketball', turfs: '15 turfs', color: '#d97706', bg: '#fffbeb' },
            { icon: '🏸', sport: 'Badminton',  turfs: '19 turfs', color: '#7c3aed', bg: '#faf5ff' },
            { icon: '🎾', sport: 'Tennis',     turfs: '11 turfs', color: '#dc2626', bg: '#fef2f2' },
            { icon: '🏐', sport: 'Volleyball', turfs: '9 turfs',  color: '#0891b2', bg: '#ecfeff' },
          ].filter(t => sport === 'All' || t.sport === sport).map(({ icon, sport: sp, turfs, color, bg }) => (
            <Link key={sp} to="/book" style={{ textDecoration: 'none' }}>
              <div style={{
                background: bg, border: `1px solid ${color}22`,
                borderRadius: '14px', padding: '22px 18px',
                display: 'flex', flexDirection: 'column', gap: '8px',
                transition: 'transform 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <span style={{ fontSize: '1.8rem' }}>{icon}</span>
                <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem' }}>{sp}</div>
                <div style={{ fontSize: '0.78rem', color, fontWeight: 600 }}>{turfs} available</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e5e7eb', maxWidth: '1200px', margin: '0 auto' }} />

      {/* ── PLAY SECTION ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px', marginBottom: '28px' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#d97706', marginBottom: '8px' }}>Play</p>
            <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '2.2rem', fontWeight: 700, color: '#111827' }}>Open games you can join</h2>
          </div>
          <Link to="/getgames" style={{ textDecoration: 'none', color: '#16a34a', fontSize: '0.88rem', fontWeight: 700 }}>View all games →</Link>
        </div>

        {/* ✅ GameCards replaces the static array */}
        <GameCards />

        {/* Create game banner */}
        <div style={{
          background: 'linear-gradient(135deg, #052e16, #14532d)',
          borderRadius: '16px', padding: '32px 32px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '20px',
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#fff', marginBottom: '8px' }}>Want to organise your own match?</div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', maxWidth: '420px', lineHeight: 1.65 }}>
              Set sport, pick a time, choose a turf, define player slots — your game goes live instantly and others can join.
            </div>
          </div>
          <Link to="/creategame" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#4ade80', color: '#052e10', border: 'none',
              padding: '13px 30px', borderRadius: '11px',
              fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap',
            }}>+ Create a game</button>
          </Link>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e5e7eb', maxWidth: '1200px', margin: '0 auto' }} />

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 28px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#16a34a', marginBottom: '8px' }}>How it works</p>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '2.2rem', fontWeight: 700, marginBottom: '36px', color: '#111827' }}>Get on the field in 3 steps</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <Step num="1" title="Set your location" desc="Enter your area or allow location access. We instantly show turfs, gyms and open games near you." />
          <Step num="2" title="Choose what to do"  desc="Book a turf slot, find a nearby gym, create your own game or browse and join an existing one." />
          <Step num="3" title="Confirm and play"   desc="Confirm your booking or game slot instantly. Show up, warm up, and enjoy your sport." />
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e5e7eb', maxWidth: '1200px', margin: '0 auto' }} />

      {/* ── TRAIN SECTION ────────────────────────────────────────────── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 28px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563eb', marginBottom: '8px' }}>Train</p>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '2.2rem', fontWeight: 700, marginBottom: '10px', color: '#111827' }}>Find gyms & training centres</h2>
        <p style={{ color: '#6b7280', fontSize: '0.92rem', lineHeight: 1.7, maxWidth: '500px', marginBottom: '32px' }}>
          Browse strength gyms, fitness studios, and sport-specific training facilities near your location.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '28px' }}>
          {[
            { icon: '🏋️', type: 'Strength Gyms',     desc: 'Weight training & powerlifting', count: '24 nearby', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
            { icon: '⚽', type: 'Football Academies', desc: 'Skill drills & pro coaching',    count: '12 nearby', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
            { icon: '🏸', type: 'Badminton Clubs',    desc: 'Courts & training sessions',     count: '9 nearby',  color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
            { icon: '🥊', type: 'Combat Sports',      desc: 'Boxing, MMA & martial arts',     count: '7 nearby',  color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
          ].map(({ icon, type, desc, count, color, bg, border }) => (
            <div key={type} style={{
              background: bg, border: `1px solid ${border}`,
              borderRadius: '14px', padding: '22px 20px',
              display: 'flex', flexDirection: 'column', gap: '8px',
              transition: 'transform 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <span style={{ fontSize: '1.6rem' }}>{icon}</span>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#111827' }}>{type}</div>
              <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>{desc}</div>
              <div style={{ fontSize: '0.78rem', color, fontWeight: 700 }}>{count}</div>
              <Link to="/train" style={{ textDecoration: 'none', marginTop: '4px' }}>
                <span style={{ fontSize: '0.78rem', color, fontWeight: 700 }}>Find nearby →</span>
              </Link>
            </div>
          ))}
        </div>

        <Link to="/train" style={{ textDecoration: 'none' }}>
          <button style={{
            background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb',
            padding: '11px 28px', borderRadius: '10px',
            fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
          }}>Explore all training centres →</button>
        </Link>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer style={{
        background: '#c7e4d3',
        padding: '36px 28px',
        textAlign: 'center',
        color: 'rgba(6, 29, 3, 0.35)',
        fontSize: '0.83rem',
        letterSpacing: '0.03em',
      }}>
        © 2025 TurfZone · Book · Play · Train
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #9ca3af; }
      `}</style>
    </div>
  )
}

export default HomePage