import React, {useContext} from 'react';
import './CvViewer.scss';
import loadable from '@loadable/component';
import {ProfileContext} from '../../context/ProfileContext';
import {ThemeContext} from '../../context/ThemeContext';

const DynamicComponent = loadable((props: any) => import(`../../themes/${props.name}/${props.name}`), {
    resolveComponent: (module, props) => module[props.name],
    cacheKey: props => props.name,
    fallback: <div className="viewer-loading">Loading...</div>
  });

export const CvViewer = (props: any) => {
  let {theme} = props;
  const themeContext = useContext(ThemeContext);
  if (!theme) {
    theme = themeContext.theme;
  }
  const profileContext = useContext(ProfileContext);
  return (
    <div className="cv-viewer-wrapper">
      <DynamicComponent name={theme.component} profile={profileContext.profile} />
    </div>
  )
};
