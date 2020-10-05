import React, {PropsWithChildren} from 'react';
import './ReturnOfTheCV.scss';
import {IProfileProps} from '../../models';

export function ReturnOfTheCV(props: PropsWithChildren<IProfileProps>) {
  const {basics, skills, work, education, references, projects, publications, languages} = props.profile;
  
  return (
    <>
      <div>Hello world</div>
    </>
  );
}
