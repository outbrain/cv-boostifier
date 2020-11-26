import React from 'react';
import './HomeView.scss';
import {Link} from 'react-router-dom';

export function HomeView() {
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
      <section id="take-a-tour" className="wrapper">

      </section>
      <section id="how-it-works" className="wrapper">

      </section>
      <section id="faq" className="wrapper">

      </section>
    </div>
  );
}
