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
  return (
    <div>
      <div>
        <h1>{props.title}</h1>
      </div>

      {(props.data as Skill[]).map((skill: Skill, index) => (
        <div key={index} className="slide">
          <div className="box ">
            <div className="space-between name">
              <div className="margin-right">{skill?.name}</div>
              <div>{skill?.level}</div>
            </div>
            {skill.keywords &&
              skill.keywords.length &&
              skill.keywords.map((keyword: string, keywordIndex: number) => (
                <li key={keywordIndex} className="summary">
                  {keyword}
                </li>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
