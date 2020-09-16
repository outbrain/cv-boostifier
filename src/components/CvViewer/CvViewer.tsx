import React, {useContext} from 'react';
import './CvViewer.scss';
import {ThemeContext} from '../../context/ThemeContext';
import {ProfileContext} from '../../context/ProfileContext';
import {Link} from 'react-router-dom';

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
      { !viewMode && <Link className="back-btn" to='/themes'>{"< Back"}</Link>}
    </div>
  )
};
