import * as React from 'react'
import {createContext, PropsWithChildren, useState} from 'react';

interface IThemeContext {
  theme?: string;
  themes?: string[];
  setTheme?: (theme: string) => void;
}

const ThemeContext = createContext({} as IThemeContext);

function ThemeProvider(props: PropsWithChildren<any>) {
 const themes = ['sql', 'swagger', 'frontend', 'backend'];
  const searchParams = new URLSearchParams(window.location.search);
  const initialTheme = searchParams.get('theme') || themes[0];
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
