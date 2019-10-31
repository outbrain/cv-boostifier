import React from 'react';
import './Logo.css';
import logo from './outbrainLogo.png';
export function Logo() {
  return (
    <div className="logo-wrapper">
      <div>
        <span className="powered-by">Powered by</span>
        <img src={logo} alt='Outbrain' />
      </div>
    </div>
  )
}


