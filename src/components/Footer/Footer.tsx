import React from 'react';
import './Footer.scss';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="wrapper center">
        Copyright © {year} CV Boostifier
      </div>
    </footer>
  );
}
