import React, {useContext, useState} from 'react';
import './ThemesView.scss';
import {ThemeContext} from '../../context/ThemeContext';
import {ITheme} from '../../themes/models';
import {ShareCv} from '../ShareCv/ShareCv';
import {CvViewer} from '../CvViewer/CvViewer';
export function ThemesView() {
  const {themes} = useContext(ThemeContext);
  const [theme, setTheme] = useState(null as any);

  const setThemeAndLog = (t: any) => {
    setTheme(t);
  }
  const getThemeEl = (t: ITheme) => {
    const createdBy = (t.createdBy || []);
    if (!createdBy.length) {
      createdBy.push({ name: 'Unknown' });
    }
    return <div key={t.name} className={"theme " + ((t === theme) ? " theme-selected" : "")} onClick={() => setThemeAndLog(t)}>
            <img src={require(`../../themes/${t.component}/preview.png`)} alt=""/>
            <div className="theme-details">
              <div className="theme-name">{t.displayName}</div>
              <div className="theme-created-by">By {createdBy.map((cb, ix) =>
                <span key={ix}>
                  <a key={cb.name} href={cb.link || '#'}>{cb.name || 'Unknown'}</a> {ix === createdBy.length - 1 ? '' : '&'}
                </span>)}
              </div>
            </div>
            <div className="theme-btn" onClick={() => setTheme(t)}>
              <ShareCv theme={t} />
            </div>
          </div>
  };

  return (
    <div className="themes-view">
      <div className="view-title">STEP 2: <span>Choose a Skin</span></div>
      <div className="themes-wrapper">
        <div className="themes">
          {themes.map(t => getThemeEl(t))}
        </div>
        <div className="theme-preview">
          {theme && <CvViewer theme={theme}></CvViewer> }
        </div>
      </div>
    </div>
  );
}
