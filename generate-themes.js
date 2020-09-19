const { statSync, readdirSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path')

const THEMES_PATH = './src/themes';
const template = `
import {ITheme} from './models';

export const THEMES: ITheme[] = ## THEMES ##;
`

function getDirectories(path) {
  return readdirSync(path).filter(function (file) {
    return statSync(path+'/'+file).isDirectory();
  });
}

function getManifest(theme) {
  let jsonData = {};
  try {
    jsonData = JSON.parse(readFileSync(join(THEMES_PATH, theme, 'manifest.json'), 'utf-8'))
  } catch {
    console.log('missing manifest file for theme ' + theme);
  }

  return jsonData;
}


const themes = getDirectories(THEMES_PATH)
  .map(theme => {
    console.log(`found theme: ${theme}`);
    const manifest = getManifest(theme);
    return {
      name: theme,
      displayName: manifest.displayName || theme,
      component: theme,
      createdBy: manifest.createdBy || []
    }
  });

const themesStr = JSON.stringify(themes, null, 2);

const themeFileContent = template.replace('## THEMES ##', themesStr);

writeFileSync(join(THEMES_PATH, 'themes.ts'), themeFileContent);

console.log(`Themes file was created successfully`);
