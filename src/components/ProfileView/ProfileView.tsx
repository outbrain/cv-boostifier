import React, {useCallback, useContext, useState} from 'react';
import './ProfileView.scss';
import {ProfileEditor} from '../ProfileEditor/ProfileEditor';
import {LinkedinImport} from '../LinkedinImport/LinkedinImport';
import {ProfileContext} from '../../context/ProfileContext';
import {Resume} from '../../models';
import {useDropzone} from 'react-dropzone';
import {toast} from 'react-toastify';

export function ProfileView() {
  const [linkedinOpen, setLinkedinOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const profileContext = useContext(ProfileContext);
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();
    setShowEditor(false);
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      try {
        const decoder = new TextDecoder("utf-8");
        const data = decoder.decode(reader.result as ArrayBuffer);
        const resume = JSON.parse(data) as Resume;
        if (!resume.basics || !resume.basics.name) {
          throw new Error('Wrong resume format');
        }
        profileContext.setProfile(resume);
        setLinkedinOpen(false);
        setShowEditor(true);
        toast.info(`Data imported successfully for '${resume.basics.name}'`);
      } catch (err) {
        console.error(err);
        toast.error(`Could not load JSON Resume file :( Please make sure it's the valid format`);
      }
    };

    acceptedFiles.forEach((file:any) => reader.readAsArrayBuffer(file));
  }, [profileContext]);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true
  });
  return (
    <div className="profile-view" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive && <div className="drag-active">Drop your JSON Resume here...</div>}
      <div className="profile-wrapper">
        <div className="view-title">STEP 1: <span>Set your Data</span></div>
        <div className="profile-edit-import-selection">
          <div className="profile-edit-import-selection-title">
            <div>* CV Geekifier supports the <a href="https://jsonresume.org/" target="_blank" rel="noopener noreferrer">JSON Resume</a> format</div>
          </div>
          <div className="profile-edit-drop-msg">Drop your JSON file anywhere on this page</div>
          <div className="profile-edit-btns">
            <button onClick={() => setLinkedinOpen(!linkedinOpen)}>Export from Linkedin</button>
            <button onClick={() => setShowEditor(!showEditor)}>Edit JSON</button>
          </div>
          {linkedinOpen && <LinkedinImport />}
          <div className="profile-editor">
            {showEditor && <ProfileEditor profile={profileContext.profile}/>}
          </div>
        </div>

      </div>
    </div>
  );
}
