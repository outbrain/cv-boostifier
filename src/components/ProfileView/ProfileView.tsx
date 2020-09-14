import React, {useCallback, useContext, useState} from 'react';
import './ProfileView.css';
import {ProfileEditor} from '../ProfileEditor/ProfileEditor';
import {Link} from 'react-router-dom';
import {LinkedinImport} from '../LinkedinImport/LinkedinImport';
import {ProfileContext} from '../../context/ProfileContext';
import {Resume} from '../../models';
import {useDropzone} from 'react-dropzone';
import {toast} from 'react-toastify';
import {Header} from '../Header/Header';

export function ProfileView() {
  const [linkedinOpen, setLinkedinOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(true);
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
        setShowEditor(true);
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
      <Header />
      <div className="profile-wrapper">
        <div className="view-title">Drop Your CV Here</div>
        <div className="profile-edit-import-selection">
          <div className="profile-edit-import-selection-title">
            <div>CV Geekifier supports files in the <a href="https://jsonresume.org/" target="_blank" rel="noopener noreferrer">JSON Resume</a> format</div>
            <div>To export your CV from Linkedin <button onClick={() => setLinkedinOpen(!linkedinOpen)}>Click here</button></div>
          </div>
          {linkedinOpen && <LinkedinImport />}
          <div className="profile-editor">
            <span className="profile-editor-msg">You can also edit the data here:</span>
            {showEditor && <ProfileEditor profile={profileContext.profile}/>}
          </div>
        </div>

      </div>
      <div className="footer">
        <Link to="/themes">{"Next >"}</Link>
      </div>
    </div>
  );
}
