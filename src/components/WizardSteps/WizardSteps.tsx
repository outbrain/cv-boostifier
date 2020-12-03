import React from 'react';
import './WizardSteps.scss';
export function WizardSteps({ activeStep }: { activeStep: number }) {
  return (
    <div className="wizard-steps-wrapper flex">
      <div className={`step ${activeStep === 1 ? 'active' : ''}`}>
        <h2>1</h2>
        <p>Set Your Data</p>
      </div>
      <div className={`step ${activeStep === 2 ? 'active' : ''}`}>
        <h2>2</h2>
        <p>Pick a Skin</p>
      </div>
      <div className={`step ${activeStep === 3 ? 'active' : ''}`}>
        <h2>3</h2>
        <p>Share</p>
      </div>
    </div>
  );
}
