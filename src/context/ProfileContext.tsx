import * as React from 'react'
import {createContext, PropsWithChildren, useState} from 'react';
import defaultProfile from '../default.profile.json';
import {Resume} from '../models';

export interface IProfileContext {
  profile: Resume;
  setProfile: (profile: Resume) => void;
}
const encodeProfile = (profile: Resume) => btoa(escape(JSON.stringify(profile)));
const decodeProfile = (profileStr: string) => JSON.parse(unescape(atob(profileStr)));

const ProfileContext = createContext({} as IProfileContext);

function ProfileProvider(props: PropsWithChildren<any>) {
  const {hash} = window.location;
  let initialProfile: Resume;
  if (hash) {
    initialProfile = decodeProfile(hash.substring(1));
  } else {
    initialProfile = defaultProfile;
  }
  const [profile, setProfile] = useState(initialProfile);

  return (
    <ProfileContext.Provider value={{
      profile,
      setProfile
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
