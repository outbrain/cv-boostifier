import React, {useCallback, useContext, useState} from 'react';
import './ProfileView.css';
import {ProfileEditor} from '../ProfileEditor/ProfileEditor';
import {Link} from 'react-router-dom';
import {ViewHeader} from '../ViewHeader/ViewHeader';
import {LinkedinImport} from '../LinkedinImport/LinkedinImport';
import {ProfileContext} from '../../context/ProfileContext';
import {Resume} from '../../models';
import {useDropzone} from 'react-dropzone';
import linkedinImg from '../../images/linkedin.png';
import fileImg from '../../images/file.png';
import jsonImg from '../../images/json.png';
import {toast} from 'react-toastify';

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
        const resume = JSON.parse(data) as Resume;
        if (!resume.basics || !resume.basics.name) {
          throw new Error('Wrong resume format');
        }
        profileContext.setProfile(resume);
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
      <ViewHeader title="Set Your Profile Data"/>
      <div className="profile-wrapper">
        <div className="profile-edit-import-selection">
          <div className="profile-edit-import-selection-title">
            CV Geekifier supports the <a href="https://jsonresume.org/" target="_blank" rel="noopener noreferrer">JSON Resume</a> format
          </div>
          <ul>
            <li className={type === 'linkedin' ? ' active' : ''} onClick={() => setType('linkedin')}>
              <img src={linkedinImg} alt=""/>
              <span>Import from Linkedin</span>
            </li>
            <li className={type === 'file' ? ' active' : ''}  onClick={() => setType('file')}>
              <img src={fileImg} alt=""/>
              <span>Import from File</span>
            </li>
            <li className={type === 'json' ? ' active' : ''} onClick={() => setType('json')}>
              <img src={jsonImg} alt=""/>
              <span>Edit Manually</span>
            </li>
          </ul>
        </div>
        {type === 'linkedin' && <LinkedinImport />}
        {type === 'file' && <div className="file-import">Drop your <a href="https://jsonresume.org/" target="_blank" rel="noopener noreferrer">JSON Resume</a>&nbsp; file here</div> }
        {type === 'json' && <div className="profile-editor"><ProfileEditor /></div>}
      </div>
      <div className="footer">
        <Link to="/themes">{"<< Back"}</Link>
        <Link to="/viewer">{"Go!"}</Link>
      </div>
    </div>
  );
}
