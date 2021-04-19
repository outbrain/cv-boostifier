import React, { useContext, useEffect, useState } from "react";
import "./HomeView.scss";
import { SkinContext } from "../../context/SkinContext";
import { Link, useHistory } from "react-router-dom";
import { ISkin } from "../../skins/models";
import { Popup } from "../Popup/Popup";
import { CvViewer } from "../CvViewer/CvViewer";
import GitHubButton from "react-github-btn";

export function HomeView() {
  const { skins } = useContext(SkinContext);
  const [selectedSkin, setSelectedSkin] = useState<ISkin | null>(null);
  const [previewPopupOpened, setPreviewPopupOpened] = useState(false);
  const history = useHistory();

  function makeId(length = 6) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const openPreview = (e: any, s: ISkin) => {
    e.stopPropagation();
    setSelectedSkin(s);
    setPreviewPopupOpened(true);
  };

  useEffect(() => {
    history.listen(() => {
      let elm = document.querySelector("body");
      if (document.location.hash) {
        elm = document.querySelector(document.location.hash);
      }

      if (elm) {
        window.setTimeout(() => {
          elm?.scrollIntoView({
            behavior: "smooth",
            inline: "start",
          });
        }, 50);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-view special-bg">
      <section id="hero" className="wrapper center">
        <div className="character"></div>
        <div className="gh-buttons">
          <GitHubButton
            href="https://github.com/outbrain/cv-boostifier"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star outbrain/cv-boostifier on GitHub"
          >
            Star
          </GitHubButton>
          <GitHubButton
            href="https://github.com/outbrain/cv-boostifier/fork"
            data-icon="octicon-repo-forked"
            data-size="large"
            data-show-count="true"
            aria-label="Fork outbrain/cv-boostifier on GitHub"
          >
            Fork
          </GitHubButton>
        </div>
        <h1 className="crazy-title">
          CV <br />
          Boostifier
        </h1>
        <h2>Make your CV cool again!</h2>
        <div className="hero-copy">
          <p>
            <strong>Developers & engineers</strong> - this one is for you! 👇🏻
          </p>
          <ul>
            <li>
              Have you always wanted to have an online CV that looks cool?
            </li>
            <li>Do you want your CV to shine above other candidates?</li>
            <li>
              Have you ever dreamed about letting recruiters and team leaders
              learn about your resume by running SQL queries / playing a game /
              looking at an HTML page building itself? (Probably no.)
            </li>
          </ul>
          <p>
            If the answer to one of the above is either (<strong>YES</strong> ||{" "}
            <strong>MAYBE</strong>), <br />
            click the button below, and prepared to be amazed:
          </p>
        </div>
        <div className="buttons-wrapper">
          <Link className="button primary" to="/wizard/profile">
            Make My CV Cool!
          </Link>
        </div>
      </section>
      <section id="take-a-tour" className="wrapper center">
        <h3>Take a Tour</h3>
        <div className="skins-gallery">
          {skins.slice(0, 4).map((skin) => (
            <div className="skin" key={`skin_${skin.name}`}>
              <img
                src={require(`../../skins/${skin.component}/preview.png`)}
                alt=""
              />
              <footer className="skin-meta">
                <h4>
                  {skin.displayName}
                  <button
                    title="Preview"
                    style={{
                      backgroundImage: `url(${require("../../images/union.png")})`,
                    }}
                    onClick={(e) => openPreview(e, skin)}
                  ></button>
                </h4>
                <p>
                  By&nbsp;
                  {skin.createdBy?.map((by) =>
                    by.link ? (
                      <a
                        key={`by_${makeId()}`}
                        href={by.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {by.name}
                      </a>
                    ) : (
                      <span key={`by_${makeId()}`}>{by.name}</span>
                    )
                  )}
                </p>
              </footer>
            </div>
          ))}
        </div>
        <div className="contribution-copy">
          <p>
            Are you a Frontend Developer? Do you want to contribute your own
            skin to CV Boostifier?
          </p>
          <p>
            Check out our{" "}
            <a
              href="https://github.com/outbrain/cv-boostifier/blob/master/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              contribution guide
            </a>
            .
          </p>
        </div>
      </section>
      <section id="how-it-works" className="wrapper center">
        <h3>How Does it Work</h3>
        <div className="steps-wrapper flex">
          <div className="step">
            <h2>1</h2>
            <p>Import your LinkedIn profile by following a few steps</p>
          </div>
          <div className="step">
            <h2>2</h2>
            <p>Choose a skin from our gallery</p>
          </div>
          <div className="step">
            <h2>3</h2>
            <p>Get a unique link for your brand new cool CV!</p>
          </div>
        </div>
      </section>
      <section id="faq" className="wrapper center">
        <h3>FAQ</h3>
        <div
          className="commonninja_component"
          comp-type="faq"
          comp-id="584d358d-64bf-4d3d-9a5d-302ce1554910"
        ></div>
      </section>
      {previewPopupOpened && (
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
      )}
    </div>
  );
}
