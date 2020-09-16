/// <reference path="./jsoneditor-react.d.ts" />
import React, {PropsWithChildren, useContext} from 'react';
import './ProfileEditor.scss';
import {ProfileContext} from '../../context/ProfileContext';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import {IProfileProps, Resume} from '../../models';
import ace from 'ace-builds';
import 'ace-builds/webpack-resolver';

export function ProfileEditor(props: PropsWithChildren<IProfileProps>) {
  const profileContext = useContext(ProfileContext);
  return (
    <div className="profile-editor-wrapper">
      <Editor
        value={props.profile}
        onChange={(profile: Resume) => profileContext.setProfile(profile)}
        mode='code'
        ace={ace}
      />
    </div>
  )
}


