import React, {PropsWithChildren, useState} from 'react';
import './Adventure.scss';
import {IProfileProps} from '../../models';
import { EducationComponent } from './components/Education/EducationComponent';

export function Adventure(props: PropsWithChildren<IProfileProps>) {
  const {basics, skills, work, education, references, projects, publications, languages} = props.profile;
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = () => {
    const containerElement = document.getElementById("scrollWrapper");
    const leftScroll = containerElement === null ? 0 : containerElement.scrollTop;
    const topScroll = containerElement === null ? 0 : containerElement.scrollLeft;
    setScrollLeft(leftScroll); 
    setScrollTop(topScroll); 
  }
  return (
    <div>
      <div className="figure"></div>
      <div id="scrollWrapper" className="adventure outer-wrapper" onScroll={handleScroll}>
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
