import * as React from 'react'
import {createContext, PropsWithChildren, useState} from 'react';
import {getURLParam} from '../utils';
import {THEMES} from '../themes/themes';
import {ITheme} from '../themes/models';

interface IThemeContext {
  theme: ITheme;
  themes: ITheme[];
  setTheme: (theme: ITheme) => void;
  getTheme: (name: string) => ITheme | undefined;
}

const ThemeContext = createContext({} as IThemeContext);

function ThemeProvider(props: PropsWithChildren<any>) {
  const themes = THEMES;
  const getTheme = (name: string) => themes.find(t => t.name === name);
  const initialTheme = getTheme(getURLParam('theme')) || themes[0];
  const [theme, setTheme] = useState(initialTheme);

  return (
    <ThemeContext.Provider value={{
      theme,
      themes,
      setTheme,
      getTheme
    }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export {
  ThemeProvider,
  ThemeContext
}
