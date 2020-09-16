import React, {PropsWithChildren, useContext, useState} from 'react';
import copy from 'copy-to-clipboard';
import './ShareCv.css';
import {encodeProfile, IProfileContext, ProfileContext} from '../../context/ProfileContext';
import { toast } from 'react-toastify';
export const getCvLink = async (profileContext: IProfileContext, theme: string): Promise<string> => {
  const data = encodeProfile(profileContext.profile);
  const link = `${document.location.origin}/viewer?theme=${theme}#${data}`;
  console.log(`Link is: ${link}`);
  return link;
};

export function ShareCv(props: PropsWithChildren<any>) {
  const profileContext = useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  const { theme } = props;
  const copyLink = async () => {
    setLoading(true);
    try {
      const link = await getCvLink(profileContext, theme.name);
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
