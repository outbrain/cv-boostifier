import React from 'react';
import {ProfileProvider} from './context/ProfileContext';
import {ThemeProvider} from './context/ThemeContext';
import {CvViewer} from './components/CvViewer/CvViewer';
import {Logo} from './components/Logo/Logo';
import {Settings} from './components/Settings/Settings';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <CvViewer/>
        <Settings />
      </ProfileProvider>
    </ThemeProvider>
  );
}

export default App;
