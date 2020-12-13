import * as React from 'react'
import {createContext, PropsWithChildren, useState} from 'react';
import defaultProfile from '../default.profile.json';
import {Resume} from '../models';

export interface IProfileContext {
  profile: Resume;
  setProfile: (profile: Resume) => void;
  getName: () => string;
  hasProfile: () => boolean;
  config: any;
  setConfig: (config: any) => void;
}
const encode = (obj: any) => btoa(escape(JSON.stringify(obj)));
const decode = (str: string) => JSON.parse(unescape(atob(str)));
const encodeProfile = (profile: Resume) => encode(profile);
const decodeProfile = (profileStr: string) => decode(profileStr);
const encodeConfig = (config: any) => encode(config);
const decodeConfig = (configStr: string) => decode(configStr);

const ProfileContext = createContext({} as IProfileContext);

function ProfileProvider(props: PropsWithChildren<any>) {
  const urlParams = new URLSearchParams(document.location.search);
  const profileStr = urlParams.get('data');
  const configStr = urlParams.get('config');
  let profileObj = null;
  if (profileStr) {
    try {
      profileObj = decodeProfile(profileStr);
    } catch (e) {
      console.log('Failed to decode profile', e);
    }
  }
  let configObj = null;
  if (configStr) {
    try {
      configObj = decodeConfig(configStr);
    } catch (e) {
      console.log('Failed to decode config', e);
    }
  }
  let initialProfile: Resume = profileObj || defaultProfile;
  let initialConfig: any = configObj || {};
  const [profile, setProfile] = useState(initialProfile);
  const [config, setConfig] = useState(initialConfig);
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
      hasProfile,
      config,
      setConfig,
    }}>
      {props.children}
    </ProfileContext.Provider>
  )
}

export {
  ProfileProvider,
  ProfileContext,
  encodeProfile,
  decodeProfile,
  encodeConfig
}
