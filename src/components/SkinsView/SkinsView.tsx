import React, {useContext, useState} from 'react';
import './SkinsView.scss';
import {SkinContext} from '../../context/SkinContext';
import {ISkin} from '../../skins/models';
import {ShareCv} from '../ShareCv/ShareCv';
import {CvViewer} from '../CvViewer/CvViewer';
export function SkinsView() {
  const {skins, skin, setSkin} = useContext(SkinContext);
  const [selectedSkin, setSelectedSkin] = useState(skin);

  const setSkinAndContext = (s: ISkin) => {
    setSelectedSkin(s);
    setSkin(s);
  }

  const getSkinEl = (s: ISkin) => {
    const createdBy = (s.createdBy || []);
    if (!createdBy.length) {
      createdBy.push({ name: 'Unknown' });
    }
    return <div key={s.name} className={"skin " + ((s === selectedSkin) ? " skin-selected" : "")} onClick={() => setSkinAndContext(s)}>
            <img src={require(`../../skins/${s.component}/preview.png`)} alt=""/>
            <div className="skin-details">
              <div className="skin-name">{s.displayName}</div>
              <div className="skin-created-by">By {createdBy.map((cb, ix) =>
                <span key={ix}>
                  <a key={cb.name} href={cb.link || '#'}>{cb.name || 'Unknown'}</a> {ix === createdBy.length - 1 ? '' : '&'}
                </span>)}
              </div>
            </div>
            <div className="skin-btn" onClick={() => setSkinAndContext(s)}>
              <ShareCv skin={s} />
            </div>
          </div>
  };

  return (
    <div className="skins-view">
      <div className="view-title">STEP 2: <span>Choose a Skin</span></div>
      <div className="skins-wrapper">
        <div className="skins">
          {skins.map(s => getSkinEl(s))}
        </div>
        <div className="skin-preview">
          {selectedSkin && <CvViewer skin={selectedSkin}></CvViewer> }
        </div>
      </div>
    </div>
  );
}
