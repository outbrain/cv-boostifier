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

const inIframe = (): boolean => {
  if (isSSR) {
    return false;
  }
  try {
    return window?.self !== window?.top;
  } catch (e) {
    return true;
  }
}

let parentTopScroll: number = 0;
let parentWindowHeight: number = 0;

// Listen to messages from Common Ninja SDK
if (inIframe()) {
  window?.addEventListener('message', (e) => {
    try {
      const message = JSON.parse(e.data);
  
      switch(message.type) {
        case 'COMMONNINJA_PARENT_WINDOW_SCROLL':
          parentTopScroll = message.fromTop;
          if (message.windowHeight) {
            parentWindowHeight = message.windowHeight;
          }
          break;
        default:
      }
    } catch(e) {}
  });
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
    
    // If popup is inside of an iframe, 
    // and the iframe is bigger than the viewport, set a relative to parent top position
    if (inIframe()) {
      const margin = 20;

      try {
        if (window?.self.innerHeight > window?.top.innerHeight) {
          const scrollTop = window?.top.pageYOffset || window?.top.document?.documentElement.scrollTop;
          style.top = `${scrollTop + margin}px`;
          style.transform = 'translate(-50%, 0)';
        }
      } catch (e) {
        // console.log('Could not set top position to popup.', e.message);
        // Fallback to post messaging method
        if (window?.self.innerHeight > parentWindowHeight) {
          const scrollTop = parentTopScroll < 0 ? Math.abs(parentTopScroll) : 0;
          style.top = `${scrollTop + margin}px`;
          style.transform = 'translate(-50%, 0)';
        }
      }
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