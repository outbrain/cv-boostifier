import React, {useContext} from 'react';
import './ThemesView.css';
import {ThemeContext} from '../../context/ThemeContext';
import term from './term.png';
import swagger from './swagger.png';
import {Link} from 'react-router-dom';
import {ViewHeader} from '../ViewHeader/ViewHeader';
export function ThemesView() {
  const {setTheme, theme} = useContext(ThemeContext);
  return (
    <div className="themes-view">
      <ViewHeader title="Choose Theme"/>
      <div className="themes-wrapper">
        <div className="themes">
          <div className={"theme " + (theme ==='sql' ? 'active' : '')} onClick={() => setTheme('sql')}>
            <div>SQL Terminal</div>
            <img src={term} alt=""/>
          </div>
          <div className={"theme " + (theme ==='swagger' ? 'active' : '')} onClick={() => setTheme('swagger')}>
            <div>Swagger</div>
            <img src={swagger} alt="" />
          </div>
        </div>
      </div>
      <div className="footer">
        <Link to="/">{"<< Back"}</Link>
        {theme && <Link to="/profile">{"Next >>"}</Link>}
      </div>
    </div>
  );
}
