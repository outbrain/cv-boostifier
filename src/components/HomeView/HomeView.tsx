import React, { useContext } from 'react';
import './HomeView.scss';
import {SkinContext} from '../../context/SkinContext';
import {Link} from 'react-router-dom';

export function HomeView() {
  const {skins} = useContext(SkinContext);

  function makeId(length = 6) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
  
  return (
    <div className="home-view">
      <section id="hero" className="wrapper center">
        <h1>CV <br />Boostifier</h1>
        <h2>Make your CV cool again!</h2>
        <div className="hero-copy">
          <p>
            <strong>Developers & engineers</strong> - this one is for you! 👇🏻
          </p>
          <ul>
            <li>Have you always wanted to have an online CV that looks cool?</li>
            <li>Do you want your CV to shine above other candidates?</li>
            <li>Have you ever dreamed about letting recruiters and team leaders to learn about your resume by running SQL queries / playing a game / looking at an HTML page building itself? (Probably no.)</li>
          </ul>
          <p>
            If the answer to one of the above is either (<strong>YES</strong> || <strong>MAYBE</strong>), click the link below, and prepared to be amazed:
          </p>
        </div>
        <div className="buttons-wrapper">
          <Link className="button primary" to="/profile">Make My CV Cool!</Link>
        </div>
      </section>
      <section id="take-a-tour" className="wrapper center">
        <h3>Take a Tour</h3>
        <div className="skins-gallery flex">
          {
            skins.slice(0, 4).map((skin) => (
              <div className="skin" key={`skin_${skin.name}`}>
                <img src={require(`../../skins/${skin.component}/preview.png`)} alt=""/>
                <footer className="skin-meta">
                  <h4>{skin.displayName}</h4>
                  <p>By&nbsp;
                    {skin.createdBy?.map((by) => (
                      by.link ? <a key={`by_${makeId()}`} href={by.link} target="_blank" rel="noopener noreferrer">{by.name}</a> : <span key={`by_${makeId()}`}>{by.name}</span>
                    ))}
                  </p>
                </footer>
              </div>
            ))
          }
        </div>
        <div className="buttons-wrapper">
          <a className="button" href="https://github.com/outbrain/cv-boostifier/blob/master/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Add Your Skin</a>
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
      </section>
    </div>
  );
}
