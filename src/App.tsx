import React from 'react';
import {ProfileProvider} from './context/ProfileContext';
import {ThemeProvider} from './context/ThemeContext';
import {CvViewer} from './components/CvViewer/CvViewer';
import {HomeView} from './components/HomeView/HomeView';
import {ThemesView} from './components/ThemesView/ThemesView';
import {ProfileView} from './components/ProfileView/ProfileView';
import 'react-toastify/dist/ReactToastify.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {getURLParam} from './utils';
import {ToastContainer} from 'react-toastify';
import {consoleLogo} from './console-logo';
import {Header} from './components/Header/Header';
const App: React.FC = () => {
  console.log(consoleLogo, 'font-size: 12px; color: #EE6412');
  const viewMode = !!getURLParam('v');
  return (
    <ThemeProvider>
      <ProfileProvider>
        <ToastContainer/>
        {viewMode && <CvViewer mode='view'/>}
        {!viewMode && <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route exact path="/">
                <HomeView />
              </Route>
              <Route path="/themes">
                <Header />
                <ProfileView />
                <ThemesView />
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
