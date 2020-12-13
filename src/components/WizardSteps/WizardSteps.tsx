import React from 'react';
import './WizardSteps.scss';
export function WizardSteps({ activeStep }: { activeStep: number }) {
  return (
    <div className="wizard-steps-wrapper flex">
      <div className={`step ${activeStep > 1 ? 'done' : ''} ${activeStep === 1 ? 'active' : ''}`}>
        <h2><span>1</span></h2>
        <p>Set Your Data</p>
      </div>
      <div className={`step ${activeStep > 2 ? 'done' : ''} ${activeStep === 2 ? 'active' : ''}`}>
        <h2><span>2</span></h2>
        <p>Pick a Skin</p>
      </div>
      <div className={`step ${activeStep === 3 ? 'active' : ''}`}>
        <h2><span>3</span></h2>
        <p>Share</p>
      </div>
    </div>
  );
}
