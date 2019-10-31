import React, {useContext} from 'react';
import './CvViewer.css';
import {ThemeContext} from '../../context/ThemeContext';
import {ProfileContext} from '../../context/ProfileContext';
import {SqlTheme} from '../SqlTheme/SqlTheme';

export const CvViewer: React.FC = () => {
  const {theme}= useContext(ThemeContext);
  const {profile}= useContext(ProfileContext);
  if (theme === 'sql') {
    return <SqlTheme profile={profile}></SqlTheme>
  } else {
    return <div>No viewer...</div>
  }
};
