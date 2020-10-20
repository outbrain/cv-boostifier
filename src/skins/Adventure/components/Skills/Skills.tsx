import React from "react";
import { Skill } from "../../../../models";
import "./Skills.scss";

export function SkillsComponent(props: {
  data: Skill[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  return (
    <div>
      <div>
        <h1>Skills</h1>
      </div>

      {props.data.map((skill: Skill, index) => (
        <div key={index} className="slide">
          <div className="box ">
            <div className="space-between name">
              <div>{skill.name}</div>
              <div>{skill.level}</div>
            </div>
            {skill.keywords &&
              skill.keywords.length &&
              skill.keywords.map((keyword: string, keywordIndex: number) => (
                <div key={keywordIndex} className="summary">
                  {keyword}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
