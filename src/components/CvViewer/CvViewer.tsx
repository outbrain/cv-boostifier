import React, {useContext} from 'react';
import './CvViewer.scss';
import loadable from '@loadable/component';
import {ProfileContext} from '../../context/ProfileContext';
import {SkinContext} from '../../context/SkinContext';

const DynamicComponent = loadable((props: any) => import(`../../skins/${props.name}/${props.name}`), {
    resolveComponent: (module, props) => module[props.name],
    cacheKey: props => props.name,
    fallback: <div className="viewer-loading">Loading...</div>
  });

export const CvViewer = (props: any) => {
  let {skin, mode} = props;
  const skinContext = useContext(SkinContext);
  if (!skin) {
    skin = skinContext.skin;
  }
  const profileContext = useContext(ProfileContext);
  return (
    <div className={`cv-viewer-wrapper skin-${skin.name} mode-${mode}`}>
      <DynamicComponent name={skin.component} profile={profileContext.profile} />
    </div>
  )
};
