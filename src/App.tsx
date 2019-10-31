import React from 'react';
import {ProfileProvider} from './context/ProfileContext';
import {ThemeProvider} from './context/ThemeContext';
import {CvViewer} from './components/CvViewer/CvViewer';
import {Settings} from './components/Settings/Settings';

const App: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const hideSettings = searchParams.get('hideSettings') === 'true';
  return (
    <ThemeProvider>
      <ProfileProvider>
        <CvViewer/>
        {!hideSettings && <Settings />}
      </ProfileProvider>
    </ThemeProvider>
  );
}

export default App;
