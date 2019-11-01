/// <reference path="./jsoneditor-react.d.ts" />
import React, {useContext, useState} from 'react';
import './ProfileEditor.css';
import {ProfileContext} from '../../context/ProfileContext';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import {IProfile} from '../../models';


export function ProfileEditor() {
  const profileContext = useContext(ProfileContext);
  return (
    <div className="profile-editor-wrapper">
      <Editor
        value={profileContext.profile}
        onChange={(profile:IProfile) => profileContext.setProfile(profile)}
      />
    </div>
  )
}


