import React, {useContext, useState} from 'react';
import copy from 'copy-to-clipboard';
import './ShareCv.css';
import {encodeProfile, IProfileContext, ProfileContext} from '../../context/ProfileContext';
import {ThemeContext} from '../../context/ThemeContext';
import { toast } from 'react-toastify';
export const getCvLink = async (profileContext: IProfileContext, theme: string): Promise<string> => {
  const data = encodeProfile(profileContext.profile);
  const name = profileContext.getName();
  const response = await fetch(`/.netlify/functions/create-link`, {
    method: 'POST',
    body: JSON.stringify({ theme, data, name })
  });
  const {link} = await response.json();
  console.log(`Link is: ${link}`);
  return link;
};

export function ShareCv() {
  const profileContext = useContext(ProfileContext);
  const themeContext = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  const copyLink = async () => {
    setLoading(true);
    try {
      const link = await getCvLink(profileContext, themeContext.theme.name);
      copy(link);
      toast.info('Share link copied clipboard!');
    }
    catch (err) {
      toast.error('Failed creating link :(');
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <div className="share-loading"></div>}
      <button onClick={copyLink} title="Copy sharable link">Share</button>
    </>
  );
}
