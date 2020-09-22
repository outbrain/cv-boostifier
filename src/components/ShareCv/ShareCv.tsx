import React, {PropsWithChildren, useContext, useState} from 'react';
import copy from 'copy-to-clipboard';
import './ShareCv.scss';
import {encodeProfile, IProfileContext, ProfileContext} from '../../context/ProfileContext';
import { toast } from 'react-toastify';
export const getCvLink = async (profileContext: IProfileContext, skin: string): Promise<string> => {
  const data = encodeProfile(profileContext.profile);
  const link = `${document.location.origin}/cv-boostifier/viewer?skin=${skin}#${data}`;
  console.log(`Link is: ${link}`);
  return link;
};

export function ShareCv(props: PropsWithChildren<any>) {
  const profileContext = useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  const { skin } = props;
  const copyLink = async () => {
    setLoading(true);
    try {
      const link = await getCvLink(profileContext, skin.name);
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
      <button onClick={copyLink} title="Copy sharable link">Get Sharable link</button>
    </>
  );
}
