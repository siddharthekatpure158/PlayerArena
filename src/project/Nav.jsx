import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import HomePage from './HomePage'
import Creategame from './Creategame'
import Play from './Play'
import Getgames from './Getgames'

const NavLink = ({ to, icon, label }) => {
  const location = useLocation()
  const isActive = location.pathname === to
  const [hovered, setHovered] = useState(false)

  return (
    <li style={{ listStyle: 'none' }}>
      <Link
        to={to}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          padding: '9px 18px',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.9rem',
          transition: 'all 0.2s ease',
          background: isActive ? '#166534' : hovered ? '#f0fdf4' : 'transparent',
          color: isActive ? '#fff' : hovered ? '#166534' : '#4b5563',
          borderBottom: isActive ? '2px solid #16a34a' : '2px solid transparent',
        }}
      >
        <span style={{ fontSize: '1rem' }}>{icon}</span>
        {label}
      </Link>
    </li>
  )
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#fff',
      borderBottom: scrolled ? '1px solid #e5e7eb' : '1px solid #f3f4f6',
      boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.07)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 28px',
        height: '64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, #16a34a, #15803d)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem',
            boxShadow: '0 4px 12px rgba(22,163,74,0.3)',
          }}>⚽</div>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: '1.4rem',
            color: '#111827',
            letterSpacing: '0.01em',
          }}>
            Player<span style={{ color: '#16a34a' }}>Arena</span>
          </span>
        </Link>

        {/* Nav Links */}
        <ul style={{ display: 'flex', gap: '4px', margin: 0, padding: 0 }}>
          <NavLink to="/play"  icon="▶️" label="Play"  />
          <NavLink to="/train" icon="🏋️" label="Train" />
          <NavLink to="/book"  icon="📅" label="Book"  />
        </ul>

        
        <Link to="/book" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'linear-gradient(135deg, #16a34a, #15803d)',
            color: '#fff',
            border: 'none',
            padding: '10px 22px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: '0 4px 14px rgba(22,163,74,0.3)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(22,163,74,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(22,163,74,0.3)' }}
          >
            Book Now
          </button>
        </Link>

      </div>
    </nav>
  )
}


const Nav = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"      element={<HomePage />} />
        <Route path='/creategame' element={<Creategame/>}/>
        <Route path='/play' element={<Play/>}/>
        <Route path='/getgames' element={<Getgames/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Nav