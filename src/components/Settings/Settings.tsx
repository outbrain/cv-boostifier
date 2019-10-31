import React, {useContext, useState} from 'react';
import './Settings.css';
import {ThemeContext} from '../../context/ThemeContext';
import {Logo} from '../Logo/Logo';
export function Settings() {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const themeContext = useContext(ThemeContext);
  const changeTheme = (theme: string) => themeContext.setTheme(theme);
  return (
    <div className={'settings-wrapper ' + (open ? 'settings-wrapper-open' : '')}>
      <div className="settings-page">
        <div className="form-group">
          <div className="form-label">Change Theme</div>
          <div className="form-field">
            <button onClick={() => changeTheme('sql')}>SQL</button>
            <button onClick={() => changeTheme('swagger')}>Swagger</button>
            <button onClick={() => changeTheme('frontend')}>Frontend</button>
          </div>
        </div>
      </div>
      <div className="settings-handle" onClick={toggleOpen}></div>
      <Logo />
    </div>
  )
}


