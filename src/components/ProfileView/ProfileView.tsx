import React, {useCallback, useContext, useState} from 'react';
import './ProfileView.scss';
import {LinkedinImport} from '../LinkedinImport/LinkedinImport';
import {ProfileContext} from '../../context/ProfileContext';
import {Resume} from '../../models';
import {useDropzone} from 'react-dropzone';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import { WizardSteps } from '../WizardSteps/WizardSteps';

export function ProfileView() {
  const [uploadedName, setUploadedName] = useState('');
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
        setUploadedName(resume.basics.name);
        (window as any).gtag('event', 'cv_upload', {
          userName: resume.basics.name
        });
        profileContext.setProfile(resume);

        toast.info(`Data imported successfully for '${resume.basics.name}'`);
      } catch (err) {
        console.error(err);
        toast.error(`Could not load JSON Resume file :( Please make sure it's the valid format`);
      }
    };

    acceptedFiles.forEach((file:any) => reader.readAsArrayBuffer(file));
  }, [profileContext]);
  const {getRootProps, getInputProps, isDragActive, open} = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true
  });
  return (
    <div className="wizard-view profile-view special-bg" {...getRootProps()}>
      <div className="character"></div>
      <div className="wrapper">
        <WizardSteps activeStep={1} />
        <div className="profile-wrapper">
          <h3 className="view-title">Set your Data</h3>
          <div className={`profile-edit-drop-msg ${uploadedName ? 'post-upload' : ''}`}>
            {
              uploadedName ? 
              `${uploadedName}.json` :
              <>
                <button onClick={open}>Click here</button> to upload your JSON file or just drop it anywhere on this page
              </>
            }
          </div>
          <p>* CV Boostifier supports the <a href="https://jsonresume.org/" target="_blank" rel="noopener noreferrer">JSON Resume</a> format</p>
          <LinkedinImport />
          <div className="buttons-wrapper">
            <Link className={`button primary ${!uploadedName ? 'disabled' : ''}`} to={'/wizard/skins'}>Show me the money</Link>
            <Link className="button" to={'/wizard/skins'}>I prefer the hard way, without data</Link>
          </div>
        </div>
        <div className="file-upload-wrapper">
          <input {...getInputProps()} />
          {isDragActive && <div className="drag-active">Drop your JSON Resume here...</div>}
        </div>
      </div>
    </div>
  );
}
