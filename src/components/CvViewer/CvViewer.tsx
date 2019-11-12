import React, {useContext} from 'react';
import './CvViewer.css';
import {ThemeContext} from '../../context/ThemeContext';
import {ProfileContext} from '../../context/ProfileContext';
import {SqlTheme} from '../SqlTheme/SqlTheme';
import {SwaggerTheme} from '../SwaggerTheme/SwaggerTheme';
import {Link} from 'react-router-dom';
import {ShareCv} from '../ShareCv/ShareCv';

export const CvViewer = (props: any) => {
  const {theme}= useContext(ThemeContext);
  const profileContext = useContext(ProfileContext);
  return (
    <div className="cv-viewer-wrapper">
      {theme === 'sql' && <SqlTheme profile={profileContext.profile}></SqlTheme>}
      {theme === 'swagger' && <SwaggerTheme profile={profileContext.profile}/>}
      { props.mode !== 'view' && <div className="cv-viewer-footer"><Link to='/profile'>X</Link></div>}
      { props.mode !== 'view' && <ShareCv />}
    </div>
  )
};
