import React, {useContext, useEffect, useState} from 'react';
import copy from 'copy-to-clipboard';
import './LinkedinImport.css';
import linkedinImg from './linkedin.png';

export function LinkedinImport() {
  const [linkedinExportJs, setLinkedinExportJs] = useState('');
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/linkedinExport.txt')
      .then(res => res.text())
      .then(setLinkedinExportJs);
  }, []);

  const copyLink = () => {
    copy(linkedinExportJs);
    alert(`
Code copied clipboard! Now follow these steps to import your resume from Linkedin:
1. Log in to linkedin, go to your profile page
2. Open devtools and paste the code snippet in the console tab
3. Run it, you should see a downloaded file named json-resume.json
4. Drag the file back to this window
            `);
  };

  return (
    <button className='linkedin-btn' onClick={copyLink} title={`
To import your resume from Linkedin:
1. Click here to copy the code snippet to your your clipboard
2. Log in to linkedin, go to your profile page
3. Open devtools and paste the code snippet in the console tab
4. Run it, you should see a downloaded file named json-resume.json
5. Drag the file back to this window
    `}>
      <img width="64" src={linkedinImg} alt="" />
    </button>
  );
}
