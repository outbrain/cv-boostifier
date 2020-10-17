import React, { PropsWithChildren, useState } from "react";
import "./Adventure.scss";
import { IProfileProps } from "../../models";
import { EducationComponent } from "./components/Education/EducationComponent";
import { Figure } from "./components/Figure/Figure";
import { BasicsComponent } from "./components/Basics/Basics";
import { SkillsComponent } from "./components/Skills/Skills";
import { WorkComponent } from "./components/Work/Work";
import { ReferencesComponent } from "./components/References/ReferencesComponent";
import { Floor } from "./components/Floor/Floor";

export function Adventure(props: PropsWithChildren<IProfileProps>) {
  const {
    basics /*TODO: Daniel*/,
    skills /*TODO: Daniel*/,
    work /*TODO: Ohad*/,
    education /*TODO: Yonatan*/,
    references /*TODO: Ohad*/,
    projects /*TODO: Yonatan*/,
    publications /*TODO: Yonatan*/,
    languages /*TODO: Ohad*/,
  } = props.profile;
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [screenSize, setScreenSize] = useState(0);

  const handleScroll = () => {
    const containerElement = document.getElementById("scrollWrapper");
    const leftScroll =
      containerElement === null ? 0 : containerElement.scrollTop;
    const topScroll =
      containerElement === null ? 0 : containerElement.scrollLeft;
    const screenSize =
      containerElement === null ? 0 : containerElement.scrollHeight;
    setScrollLeft(leftScroll);
    setScrollTop(topScroll);
    setScreenSize(screenSize);
  };

  return (
    <div className="adventure-skin">
      <Figure scrollLeft={scrollLeft} isFemale={true} />
      <div
        id="scrollWrapper"
        className="adventure outer-wrapper"
        onScroll={handleScroll}
      >
        <div className="wrapper">
          {basics !== undefined ? (
            <BasicsComponent
              data={basics}
              screenSize={screenSize}
              scrollLeft={scrollLeft}
              scrollTop={scrollTop}
            />
          ) : (
            <div />
          )}
          {/* {education !== undefined ? (
            <EducationComponent
              education={education}
              screenSize={screenSize}
              scrollLeft={scrollLeft}
              scrollTop={scrollTop}
            />
          ) : (
            <div />
          )} */}
          {/* {references !== undefined ? (
            <ReferencesComponent
              references={[...references,...references,...references]}
              screenSize={screenSize}
              scrollLeft={scrollLeft}
              scrollTop={scrollTop}
            />
          ) : (
            <div className="undefiend-projects"/>
          )} */}
          {work !== undefined ? (
            <WorkComponent
              data={work}
              screenSize={screenSize}
              scrollLeft={scrollLeft}
              scrollTop={scrollTop}
            />
          ) : (
            <div />
          )}
           {skills !== undefined ? <SkillsComponent data={skills} screenSize={screenSize} scrollLeft={scrollLeft} scrollTop={scrollTop}/> : <div/> }
          <section className="skills"></section>
          <section className="lvl-awards slide"></section>
          <section className="lvl-interests slide"></section>
          <section className="languages"></section>
          <section className="meta"></section>
          <section className="projects"></section>
          <section className="publications"></section>
          <section className="volunteer"></section>
          <section className="work"></section>
          <Floor worldSize={20000}/>
        </div>
      </div>
    </div>
  );
}
