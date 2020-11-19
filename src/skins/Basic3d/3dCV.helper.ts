import {WebGLRenderer} from "three";
import {CSS3DObject, CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";
import {encodeProfile} from "../../context/ProfileContext";
import {Resume} from "../../models";


export const attachRenderers = function(rendererWebgl: WebGLRenderer, rendererCss: CSS3DRenderer) {
  const divCss = document.createElement( 'div' );
  divCss.classList.add('css');
  divCss.appendChild(rendererCss.domElement);
  const divWebgl = document.createElement( 'div' );
  divWebgl.classList.add('webgl');
  divWebgl.appendChild(rendererWebgl.domElement);
  const renderersContainer = document.createElement( 'div' );
  renderersContainer.appendChild(divCss);
  renderersContainer.appendChild(divWebgl);
  renderersContainer.classList.add('rendererClass')

  if ( document.getElementsByClassName('cv-viewer-wrapper skin-Basic3d mode-edit').length) {
    if (!document.getElementsByClassName('cv-container').length) {
      document.getElementsByClassName('cv-viewer-wrapper skin-Basic3d mode-edit')[0].appendChild(renderersContainer);
    }
  } else {
    document.getElementsByClassName('cv-viewer-wrapper skin-Basic3d mode-view')[0].appendChild(renderersContainer);
  }
}

export const iframeCV = function ( x: number, y: number, z: number, profile: Resume) : CSS3DObject  {
  const div = document.createElement( 'div' );
  div.classList.add('cv-container');
  div.style.width = '900px';
  div.style.height = '1100px';
  div.style.zIndex = '1';
  div.style.backgroundColor = 'white';
  const iframe = document.createElement( 'iframe' );
  iframe.style.width = '900px';
  iframe.style.height = '1100px';
  iframe.style.border = '0px';
  iframe.src =[ 'https://outbrain.github.io/cv-boostifier/viewer?skin=Basic#' + encodeProfile(profile)].join( '' );
  div.appendChild( iframe );
  const object = new CSS3DObject( div );

  object.position.set( x, y, z );
  object.rotation.x =  - Math.PI / 2;
  return object;
};
