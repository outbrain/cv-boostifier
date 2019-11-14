import React, {useCallback, useContext, useState} from 'react';
import './ProfileView.css';
import {ProfileEditor} from '../ProfileEditor/ProfileEditor';
import {Link} from 'react-router-dom';
import {ViewHeader} from '../ViewHeader/ViewHeader';
import {LinkedinImport} from '../LinkedinImport/LinkedinImport';
import {ProfileContext} from '../../context/ProfileContext';
import {Resume} from '../../models';
import {useDropzone} from 'react-dropzone';

export function ProfileView() {
  const [type, setType] = useState('');
  const profileContext = useContext(ProfileContext);
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      try {
        const decoder = new TextDecoder("utf-8");
        const data = decoder.decode(reader.result as ArrayBuffer);
        profileContext.setProfile(JSON.parse(data) as Resume);
      } catch (err) {
        console.error(err);
      }
    };

    acceptedFiles.forEach((file:any) => reader.readAsArrayBuffer(file));
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true
  });
  return (
    <div className="profile-view" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive && <div className="drag-active">Drop your JSON Resume here...</div>}
      <ViewHeader title="Set Your Profile Data"/>
      <div className="profile-wrapper">
        <div className="profile-edit-import-selection">
          <div className="profile-edit-import-selection-title">
            CV Geekifier supports the <a href="https://jsonresume.org/" target="_blank">JSON Resume</a> format
          </div>
          <ul>
            <li className={"type-linkedin" + (type === 'linkedin' ? ' active' : '')} onClick={() => setType('linkedin')}><i></i>Import from Linkedin</li>
            <li className={"type-file" + (type === 'file' ? ' active' : '')}  onClick={() => setType('file')}><i></i>Import from File</li>
            <li className={"type-json" + (type === 'json' ? ' active' : '')} onClick={() => setType('json')}><i></i>Edit Manually</li>
          </ul>
          {/*If you already have JSON resume file, just drag it here. You can also <a href="#" onClick={() => setShowLinkedIn(true)}>import it from Linkedin</a>, or use the below editor to enter your own data.*/}
          {/*<div className="linkedin-import" onClick={() => setShowLinkedIn(true)}>*/}
          {/*  Import from Linkedin*/}
          {/*</div>*/}
        </div>
        {type === 'linkedin' && <LinkedinImport />}
        {type === 'file' && <div className="file-import">Drop your <a href="https://jsonresume.org/" target="_blank">JSON Resume</a>&nbsp; file here</div> }
        {type === 'json' && <div className="profile-editor"><ProfileEditor /></div>}
      </div>
      <div className="footer">
        <Link to="/themes">{"<< Back"}</Link>
        <Link to="/viewer">{"Go!"}</Link>
      </div>
    </div>
  );
}
