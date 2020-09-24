import React, {PropsWithChildren} from 'react';
import './Adventure.scss';
import {IProfileProps} from '../../models';

export function Adventure(props: PropsWithChildren<IProfileProps>) {
  const {basics, skills, work, education, references, projects, publications, languages} = props.profile;

  return (
    <div className="adventure flex">
      <div className="figure"></div>
      <div className="basics"></div>
      <div className="awards"></div>
      <section className="education"></section>
      <section className="interests"></section>
      <section className="languages"></section>
      <section className="meta"></section>
      <section className="projects"></section>
      <section className="publications"></section>
      <section className="references"></section>
      <section className="skills"></section>
      <section className="volunteer"></section>
      <section className="work"></section>

    </div>
  );
}
