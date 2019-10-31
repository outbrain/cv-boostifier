import * as React from 'react'
import {createContext, PropsWithChildren, useState} from 'react';

interface IThemeContext {
  theme?: string;
  themes?: string[];
  setTheme?: (theme: string) => void;
}

const ThemeContext = createContext({} as IThemeContext);

function ThemeProvider(props: PropsWithChildren<any>) {
 const themes = ['sql', 'frontend', 'backend'];
  const initialTheme = themes[0];
  const [theme, setTheme] = useState(initialTheme);

  return (
    <ThemeContext.Provider value={{
      theme,
      themes,
      setTheme
    }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export {
  ThemeProvider,
  ThemeContext
}
