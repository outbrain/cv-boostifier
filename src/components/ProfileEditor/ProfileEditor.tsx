/// <reference path="./jsoneditor-react.d.ts" />
import React, {useContext} from 'react';
import './ProfileEditor.css';
import {ProfileContext} from '../../context/ProfileContext';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import {Resume} from '../../models';

declare const ace: any;

export function ProfileEditor() {
  const profileContext = useContext(ProfileContext);
  return (
    <div className="profile-editor-wrapper">
      <Editor
        value={profileContext.profile}
        onChange={(profile: Resume) => profileContext.setProfile(profile)}
        mode='code'
        ace={ace}
      />
    </div>
  )
}


