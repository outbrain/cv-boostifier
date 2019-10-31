import React from 'react';
import {ProfileProvider} from './context/ProfileContext';
import {ThemeProvider} from './context/ThemeContext';
import {CvViewer} from './components/CvViewer/CvViewer';
import {Logo} from './components/Logo/Logo';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <CvViewer/>
        <Logo />
      </ProfileProvider>
    </ThemeProvider>
  );
}

export default App;
