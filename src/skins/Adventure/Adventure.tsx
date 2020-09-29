import React, {PropsWithChildren, useState} from 'react';
import './Adventure.scss';
import {IProfileProps} from '../../models';
import { EducationComponent } from './components/Education/EducationComponent';
import { Figure } from './components/Figure/Figure';
import {BasicsComponent} from "./components/Basics/Basics";

export function Adventure(props: PropsWithChildren<IProfileProps>) {
  const {basics/*TODO: Daniel*/, skills/*TODO: Daniel*/, work /*TODO: Ohad*/, education/*TODO: Yonatan*/, references, projects/*TODO: Yonatan*/, publications, languages/*TODO: Ohad*/} = props.profile;
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [screenSize, setScreenSize] = useState(0);


  const handleScroll = () => {
    const containerElement = document.getElementById("scrollWrapper");
    const leftScroll = containerElement === null ? 0 : containerElement.scrollTop;
    const topScroll = containerElement === null ? 0 : containerElement.scrollLeft;
    const screenSize = containerElement === null ? 0 : containerElement.scrollHeight;
    setScrollLeft(leftScroll);
    setScrollTop(topScroll);
    setScreenSize(screenSize);
  }

  return (
    <div>
      <Figure scrollLeft={scrollLeft}/>
      <div id="scrollWrapper" className="adventure outer-wrapper" onScroll={handleScroll}>
        <div className="wrapper">
          {basics !== undefined ? <BasicsComponent   data={basics} screenSize={screenSize} scrollLeft={scrollLeft} scrollTop={scrollTop}/> : <div/> }
          {/*{education !== undefined ? <EducationComponent data={education} screenSize={screenSize} scrollLeft={scrollLeft} scrollTop={scrollTop}/> : <div/> }*/}
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
