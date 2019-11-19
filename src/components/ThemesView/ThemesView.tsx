import React, {useContext} from 'react';
import './ThemesView.css';
import {ThemeContext} from '../../context/ThemeContext';
import {Link} from 'react-router-dom';
import {ViewHeader} from '../ViewHeader/ViewHeader';
import {ITheme} from '../../themes/themes';
export function ThemesView() {
  const {setTheme, theme, themes} = useContext(ThemeContext);
  const getThemeEl = (t: ITheme) => {
    return <div key={t.name} className={"theme " + (t.name === theme.name ? 'active' : '')} onClick={() => setTheme(t)}>
            <div>{t.displayName}</div>
            <img src={t.image} alt=""/>
          </div>
  };
  return (
    <div className="themes-view">
      <ViewHeader title="Choose Theme"/>
      <div className="themes-wrapper">
        <div className="themes">
          {themes.map(t => getThemeEl(t))}
        </div>
      </div>
      <div className="footer">
        <Link to="/">{"<< Back"}</Link>
        {theme && <Link to="/profile">{"Next >>"}</Link>}
      </div>
    </div>
  );
}
