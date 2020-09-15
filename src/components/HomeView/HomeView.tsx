import React from 'react';
import './HomeView.css';
import {Link} from 'react-router-dom';
import {Logo} from '../Logo/Logo';

export function HomeView() {
  return (
    <div className="home-view">
      <div className="logo-container"><Logo/></div>
      <Link to="/themes">START</Link>
    </div>
  );
}
