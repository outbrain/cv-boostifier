import React, {useContext} from 'react';
import copy from 'copy-to-clipboard';
import './ShareCv.css';
import {encodeProfile, IProfileContext, ProfileContext} from '../../context/ProfileContext';
import {ThemeContext} from '../../context/ThemeContext';

export const getCvLink = (profileContext: IProfileContext, theme: string) => {
  const encodedProfile = encodeProfile(profileContext.profile);
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  return `${baseUrl}?theme=${theme}&mode=view#${encodedProfile}`;
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
    <button className='share-btn' onClick={copyLink} title="Copy sharable link"> </button>
  );
}
