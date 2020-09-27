import React from 'react';
import {ProfileProvider} from './context/ProfileContext';
import {SkinProvider} from './context/SkinContext';
import {CvViewer} from './components/CvViewer/CvViewer';
import {HomeView} from './components/HomeView/HomeView';
import {SkinsView} from './components/SkinsView/SkinsView';
import {ProfileView} from './components/ProfileView/ProfileView';
import 'react-toastify/dist/ReactToastify.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {consoleLogo} from './console-logo';
import {Header} from './components/Header/Header';
const App: React.FC = () => {
  console.log(consoleLogo, 'font-size: 12px; color: #EE6412');
  const viewMode = !!document.location.hash;
  return (
    <SkinProvider>
      <ProfileProvider>
        <ToastContainer/>
        {viewMode && <CvViewer mode='view'/>}
        {!viewMode && <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route exact path="/">
                <HomeView />
              </Route>
              <Route path="/profile">
                <Header />
                <ProfileView />
              </Route>
              <Route path="/skins">
                <Header />
                <SkinsView />
              </Route>
              <Route path="/viewer">
                <CvViewer mode="view"/>
              </Route>
            </Switch>
        </Router>}
      </ProfileProvider>
    </SkinProvider>
  );
};

export default App;
