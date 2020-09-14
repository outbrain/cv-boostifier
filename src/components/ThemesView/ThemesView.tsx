import React, {useContext} from 'react';
import './ThemesView.css';
import {ThemeContext} from '../../context/ThemeContext';
import {Link} from 'react-router-dom';
import {ITheme} from '../../themes/themes';
import {Header} from '../Header/Header';
export function ThemesView() {
  const {setTheme, themes} = useContext(ThemeContext);
  const getThemeEl = (t: ITheme) => {
    return <div key={t.name} className="theme">
            <img src={t.image} alt=""/>
            <div className="theme-details">
              <div className="theme-name">{t.displayName}</div>
              <div className="theme-created-by">By {t.createdBy || 'unknown'}</div>
            </div>
            <div className="theme-btn">
              <Link to="/viewer"><button className="btn-view-theme" onClick={() => setTheme(t)}>View</button></Link>
            </div>
          </div>
  };
  return (
    <div className="themes-view">
      <Header />
      <div className="view-title">Skins</div>
      <div className="themes-wrapper">
        <div className="themes">
          {themes.map(t => getThemeEl(t))}
        </div>
      </div>
      <div className="footer">
        <Link to="/profile">{"< Back"}</Link>
      </div>
    </div>
  );
}
