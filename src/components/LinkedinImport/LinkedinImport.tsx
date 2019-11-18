import React, {useEffect, useState} from 'react';
import copy from 'copy-to-clipboard';
import './LinkedinImport.css';
import {toast} from 'react-toastify';

export function LinkedinImport() {
  const [linkedinExportJs, setLinkedinExportJs] = useState('');
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/linkedinExport.txt')
      .then(res => res.text())
      .then(setLinkedinExportJs);
  }, []);

  const copyLink = () => {
    copy(linkedinExportJs);
    toast.info(`Code snippet copied to clipboard!`);
  };

  return (
    <>
      <div className="import-title">To import your resume from Linkedin</div>
      <ol>
        <li><a href="#" onClick={copyLink}>Click here</a>&nbsp;to copy the code snippet to your your clipboard</li>
        <li>Go to your Linkedin profile page (make sure you're logged in)</li>
        <li>Open devtools and paste the code snippet in the console tab</li>
        <li>Run it. You should see a downloaded file named json-resume.json</li>
        <li>Drag the file back to this window</li>
      </ol>
      <button className='linkedin-btn' onClick={copyLink}></button>
    </>
  );
}
