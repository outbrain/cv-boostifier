import React, {PropsWithChildren} from 'react';
import './Adventure.scss';
import {IProfileProps} from '../../models';

export function Adventure(props: PropsWithChildren<IProfileProps>) {
  const {basics, skills, work, education, references, projects, publications, languages} = props.profile;

  return (
    <div className="adventure flex">
      <div className="figure"></div>
      <div className="section basics"></div>
      <div className="section awards"></div>
      <div className="section education"></div>
      <div className="section interests"></div>
      <div className="section languages"></div>
      <div className="section meta"></div>
      <div className="section projects"></div>
      <div className="section publications"></div>
      <div className="section references"></div>
      <div className="section skills"></div>
      <div className="section volunteer"></div>
      <div className="section work"></div>
    </div>
  );
}
