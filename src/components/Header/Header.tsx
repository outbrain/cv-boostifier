import React from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import './Header.scss';

export function Header() {
  const history = useHistory();

  function isActiveHash(pageName: string | null, hashStr: string | null): boolean {
    const { hash } = history.location;

    if (hash === hashStr) {
      return true;
    }

    return false;
  }

  return (
    <header className="header-wrapper">
      <div className="wrapper flex">
        <Link to="/" className="header-logo">
          <svg viewBox="0 0 50 50" fill="#00adb5" id="svg_icon.secondary" width="30" height="30">
            <g id="surface1" fill="#00adb5">
              <path d="M 3 3 C 1.355469 3 0 4.355469 0 6 L 0 47 L 50 47 L 50 6 C 50 4.355469 48.644531 3 47 3 Z M 3 5 L 47 5 C 47.566406 5 48 5.433594 48 6 L 48 9 L 2 9 L 2 6 C 2 5.433594 2.433594 5 3 5 Z M 2 11 L 48 11 L 48 45 L 2 45 Z M 28.90625 14.96875 C 28.863281 14.976563 28.820313 14.988281 28.78125 15 C 28.453125 15.074219 28.179688 15.308594 28.0625 15.625 L 19.0625 37.625 C 18.855469 38.144531 19.105469 38.730469 19.625 38.9375 C 20.144531 39.144531 20.730469 38.894531 20.9375 38.375 L 29.9375 16.375 C 30.085938 16.046875 30.046875 15.660156 29.832031 15.371094 C 29.621094 15.078125 29.265625 14.925781 28.90625 14.96875 Z M 15.9375 20.96875 C 15.90625 20.976563 15.875 20.988281 15.84375 21 C 15.722656 21.019531 15.605469 21.0625 15.5 21.125 L 8.5 25.125 C 8.183594 25.300781 7.984375 25.636719 7.984375 26 C 7.984375 26.363281 8.183594 26.699219 8.5 26.875 L 15.5 30.875 C 15.984375 31.152344 16.597656 30.984375 16.875 30.5 C 17.152344 30.015625 16.984375 29.402344 16.5 29.125 L 11.03125 26 L 16.5 22.875 C 16.96875 22.675781 17.214844 22.160156 17.070313 21.671875 C 16.925781 21.183594 16.4375 20.878906 15.9375 20.96875 Z M 33.8125 21 C 33.386719 21.066406 33.046875 21.398438 32.976563 21.824219 C 32.90625 22.25 33.117188 22.675781 33.5 22.875 L 38.96875 26 L 33.5 29.125 C 33.015625 29.402344 32.847656 30.015625 33.125 30.5 C 33.402344 30.984375 34.015625 31.152344 34.5 30.875 L 41.5 26.875 C 41.816406 26.699219 42.015625 26.363281 42.015625 26 C 42.015625 25.636719 41.816406 25.300781 41.5 25.125 L 34.5 21.125 C 34.292969 21.003906 34.050781 20.957031 33.8125 21 Z " fill="#00adb5"></path>
            </g>
          </svg>
        </Link>
        <nav className="flex">
          <NavLink activeClassName={history.location.hash || history.location.pathname !== '/' ? '' : 'active'} to="/">Home</NavLink>
          <NavLink activeClassName="active" to="/wizard">CV Maker</NavLink>
          <Link className={isActiveHash(null, '#take-a-tour') ? 'active' : ''} to="/#take-a-tour">Take a Tour</Link>
          <Link className={isActiveHash(null, '#how-it-works') ? 'active' : ''} to="/#how-it-works">How it Works</Link>
          <Link className={isActiveHash(null, '#faq') ? 'active' : ''} to="/#faq">FAQ</Link>
        </nav>
      </div>
    </header>
  );
}
