import React from 'react';
import {Skill} from "../../../../models";
import {utils} from "../../utils/Utils";
import {MeteorsAnimation} from "../../animations/MeteorsAnimation";
import "./Skills.scss"

export function SkillsComponent(props: { data: Skill[], screenSize: number, scrollLeft: number, scrollTop: number }) {
  const MOUNTS_MOVEMENT_RATIO = 0.1;
  const MOUNTS_STARTING_OFFSET = 0.9;

  return (

    <div className="lvl-skills night">
      <div>
      <MeteorsAnimation></MeteorsAnimation>
      </div>
      <div className=" slide ground-night">
        <div className="wooden-ground-night"
             style={{backgroundPositionX: utils.moveElement(props.screenSize * MOUNTS_STARTING_OFFSET, props.scrollLeft, MOUNTS_MOVEMENT_RATIO)}}>
          <div className="wooden-ground-night-2"
               style={{backgroundPositionX: utils.moveElement(props.screenSize * MOUNTS_STARTING_OFFSET, props.scrollLeft, 0.2)}}></div>
        </div>

        <div className="sky">
          <div className="clouds2"></div>
        </div>
        <div className="heading skills">
          <h1>Skills</h1>
        </div>
        <div className="heading skills-list">
          <ul>
            {
              props.data.map((value, index) => {
                return <li className="skill-item" key={index}>{value.name} {value?.keywords} {value?.level}</li>
              })
            }
          </ul>
        </div>

      </div>
    </div>
  );
}
