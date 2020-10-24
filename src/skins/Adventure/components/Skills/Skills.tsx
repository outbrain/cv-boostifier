import React from "react";
import { Interest, Skill } from "../../../../models";
import "./Skills.scss";

export function SkillsComponent(props: {
  data: Skill | Interest[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
  title: string;
}) {
  console.log(props.data);
  const getSectionElements = () => {
    return (props.title === "Skills") ?
        <div> 
          <div className="blue-banner blue-banner-1"/>
          <div className="blue-banner blue-banner-2"/>
          <div className="blue-banner blue-banner-3"/>
        </div>
      : <div></div>
  }
  return (
    <div>
      <div>
        <h1>{props.title}</h1>
      </div>
      <div className="flex-container">
      {(props.data as Skill[]).map((skill: Skill, index) => (
        <div key={index} className="mini-slide">
          <div className="box ">
            <div className="space-between name">
              <div className="margin-right">{skill?.name}</div>
              <div>{skill?.level}</div>
            </div>
            {skill.keywords &&
              skill.keywords.length > 0 &&
              skill.keywords.map((keyword: string, keywordIndex: number) => (
                <li key={keywordIndex} className="summary">
                  {keyword}
                </li>
              ))}
          </div>
        </div>
      ))}
      </div>
      { 
        getSectionElements()
      }
    </div>
  );
}
