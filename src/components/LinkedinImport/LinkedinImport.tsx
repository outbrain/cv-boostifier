import React, {useEffect, useState} from 'react';
import copy from 'copy-to-clipboard';
import './LinkedinImport.scss';
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
    <div className="linkedin-tutorial">
      <div className="view-title">
        <img src={require('../../images/linkedin.png')} alt="LinkedIn logo" />
        <span>How to import your CV data from Linkedin</span>
      </div>
      <ol>
        <li>1.&nbsp;<button onClick={copyLink}>Click here</button>&nbsp;to copy the code snippet to your your clipboard</li>
        <li>2.&nbsp;Go to your Linkedin profile page (make sure you're logged in)</li>
        <li>3.&nbsp;Open devtools and paste the code snippet in the console tab</li>
        <li>4.&nbsp;Run it. You should see a downloaded file named json-resume.json</li>
        <li>5.&nbsp;Drag the file back to this window</li>
      </ol>
    </div>
  );
}
