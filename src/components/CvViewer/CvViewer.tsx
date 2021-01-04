import React, {useContext, useEffect} from 'react';
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
  useEffect(() => {
    if (mode === 'view' && skin && profileContext) {
      (window as any).gtag('event', 'cv_view', {
        userName: btoa(profileContext?.profile?.basics?.name || ''),
        skinName: skin.name
      });
    }
  }, [mode, profileContext, skin]);
  return (
    <div className={`cv-viewer-wrapper skin-${skin.name} mode-${mode}`}>
      <DynamicComponent 
        name={skin.component}
        profile={profileContext.profile}
        config={profileContext.config}
        onConfigChanged={profileContext.setConfig}
        mode={mode} 
      />
      <a className="credits" href={`${document.location.origin}/`} target="_blank" rel="noopener noreferrer">
        Proudly created with <strong>CV Boostifier</strong>
      </a>
    </div>
  )
};
