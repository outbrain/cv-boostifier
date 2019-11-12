import React from 'react';
import './HomeView.css';
import {Link} from 'react-router-dom';

export function HomeView() {
  return (
    <div className="home-view">
      <Link to="/themes">START HERE</Link>
    </div>
  );
}
