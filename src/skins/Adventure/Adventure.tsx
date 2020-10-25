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
  const FAR_MOUNTS_MOVEMENT_RATIO = -0.95;
  const MOUNTS_MOVEMENT_RATIO = 0.1;
  const [isFemale, setIsFemale] = useState(true);

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
    console.log({ screenSize, leftScroll });
  };

  return (
    <div className="adventure-skin">
      <div className={`scroll-message ${scrollLeft > 500 ? "opacity-0" : ""}`}>
        <div>scroll down to proceed</div>
        <div className="icon-scroll"></div>
      </div>
      <div
        className={`gender-button ${scrollLeft > 500 ? "opacity-0" : ""}`}
        role="group"
      >
        <button
          type="button"
          className="btn"
          onClick={() => setIsFemale(false)}
        >
          male
        </button>
        <button type="button" className="btn" onClick={() => setIsFemale(true)}>
          female
        </button>
      </div>
      <Figure scrollLeft={scrollLeft} isFemale={isFemale} />
      <div
        id="scrollWrapper"
        className="adventure outer-wrapper"
        onScroll={handleScroll}
      >
        <div
          className={`wrapper sky-day ${
            scrollLeft > screenSize / 2 ? "sky-night" : ""
          }`}
        >
          <div className="sky-wrapper day"></div>
          <div className="sky-wrapper night"></div>
          <div
            className="mountains-far full-width"
            style={{
              backgroundPositionX: utils.moveElement(
                0,
                scrollLeft,
                FAR_MOUNTS_MOVEMENT_RATIO
              ),
            }}
          >
            <div
              className="mountains"
              style={{
                backgroundPositionX: utils.moveElement(
                  0,
                  scrollLeft,
                  MOUNTS_MOVEMENT_RATIO
                ),
              }}
            >
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
              {interests && interests.length > 0 && (
                <SkillsComponent
                  data={interests}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                  title="Interests"
                />
              )}
              {education && education.length > 0 && (
                <EducationComponent
                  data={education}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {references && references.length > 0 && (
                <ReferenceComponent
                  data={references}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {work && work.length > 0 && (
                <WorkComponent
                  data={work}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {awards && awards.length > 0 && (
                <AwardComponent
                  data={awards}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {languages && languages.length > 0 && (
                <LanguageComponent
                  data={languages}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {projects && projects.length > 0 && (
                <ProjectComponent
                  data={projects}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {publications && publications.length > 0 && (
                <PublicationComponent
                  data={publications}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {volunteer && volunteer.length > 0 && (
                <VolunteerComponent
                  data={volunteer}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                />
              )}
              {skills && skills.length > 0 && (
                <SkillsComponent
                  data={skills}
                  screenSize={screenSize}
                  scrollLeft={scrollLeft}
                  scrollTop={scrollTop}
                  title="Skills"
                />
              )}
              <div className="half-slide"></div>
              <Floor worldSize={screenSize} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
