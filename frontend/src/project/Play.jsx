import React from 'react'
import { Link } from 'react-router-dom'

const FeatureRow = ({ icon, text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.83rem', color: '#6b7280' }}>
    <span style={{ fontSize: '0.85rem' }}>{icon}</span>
    {text}
  </div>
)

const Play = () => {
  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: "'DM Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .play-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(ellipse at 60% 20%, rgba(22,163,74,0.18) 0%, transparent 55%),
            radial-gradient(ellipse at 20% 80%, rgba(37,99,235,0.12) 0%, transparent 50%),
            linear-gradient(160deg, #0c1a0e 0%, #0f2318 40%, #0a1628 100%);
        }

        .pitch {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          width: 340px; height: 900px;
          background: linear-gradient(180deg, #1a4d1a 0%, #1e5c1e 30%, #1e5c1e 70%, #1a4d1a 100%);
          border: 2px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          opacity: 0.18;
        }

        .pitch-crease {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 180px; height: 2px;
          background: rgba(255,255,255,0.5);
          border-radius: 1px;
        }

        .pitch-stumps {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          align-items: flex-end;
        }

        .stump {
          width: 3px;
          background: rgba(255,255,255,0.6);
          border-radius: 2px 2px 0 0;
        }

        .bail {
          position: absolute;
          top: 0;
          width: 22px; height: 2px;
          background: rgba(255,255,255,0.6);
          border-radius: 1px;
          left: -2px;
        }

        .outfield-ring {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          border: 1.5px solid rgba(255,255,255,0.04);
          border-radius: 50%;
        }

        .grass-stripe {
          position: absolute;
          top: 0; bottom: 0;
          background: rgba(255,255,255,0.015);
        }

        .floating-ball {
          position: absolute;
          width: 28px; height: 28px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #dc2626, #7f1d1d);
          border: 1px solid rgba(255,255,255,0.1);
          opacity: 0.5;
          animation: floatBall 8s ease-in-out infinite;
        }

        @keyframes floatBall {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(120deg); }
          66% { transform: translateY(8px) rotate(240deg); }
        }

        .floating-bat {
          position: absolute;
          opacity: 0.12;
          animation: floatBat 10s ease-in-out infinite;
        }

        @keyframes floatBat {
          0%, 100% { transform: translateY(0px) rotate(-30deg); }
          50% { transform: translateY(-14px) rotate(-25deg); }
        }

        .play-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }
        .play-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.35) !important;
        }
        .card-btn { transition: opacity 0.15s; }
        .card-btn:hover { opacity: 0.88; }
      `}</style>

      {/* ── BACKGROUND ── */}
      <div className="play-bg" />

      {/* Outfield rings */}
      <div className="outfield-ring" style={{ width: 900, height: 900 }} />
      <div className="outfield-ring" style={{ width: 650, height: 650 }} />
      <div className="outfield-ring" style={{ width: 400, height: 400 }} />

      {/* Grass stripes */}
      {[80, 200, 320, 440, 560, 680, 800, 920, 1040, 1160].map((l, i) => (
        <div key={i} className="grass-stripe" style={{ left: l, width: 60 }} />
      ))}

      {/* Cricket pitch */}
      <div className="pitch">
        {/* Creases */}
        <div className="pitch-crease" style={{ top: 80 }} />
        <div className="pitch-crease" style={{ bottom: 80 }} />

        {/* Top stumps */}
        <div className="pitch-stumps" style={{ top: 56 }}>
          <div className="stump" style={{ height: 22 }} />
          <div className="stump" style={{ height: 24 }} />
          <div className="stump" style={{ height: 22 }} />
          <div className="bail" style={{ top: 0 }} />
        </div>

        {/* Bottom stumps */}
        <div className="pitch-stumps" style={{ bottom: 56 }}>
          <div className="stump" style={{ height: 22 }} />
          <div className="stump" style={{ height: 24 }} />
          <div className="stump" style={{ height: 22 }} />
          <div className="bail" style={{ top: 0 }} />
        </div>

        {/* Centre circle */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)',
          width: 60, height: 60, borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.25)',
        }} />
      </div>

      {/* Floating cricket balls */}
      <div className="floating-ball" style={{ top: '15%', left: '12%', animationDelay: '0s' }} />
      <div className="floating-ball" style={{ top: '70%', right: '10%', animationDelay: '3s', width: 20, height: 20 }} />
      <div className="floating-ball" style={{ top: '40%', left: '6%', animationDelay: '6s', width: 16, height: 16 }} />
      <div className="floating-ball" style={{ bottom: '20%', right: '18%', animationDelay: '1.5s', width: 22, height: 22 }} />

      {/* Floating bats */}
      <div className="floating-bat" style={{ top: '10%', right: '8%', animationDelay: '2s' }}>
        <svg width="40" height="90" viewBox="0 0 40 90" fill="none">
          <rect x="14" y="0" width="12" height="60" rx="6" fill="#c8a96e" />
          <rect x="8" y="52" width="24" height="28" rx="4" fill="#a07840" />
          <line x1="14" y1="54" x2="26" y2="54" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </svg>
      </div>
      <div className="floating-bat" style={{ bottom: '12%', left: '7%', animationDelay: '5s', transform: 'rotate(40deg)' }}>
        <svg width="32" height="72" viewBox="0 0 40 90" fill="none">
          <rect x="14" y="0" width="12" height="60" rx="6" fill="#c8a96e" />
          <rect x="8" y="52" width="24" height="28" rx="4" fill="#a07840" />
        </svg>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)',
            borderRadius: '20px', padding: '5px 16px',
            fontSize: '11px', fontWeight: 700, color: '#4ade80',
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px',
          }}>▶ Play</div>

          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            fontWeight: 800, color: '#fff',
            lineHeight: 1.05, marginBottom: '12px',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>
            What do you want<br />
            <span style={{ color: '#4ade80' }}>to do today?</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.93rem', lineHeight: 1.65, maxWidth: '360px', margin: '0 auto' }}>
            Host your own match or browse open games near you and jump right in.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          width: '100%',
          maxWidth: '620px',
          alignItems: 'stretch',
        }}>

          {/* Create Game */}
          <Link to="/creategame" style={{ textDecoration: 'none' }}>
            <div className="play-card" style={{
              height: '100%',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '18px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}>
              <div style={{ height: '4px', background: 'linear-gradient(90deg,#16a34a,#4ade80)' }} />
              <div style={{ padding: '26px 22px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '13px',
                  background: '#f0fdf4', border: '1px solid #bbf7d0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
                }}>🎮</div>

                <div>
                  <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: '0 0 7px' }}>Create a Game</h2>
                  <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.65, margin: 0 }}>Set sport, time, venue and player limit. Your match goes live instantly.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <FeatureRow icon="📅" text="Pick date & time" />
                  <FeatureRow icon="📍" text="Set venue & location" />
                  <FeatureRow icon="👥" text="Define player slots" />
                  <FeatureRow icon="💰" text="Set price per player" />
                </div>

                <div className="card-btn" style={{
                  background: '#16a34a', color: '#fff',
                  textAlign: 'center', padding: '12px',
                  borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem',
                }}>Host a Match →</div>
              </div>
            </div>
          </Link>

          {/* Play Games */}
          <Link to="/getgames" style={{ textDecoration: 'none' }}>
            <div className="play-card" style={{
              height: '100%',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '18px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}>
              <div style={{ height: '4px', background: 'linear-gradient(90deg,#2563eb,#60a5fa)' }} />
              <div style={{ padding: '26px 22px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '13px',
                  background: '#eff6ff', border: '1px solid #bfdbfe',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
                }}>🤝</div>

                <div>
                  <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: '0 0 7px' }}>Play Games</h2>
                  <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.65, margin: 0 }}>Browse open matches nearby sorted by sport and available spots.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', flex: 1 }}>
                  {[
                    { sport: '⚽ Football · 5v5', spots: '3 spots', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
                    { sport: '🏏 Cricket · T10',  spots: '5 spots', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
                    { sport: '🏀 Basketball · 3v3', spots: '2 spots', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
                  ].map(({ sport, spots, color, bg, border }) => (
                    <div key={sport} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: bg, border: `1px solid ${border}`,
                      borderRadius: '8px', padding: '8px 12px',
                    }}>
                      <span style={{ fontSize: '0.79rem', fontWeight: 600, color: '#374151' }}>{sport}</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color, background: '#fff', border: `1px solid ${border}`, padding: '2px 9px', borderRadius: '20px' }}>{spots}</span>
                    </div>
                  ))}
                </div>

                <div className="card-btn" style={{
                  background: '#2563eb', color: '#fff',
                  textAlign: 'center', padding: '12px',
                  borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem',
                }}>Browse Games →</div>
              </div>
            </div>
          </Link>

        </div>

        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', marginTop: '28px', textAlign: 'center' }}>
          38 live games open right now · New games added daily
        </p>
      </div>
    </div>
  )
}

export default Play