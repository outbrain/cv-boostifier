import React from 'react';
import {ProfileProvider} from './context/ProfileContext';
import {ThemeProvider} from './context/ThemeContext';
import {CvViewer} from './components/CvViewer/CvViewer';
import {HomeView} from './components/HomeView/HomeView';
import {ThemesView} from './components/ThemesView/ThemesView';
import {ProfileView} from './components/ProfileView/ProfileView';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
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
`);
  const searchParams = new URLSearchParams(window.location.search);
  const viewMode = searchParams.get('mode') === 'view';
  return (
    <ThemeProvider>
      <ProfileProvider>
        {viewMode && <CvViewer mode='view'/>}
        {!viewMode && <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route exact path="/">
                <HomeView />
              </Route>
              <Route path="/themes">
                <ThemesView />
              </Route>
              <Route path="/profile">
                <ProfileView />
              </Route>
              <Route path="/viewer">
                <CvViewer />
              </Route>
            </Switch>
        </Router>}
      </ProfileProvider>
    </ThemeProvider>
  );
};

export default App;
