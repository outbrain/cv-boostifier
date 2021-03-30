import React from 'react';
import './Footer.scss';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="wrapper center">
        <p>
          Copyright © {year} CV Boostifier
        </p>
        <p className="credits">
          A project by <a href="https://github.com/tsachis">Tsachi Shushan</a> & <a href="https://github.com/dsternlicht">Daniel Sternlicht</a><br />
          Designed by <a href="http://www.linkedin.com/in/yaniv-stern-3655375a">Yaniv Stern</a>
        </p>
      </div>
    </footer>
  );
}
