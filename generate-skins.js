const { statSync, readdirSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path')

const SKINS_PATH = './src/skins';
const template = `
import {ISkin} from './models';

export const SKINS: ISkin[] = ## SKINS ##;
`

function getDirectories(path) {
  return readdirSync(path).filter(function (file) {
    return statSync(path+'/'+file).isDirectory();
  });
}

function getManifest(skin) {
  let jsonData = {};
  try {
    jsonData = JSON.parse(readFileSync(join(SKINS_PATH, skin, 'manifest.json'), 'utf-8'))
  } catch {
    console.log('missing manifest file for skin ' + skin);
  }

  return jsonData;
}


const skins = getDirectories(SKINS_PATH)
  .map(skin => {
    console.log(`found skin: ${skin}`);
    const manifest = getManifest(skin);
    return {
      name: skin,
      displayName: manifest.displayName || skin,
      component: skin,
      createdBy: manifest.createdBy || []
    }
  });

const skinsStr = JSON.stringify(skins, null, 2);

const skinFileContent = template.replace('## SKINS ##', skinsStr);

writeFileSync(join(SKINS_PATH, 'skins.ts'), skinFileContent);

console.log(`Skins file was created successfully`);
