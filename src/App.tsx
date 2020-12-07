import React from 'react';
import {ProfileProvider} from './context/ProfileContext';
import {SkinProvider} from './context/SkinContext';
import {CvViewer} from './components/CvViewer/CvViewer';
import {HomeView} from './components/HomeView/HomeView';
import {SkinsView} from './components/SkinsView/SkinsView';
import {ProfileView} from './components/ProfileView/ProfileView';
import {ShareView} from './components/ShareView/ShareView';
import 'react-toastify/dist/ReactToastify.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Redirect
} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {consoleLogo} from './console-logo';
import {Header} from './components/Header/Header';
import {Footer} from './components/Footer/Footer';

function isViewer(): boolean {
  const { hash } = document.location;

  if (!hash) {
    return false;
  }

  if (hash.length < 100) {
    return false;
  }

  return true;
}

const App: React.FC = () => {
  console.log(consoleLogo, 'font-size: 12px; color: #EE6412');

  const viewMode = isViewer();

  return (
    <SkinProvider>
      <ProfileProvider>
        <ToastContainer/>
          {
            viewMode && 
            <CvViewer mode='view'/>
          }
          {
            !viewMode && 
            <Router basename={process.env.PUBLIC_URL}>
              <Switch>
                <Route exact path="/">
                  <Header />
                  <HomeView />
                  <Footer />
                </Route>
                <Route path="/wizard/profile">
                  <Header />
                  <ProfileView />
                  <Footer />
                </Route>
                <Route path="/wizard/skins">
                  <Header />
                  <SkinsView />
                  <Footer />
                </Route>
                <Route path="/wizard/share">
                  <Header />
                  <ShareView />
                  <Footer />
                </Route>
                <Route path="/viewer">
                  <CvViewer mode="view"/>
                </Route>
                <Redirect from="/wizard" to="/wizard/profile" />
              </Switch>
            </Router>
          }
      </ProfileProvider>
    </SkinProvider>
  );
};

export default App;
