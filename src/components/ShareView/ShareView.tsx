import React, {PropsWithChildren, useContext, useState} from 'react';
import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ShareView.scss';
import {encodeProfile, IProfileContext, ProfileContext} from '../../context/ProfileContext';
import { toast } from 'react-toastify';
import { SkinContext } from '../../context/SkinContext';
import { WizardSteps } from '../WizardSteps/WizardSteps';
export const getCvLink = async (profileContext: IProfileContext, skin: string): Promise<string> => {
  const data = encodeProfile(profileContext.profile);
  const link = `${document.location.origin}/cv-boostifier/viewer?skin=${skin}&data=${data}`;
  return link;
};

export function ShareView(props: PropsWithChildren<any>) {
  const {skin} = useContext(SkinContext);
  const profileContext = useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  const copyLink = async () => {
    setLoading(true);
    try {
      const link = await getCvLink(profileContext, skin.name);
      copy(link);
      toast.info('Share link copied to clipboard!');
    }
    catch (err) {
      toast.error('Failed creating link :(');
      console.log(err);
    }
    setLoading(false);
  };

  async function share(shareType: 'facebook' | 'twitter' | 'email') {
    let url = await getCvLink(profileContext, skin.name);

    switch (shareType) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
        case 'twitter':
          url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=My Cool CV - Made with CV Boostifier`;
        break;
      case 'email':
        url = `mailto:mail@host.com?subject=My Cool CV - Made with CV Boostifier&body=${url}`;
        break;
    }

    const left = 20;
    const top = 20;
    const popup = window.open(url, '', 'scrollbars=no,height=400,width=500,left=' + left + ',top=' + top + '');
    if (popup && window.focus) {
      popup.focus();
    }
  }

  return (
    <div className="wizard-view share-view special-bg center">
      <div className="character"></div>
      <div className="wrapper">
        <WizardSteps activeStep={3} />
        <h2 className="crazy-title">Woo Hoo You Rock</h2>
        <div className="share-preview">
          <img src={require(`../../skins/${skin.component}/preview.png`)} alt=""/>
          <footer className="skin-meta">
            <h4>{skin.displayName}</h4>
            <p>By&nbsp;
              {skin.createdBy?.map((by, ix) => (
                by.link ? <a key={`by_${by.name}_${ix}}`} href={by.link} target="_blank" rel="noopener noreferrer">{by.name}</a> : <span key={`by_${by.name}_${ix}}`}>{by.name}</span>
              ))}
            </p>
          </footer>
          <div className="social-toolbar">
            <span>Share</span>
            <button onClick={() => share('twitter')}>
              <i className="fab fa-twitter"></i>
            </button>
            <button onClick={() => share('facebook')}>
              <i className="fab fa-facebook-f"></i>
            </button>
            <button onClick={() => share('email')}>
              <i className="far fa-envelope"></i>
            </button>
          </div>
        </div>
        <p className="share-info">
          You’ve selected the "<strong>{skin.displayName}</strong>” skin,<br />
          your data is already inside, now everything is ready to find your next dream job! <br />
          All you have left to do is to send your awesome CV, <br />
          and expect a lot of responses!
        </p>
        {loading && <div className="share-loading"></div>}
        <button className="button primary" onClick={copyLink} title="Copy link">Copy link to clipboard</button>
        <p className="url-shortener-copy">We know, it's a very long url. To make it a bit more pretty, <br />use a url shortener service such as <a href="https://www.shorturl.at/" target="_blank" rel="noopener noreferrer">https://www.shorturl.at/</a></p>
      </div>
    </div>
  );
}
