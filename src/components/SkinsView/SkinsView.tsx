import React, { useContext, useState } from "react";
import "./SkinsView.scss";
import { SkinContext } from "../../context/SkinContext";
import { ISkin } from "../../skins/models";
import { CvViewer } from "../CvViewer/CvViewer";
import { WizardSteps } from "../WizardSteps/WizardSteps";
import { Link } from "react-router-dom";
import { ProfileEditor } from "../ProfileEditor/ProfileEditor";
import { ProfileContext } from "../../context/ProfileContext";
import { Popup } from "../Popup/Popup";
export function SkinsView() {
  const { skins, setSkin } = useContext(SkinContext);
  const [selectedSkin, setSelectedSkin] = useState<ISkin | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [previewPopupOpened, setPreviewPopupOpened] = useState(false);
  const profileContext = useContext(ProfileContext);

  const setSkinAndContext = (s: ISkin | null) => {
    setSelectedSkin(s);
    profileContext.setConfig({});
    if (s) {
      setSkin(s);
    }
  };

  const openPreview = (e: any, s: ISkin) => {
    e.stopPropagation();
    setSkinAndContext(s);
    (window as any).gtag("event", "skin_preview", { skinName: s.name });
    setPreviewPopupOpened(true);
  };

  const getSkinEl = (s: ISkin) => {
    const createdBy = s.createdBy || [];
    if (!createdBy.length) {
      createdBy.push({ name: "Unknown" });
    }
    return (
      <div
        key={s.name}
        className={"skin " + (s === selectedSkin ? " skin-selected" : "")}
        title="Click to select"
        onClick={() =>
          setSkinAndContext(s.name === selectedSkin?.name ? null : s)
        }
      >
        <img src={require(`../../skins/${s.component}/preview.png`)} alt="" />
        <footer className="skin-meta">
          <h4>
            {s.displayName}
            <button
              title="Preview"
              style={{
                backgroundImage: `url(${require("../../images/union.png")})`,
              }}
              onClick={(e) => openPreview(e, s)}
            ></button>
          </h4>
          <p>
            By&nbsp;
            {s.createdBy?.map((by, ix) =>
              by.link ? (
                <a
                  key={`by_${by.name}_${ix}}`}
                  href={by.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {by.name}
                </a>
              ) : (
                <span key={`by_${by.name}_${ix}}`}>{by.name}</span>
              )
            )}
          </p>
        </footer>
      </div>
    );
  };

  return (
    <div className="wizard-view special-bg">
      <div className="skins-view wrapper">
        <WizardSteps activeStep={2} />
        <div className="title-wrapper flex">
          <h3 className="view-title">Pick a Skin</h3>
          <button
            className="button secondary"
            onClick={() => setShowEditor(true)}
          >
            Edit Data
          </button>
        </div>
        <div className="skins">{skins.map((s) => getSkinEl(s))}</div>
        {selectedSkin && (
          <Link className="button primary floating" to="/wizard/share">
            I'm ready to get my awesome CV
          </Link>
        )}
      </div>
      <Popup
        closeButtonImage={
          <img src={require("../../images/close-white.png")} alt="" />
        }
        closeCallback={() => setShowEditor(false)}
        show={showEditor}
        className="profile-editor-popup"
      >
        <ProfileEditor profile={profileContext.profile} />
      </Popup>
      <Popup
        closeButtonImage={
          <img src={require("../../images/close-blue.png")} alt="" />
        }
        closeCallback={() => setPreviewPopupOpened(false)}
        show={previewPopupOpened}
        className="preview-skin-popup"
      >
        <CvViewer skin={selectedSkin} mode="edit"></CvViewer>
      </Popup>
    </div>
  );
}
