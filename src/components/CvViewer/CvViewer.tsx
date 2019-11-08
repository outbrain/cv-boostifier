import React, {useCallback, useContext} from 'react';
import './CvViewer.css';
import {ThemeContext} from '../../context/ThemeContext';
import {ProfileContext} from '../../context/ProfileContext';
import {SqlTheme} from '../SqlTheme/SqlTheme';
import {SwaggerTheme} from '../SwaggerTheme/SwaggerTheme';
import {Resume} from '../../models';
import {useDropzone} from 'react-dropzone';

export const CvViewer: React.FC = () => {
  const {theme}= useContext(ThemeContext);
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
    <div className="cv-viewer-wrapper" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive && <div className="drop-active">Drop your JSON Resume here...</div>}
      {theme === 'sql' && <SqlTheme profile={profileContext.profile}></SqlTheme>}
      {theme === 'swagger' && <SwaggerTheme profile={profileContext.profile}/>}
    </div>
  )
};
