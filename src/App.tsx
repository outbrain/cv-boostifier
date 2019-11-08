import React from 'react';
import {ProfileProvider} from './context/ProfileContext';
import {ThemeProvider} from './context/ThemeContext';
import {CvViewer} from './components/CvViewer/CvViewer';
import {Settings} from './components/Settings/Settings';
import {ShareCv} from './components/ShareCv/ShareCv';
import {LinkedinImport} from './components/LinkedinImport/LinkedinImport';

const App: React.FC = () => {
  console.log(`
  made with ♥ by

  ___        _   _          _
 / _ \\ _   _| |_| |__  _ __(_) __ _ _ __
| | | | | | | __| '_ \\| '__| |/ _\` | '_ \\
| |_| | |_| | |_| |_) | |  | | (_| | | | |
 \\___/ \\__,_|\\__|_.__/|_|  |_|\\__,_|_| |_|

 _____             _                      _
| ____|_ __   __ _(_)_ __   ___  ___ _ __(_)_ __   __ _
|  _| | '_ \\ / _\` | | '_ \\ / _ \\/ _ \\ '__| | '_ \\ / _\` |
| |___| | | | (_| | | | | |  __/  __/ |  | | | | | (_| |
|_____|_| |_|\\__, |_|_| |_|\\___|\\___|_|  |_|_| |_|\\__, |
             |___/                                |___/
`)
  const searchParams = new URLSearchParams(window.location.search);
  const viewMode = searchParams.get('viewMode') === 'true';
  return (
    <ThemeProvider>
      <ProfileProvider>
        <CvViewer/>
        {!viewMode && <Settings />}
        {!viewMode && <ShareCv />}
        {!viewMode && <LinkedinImport />}
      </ProfileProvider>
    </ThemeProvider>
  );
}

export default App;
