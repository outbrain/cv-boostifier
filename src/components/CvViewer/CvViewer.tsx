import React, {useContext} from 'react';
import './CvViewer.css';
import {ThemeContext} from '../../context/ThemeContext';
import {ProfileContext} from '../../context/ProfileContext';
import {Link} from 'react-router-dom';
import loadable from '@loadable/component';

const DynamicComponent = loadable((props: any) => import(`../../themes/${props.name}/${props.name}`), {
    resolveComponent: (module, props) => module[props.name]
  });

export const CvViewer = (props: any) => {
  const {theme}= useContext(ThemeContext);
  const profileContext = useContext(ProfileContext);
  const hasProfile = profileContext.hasProfile();
  const viewMode = props.mode === 'view';
  return (
    <div className="cv-viewer-wrapper">
      { hasProfile && <DynamicComponent name={theme.component} profile={profileContext.profile} />}
      { !hasProfile && viewMode && <div className="cv-viewer-loader">Loading...</div>}
      { !viewMode && <Link className="back-btn" to='/themes'>{"< Back"}</Link>}
    </div>
  )
};
