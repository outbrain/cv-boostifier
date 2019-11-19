import * as React from 'react'
import {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import defaultProfile from '../default.profile.json';
import {Resume} from '../models';
import {getURLParam} from '../utils';
import {ThemeContext} from './ThemeContext';
import {ITheme} from '../themes/themes';

export interface IProfileContext {
  profile: Resume;
  setProfile: (profile: Resume) => void;
  getName: () => string;
  hasProfile: () => boolean;
}
const encodeProfile = (profile: Resume) => btoa(escape(JSON.stringify(profile)));
const decodeProfile = (profileStr: string) => JSON.parse(unescape(atob(profileStr)));

const ProfileContext = createContext({} as IProfileContext);

function ProfileProvider(props: PropsWithChildren<any>) {
  const themeContext = useContext(ThemeContext);
  const profileId = getURLParam('v');
  let initialProfile: Resume = profileId ? {} : defaultProfile;
  const [profile, setProfile] = useState(initialProfile);
  const getName = () => {
    if (profile && profile.basics && profile.basics.name) {
      return profile.basics.name;
    }
    return '';
  };

  const hasProfile = () => {
    return profile && Object.keys(profile).length > 0;
  };

  useEffect(() => {
    async function fetchProfile(id: string) {
      try {
        const response = await fetch(`/.netlify/functions/get-profile?id=${id}`);
        const { data: res} = await response.json();
        setProfile(decodeProfile(res.data));
        themeContext.setTheme( themeContext.getTheme(res.theme) as ITheme);
      } catch (err) {
        console.error(err);
      }
    }
    if (profileId && !(profile && Object.keys(profile).length > 0)) {
      fetchProfile(profileId);
    }
  }, []);

  return (
    <ProfileContext.Provider value={{
      profile,
      setProfile,
      getName,
      hasProfile
    }}>
      {props.children}
    </ProfileContext.Provider>
  )
}

export {
  ProfileProvider,
  ProfileContext,
  encodeProfile,
  decodeProfile
}
