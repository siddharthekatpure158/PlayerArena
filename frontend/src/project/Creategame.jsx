import axios from 'axios';
import React, { useState } from 'react';

const sports = ['Football', 'Cricket', 'Basketball', 'Badminton', 'Tennis', 'Volleyball', 'Other'];

const Field = ({ label, icon, children, hint }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
    <label style={{
      fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: '#374151', display: 'flex',
      alignItems: 'center', gap: '6px',
    }}>
      <span>{icon}</span>{label}
    </label>
    {children}
    {hint && <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{hint}</span>}
  </div>
);

const inputStyle = {
  width: '100%', padding: '12px 16px',
  background: '#f9fafb', border: '1.5px solid #e5e7eb',
  borderRadius: '10px', fontSize: '0.95rem',
  color: '#111827', fontFamily: "'DM Sans', sans-serif",
  outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
};

const Creategame = () => {
  const [data, setData] = useState({
    hostname: '', venuename: '', location: '',
    game: '', totalplayers: '', time: '', price: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  function handlechange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handlesubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8081/game', data);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const focusStyle = (name) => focused === name
    ? { borderColor: '#16a34a', boxShadow: '0 0 0 3px rgba(22,163,74,0.1)', background: '#fff' }
    : {};

  if (submitted) return (
    <div style={{
      minHeight: '100vh', background: '#f8fafc',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif", padding: '24px',
    }}>
      <div style={{
        background: '#fff', borderRadius: '20px', padding: '56px 40px',
        textAlign: 'center', maxWidth: '420px', width: '100%',
        boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
        border: '1px solid #e5e7eb',
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: '#f0fdf4', border: '2px solid #bbf7d0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2rem', margin: '0 auto 20px',
        }}>🎉</div>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '10px' }}>Game Created!</h2>
        <p style={{ color: '#6b7280', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '28px' }}>
          Your game <strong style={{ color: '#111827' }}>{data.game}</strong> at <strong style={{ color: '#111827' }}>{data.venuename}</strong> is now live. Players can find and join it.
        </p>
        <button
          onClick={() => { setSubmitted(false); setData({ hostname: '', venuename: '', location: '', game: '', totalplayers: '', time: '', price: '' }); }}
          style={{
            background: '#16a34a', color: '#fff', border: 'none',
            padding: '12px 28px', borderRadius: '10px', fontWeight: 700,
            fontSize: '0.9rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          }}
        >Create Another Game</button>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh', background: '#f8fafc',
      fontFamily: "'DM Sans', sans-serif", padding: '40px 20px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        input::placeholder, select::placeholder { color: #9ca3af; }
        select option { color: #111827; }
      `}</style>

      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            background: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: '20px', padding: '5px 14px',
            fontSize: '12px', fontWeight: 700, color: '#16a34a',
            marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>🎮 Create a Game</div>

          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '2.6rem', fontWeight: 800, color: '#111827',
            lineHeight: 1.0, marginBottom: '10px',
          }}>
            Host your own<br /><span style={{ color: '#16a34a' }}>match.</span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.93rem', lineHeight: 1.65, maxWidth: '440px' }}>
            Set the details below and your game goes live instantly — other players can find and join it.
          </p>
        </div>

        {/* Form card */}
        <form onSubmit={handlesubmit}>
          <div style={{
            background: '#fff', borderRadius: '20px',
            border: '1px solid #e5e7eb', overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}>

            {/* Section: Host */}
            <div style={{ padding: '28px 28px 0', borderBottom: '1px solid #f3f4f6' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '20px' }}>Host Details</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px', paddingBottom: '28px' }}>

                <Field label="Your Name" icon="👤">
                  <input
                    type="text" name="hostname" value={data.hostname}
                    onChange={handlechange} placeholder="e.g. Rahul Sharma"
                    required onFocus={() => setFocused('hostname')} onBlur={() => setFocused('')}
                    style={{ ...inputStyle, ...focusStyle('hostname') }}
                  />
                </Field>

              </div>
            </div>

            {/* Section: Venue */}
            <div style={{ padding: '28px 28px 0', borderBottom: '1px solid #f3f4f6' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '20px' }}>Venue Details</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', paddingBottom: '28px' }}>

                <Field label="Venue Name" icon="🏟️">
                  <input
                    type="text" name="venuename" value={data.venuename}
                    onChange={handlechange} placeholder="e.g. GreenPark Arena"
                    required onFocus={() => setFocused('venuename')} onBlur={() => setFocused('')}
                    style={{ ...inputStyle, ...focusStyle('venuename') }}
                  />
                </Field>

                <Field label="Location" icon="📍" hint="Area or full address">
                  <input
                    type="text" name="location" value={data.location}
                    onChange={handlechange} placeholder="e.g. Koregaon Park, Pune"
                    required onFocus={() => setFocused('location')} onBlur={() => setFocused('')}
                    style={{ ...inputStyle, ...focusStyle('location') }}
                  />
                </Field>

              </div>
            </div>

            {/* Section: Game */}
            <div style={{ padding: '28px 28px 0', borderBottom: '1px solid #f3f4f6' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '20px' }}>Game Details</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', paddingBottom: '28px' }}>

                <Field label="Sport" icon="⚽">
                  <select
                    name="game" value={data.game} onChange={handlechange} required
                    onFocus={() => setFocused('game')} onBlur={() => setFocused('')}
                    style={{ ...inputStyle, ...focusStyle('game'), cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                  >
                    <option value="">Select sport...</option>
                    {sports.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>

                <Field label="Total Players" icon="👥" hint="Max players allowed">
                  <input
                    type="number" name="totalplayers" value={data.totalplayers}
                    onChange={handlechange} placeholder="e.g. 10" min="2" max="100"
                    required onFocus={() => setFocused('totalplayers')} onBlur={() => setFocused('')}
                    style={{ ...inputStyle, ...focusStyle('totalplayers') }}
                  />
                </Field>

                <Field label="Date & Time" icon="🕐">
                  <input
                    type="datetime-local" name="time" value={data.time}
                    onChange={handlechange} required
                    onFocus={() => setFocused('time')} onBlur={() => setFocused('')}
                    style={{ ...inputStyle, ...focusStyle('time') }}
                  />
                </Field>

                <Field label="Price per Player" icon="💰" hint="Enter 0 for free">
                  <div style={{ position: 'relative' }}>
                    <span style={{
                      position: 'absolute', left: '14px', top: '50%',
                      transform: 'translateY(-50%)', color: '#6b7280',
                      fontWeight: 700, fontSize: '0.95rem', pointerEvents: 'none',
                    }}>₹</span>
                    <input
                      type="number" name="price" value={data.price}
                      onChange={handlechange} placeholder="120" min="0"
                      required onFocus={() => setFocused('price')} onBlur={() => setFocused('')}
                      style={{ ...inputStyle, ...focusStyle('price'), paddingLeft: '30px' }}
                    />
                  </div>
                </Field>

              </div>
            </div>

            {/* Preview strip */}
            {(data.game || data.venuename || data.time) && (
              <div style={{ padding: '18px 28px', background: '#f0fdf4', borderBottom: '1px solid #dcfce7' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#16a34a', marginBottom: '10px' }}>Preview</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {data.game && <span style={{ background: '#fff', border: '1px solid #bbf7d0', borderRadius: '20px', padding: '4px 14px', fontSize: '0.82rem', fontWeight: 600, color: '#15803d' }}>⚽ {data.game}</span>}
                  {data.venuename && <span style={{ background: '#fff', border: '1px solid #bbf7d0', borderRadius: '20px', padding: '4px 14px', fontSize: '0.82rem', fontWeight: 600, color: '#15803d' }}>🏟️ {data.venuename}</span>}
                  {data.totalplayers && <span style={{ background: '#fff', border: '1px solid #bbf7d0', borderRadius: '20px', padding: '4px 14px', fontSize: '0.82rem', fontWeight: 600, color: '#15803d' }}>👥 {data.totalplayers} players</span>}
                  {data.price && <span style={{ background: '#fff', border: '1px solid #bbf7d0', borderRadius: '20px', padding: '4px 14px', fontSize: '0.82rem', fontWeight: 600, color: '#15803d' }}>₹{data.price}/player</span>}
                </div>
              </div>
            )}

            {/* Submit */}
            <div style={{ padding: '24px 28px' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading ? '#86efac' : 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: '#fff', border: 'none',
                  padding: '15px', borderRadius: '12px',
                  fontWeight: 700, fontSize: '1rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: loading ? 'none' : '0 4px 16px rgba(22,163,74,0.3)',
                  transition: 'all 0.2s',
                  letterSpacing: '0.02em',
                }}
              >
                {loading ? 'Creating game...' : '🎮 Create Game & Go Live'}
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#9ca3af', marginTop: '12px' }}>
                Your game will be visible to all players once created
              </p>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Creategame;