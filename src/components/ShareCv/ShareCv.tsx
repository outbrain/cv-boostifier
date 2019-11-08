import React, {useContext} from 'react';
import copy from 'copy-to-clipboard';
import './ShareCv.css';
import shareImg from './share.png';
import {encodeProfile, IProfileContext, ProfileContext} from '../../context/ProfileContext';
import {ThemeContext} from '../../context/ThemeContext';

export const getCvLink = (profileContext: IProfileContext, theme: string) => {
  const encodedProfile = encodeProfile(profileContext.profile);
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  return `${baseUrl}?theme=${theme}&viewMode=true#${encodedProfile}`;
};

export function ShareCv() {
  const profileContext = useContext(ProfileContext);
  const themeContext = useContext(ThemeContext);

  const copyLink = () => {
    const link = getCvLink(profileContext, themeContext.theme);

    copy(link);
    alert(`Share link copied clipboard!`);
  };

  return (
    <button className='share-btn' onClick={copyLink} title="Copy sharable link">
      <img width="64" src={shareImg} alt="Share Link to CV" />
    </button>
  );
}
