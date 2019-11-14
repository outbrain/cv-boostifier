import React from 'react';
import './ViewHeader.css';
import {Logo} from '../Logo/Logo';

export function ViewHeader({title}: any) {
  return (
    <div className="view-header">
      <div className="header-logo"><Logo/></div>
      <div className="title header-title">{title}</div>
    </div>
  );
}
