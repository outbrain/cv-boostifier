import React, { Component, RefObject, CSSProperties } from 'react';
import ReactDOM from 'react-dom';

import './Popup.scss';

interface IPortalPopupProps {
  className?: string
}

interface IPopupProps {
  className?: string
  style?: any
  show: boolean
  closeCallback: any
  children: any
  closeButtonImage: any
  refCallback?: string | ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined
}

const isSSR: boolean = typeof document === 'undefined';
let portalRoot: any = null;

if (!isSSR) {
  portalRoot = document.getElementById('popup-portal') as HTMLDivElement;

  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'popup-portal');
    document.body.append(portalRoot);
  }
}

class PortalPopup extends Component<IPortalPopupProps> {
  private el: HTMLElement;

  constructor(props: any) {
    super(props);
    
    const div = document?.createElement('div');
    div.className = props.className;
    this.el = div;
  }
  
  componentDidMount = () => {
    portalRoot.appendChild(this.el);
  }
  
  componentWillUnmount = () => {
    portalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export class Popup extends Component<IPopupProps> {
  render() {
    const style: CSSProperties = Object.assign({}, this.props.style || {});

    if (!this.props.show) {
      return null;
    }

    return (
      <PortalPopup className={`popup ${this.props.className || ''}`}>
        <div className="overlay" onClick={(e: any) => this.props.closeCallback(e)}></div>
        <div className="popup-content" style={style} ref={this.props.refCallback}>
          {this.props.children}
          <button title="Close" className="close-popup" onClick={(e: any) => this.props.closeCallback(e)}>
            {this.props.closeButtonImage}
          </button>
        </div>
      </PortalPopup>
    );
  }

  componentDidMount() {
    document?.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document?.removeEventListener('keydown', this._handleKeyDown.bind(this));
  }

  _handleKeyDown = (e: KeyboardEvent) => {
    const { show, closeCallback } = this.props;
    
    if (show && e.keyCode === 27) {
      closeCallback(e);
    }
  }
};