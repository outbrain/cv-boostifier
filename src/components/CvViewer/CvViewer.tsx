import React, {useContext} from 'react';
import './CvViewer.css';
import {ThemeContext} from '../../context/ThemeContext';
import {ProfileContext} from '../../context/ProfileContext';
import {Link} from 'react-router-dom';
import {ShareCv} from '../ShareCv/ShareCv';

export const CvViewer = (props: any) => {
  const {theme}= useContext(ThemeContext);
  const profileContext = useContext(ProfileContext);
  const hasProfile = profileContext.hasProfile();
  const viewMode = props.mode === 'view';
  const ThemeComponent = theme.component;
  return (
    <div className="cv-viewer-wrapper">
      { hasProfile && <ThemeComponent profile={profileContext.profile} />}
      { !hasProfile && viewMode && <div className="cv-viewer-loader">Loading...</div>}
      { !viewMode && <div className="cv-viewer-footer"><Link to='/profile'>X</Link></div>}
      { !viewMode && <ShareCv />}
    </div>
  )
};
