import React, {PropsWithChildren, useState} from 'react';
import './Adventure.scss';
import {IProfileProps} from '../../models';
import { EducationComponent } from './components/Education/EducationComponent';

export function Adventure(props: PropsWithChildren<IProfileProps>) {
  const {basics, skills, work, education, references, projects, publications, languages} = props.profile;
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  return (
    <div onScroll={(e) => {setScrollLeft(e.target.scrollTop); setScrollTop(e.target.scrollLeft);} }>
      <div className="figure"></div>
      <div className="adventure outer-wrapper">
        <div className="wrapper">
          <section className="lvl-basics slide one"></section>
          {education != undefined ? <EducationComponent data={education} scrollLeft={scrollLeft} scrollTop={scrollTop}/> : <div/> }
          <section className="lvl-awards slide"></section>
          <section className="lvl-interests slide"></section>
          <section className="languages"></section>
          <section className="meta"></section>
          <section className="projects"></section>
          <section className="publications"></section>
          <section className="references"></section>
          <section className="skills"></section>
          <section className="volunteer"></section>
          <section className="work"></section>
        </div>
      </div>
    </div>
  );
}
