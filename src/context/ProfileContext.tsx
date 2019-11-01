import * as React from 'react'
import {createContext, PropsWithChildren, useState} from 'react';
import {defaultProfile, IProfile} from '../models';

interface IProfileContext {
  profile: IProfile;
  setProfile: (profile: IProfile) => void;
}
const encodeProfile = (profile: IProfile) => btoa(JSON.stringify(profile));
const decodeProfile = (profileStr: string) => JSON.parse(atob(profileStr));

const ProfileContext = createContext({} as IProfileContext);

function ProfileProvider(props: PropsWithChildren<any>) {
  const {hash} = window.location;
  let initialProfile: IProfile;
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
