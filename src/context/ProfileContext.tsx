import * as React from 'react'
import {createContext, PropsWithChildren, useState} from 'react';
import defaultProfile from '../default.profile.json';
import {Resume} from '../models';

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
  const urlParams = new URLSearchParams(document.location.search);
  const profileStr = urlParams.get('data');
  let profileObj = null;
  if (profileStr) {
    try {
      profileObj = decodeProfile(profileStr);
    } catch (e) {
      console.log('Failed to decode profile', e);
    }
  }
  let initialProfile: Resume = profileObj || defaultProfile;
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
