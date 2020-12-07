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
          Designed by <a href="https://medium.com/@yanivstern/pow-84eba3d90925">Yaniv Stern</a>
        </p>
      </div>
    </footer>
  );
}
