import React, { PropsWithChildren, useState } from "react";
import "./Adventure.scss";
import { IProfileProps } from "../../models";
import { EducationComponent } from "./components/Education/EducationComponent";
import { Figure } from "./components/Figure/Figure";
import { BasicsComponent } from "./components/Basics/Basics";
import { SkillsComponent } from "./components/Skills/Skills";
import { WorkComponent } from "./components/Work/Work";
import { ReferenceComponent } from "./components/Reference/ReferenceComponent";
import { Floor } from "./components/Floor/Floor";
import { utils } from "./utils/Utils";
import { AwardComponent } from "./components/Award/Award";
import { LanguageComponent } from "./components/Language/Language";
import { ProjectComponent } from "./components/Project/ProjectComponent";
import { PublicationComponent } from "./components/Publication/Publication";
import { VolunteerComponent } from "./components/Volunteer/Volunteer";

export function Adventure(props: PropsWithChildren<IProfileProps>) {
  const {
    basics,
    skills,
    work,
    education,
    references,
    awards,
    interests,
    projects,
    publications,
    languages,
    volunteer,
  } = props.profile;
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [screenSize, setScreenSize] = useState(0);
  const MOUNTS_MOVEMENT_RATIO = 0.1;
  const MOUNTS_STARTING_OFFSET = 0.9;
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
        <div className="wrapper sky-day">
          <div
            className="mountains-far full-width"
            style={{
              backgroundPositionX: utils.moveElement(
                screenSize * MOUNTS_STARTING_OFFSET,
                scrollLeft,
                MOUNTS_MOVEMENT_RATIO
              ),
            }}
          >
            <div className="mountains">
              <div className="sky">
                <div className="clouds2"></div>
              </div>
              {basics && (
                <BasicsComponent
                  data={basics}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {education && (
                <EducationComponent
                  data={education}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {references && (
                <ReferenceComponent
                  data={references}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {work && (
                <WorkComponent
                  data={work}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {skills && (
                <SkillsComponent
                  data={skills}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                  title="Skills"
                />
              )}
              {awards && (
                <AwardComponent
                  data={awards}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {interests && (
                <SkillsComponent
                  data={interests}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                  title="Interests"
                />
              )}
              {languages && (
                <LanguageComponent
                  data={languages}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {projects && (
                <ProjectComponent
                  data={projects}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {publications && (
                <PublicationComponent
                  data={publications}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {volunteer && (
                <VolunteerComponent
                  data={volunteer}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              <Floor worldSize={20000} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
