import React from 'react';
import {Basics} from "../../../../models";
import {utils} from "../../utils/Utils";

export function BasicsComponent(props: { data: Basics, screenSize: number, scrollLeft: number, scrollTop: number }) {
  const MOUNTS_MOVEMENT_RATIO = 0.1;
  const MOUNTS_STARTING_OFFSET = 0.9;

  return (

    <div className="lvl-basics day">
      <div className=" slide one">
        <div className="mountains"
             style={{backgroundPositionX: utils.moveElement(props.screenSize * MOUNTS_STARTING_OFFSET, props.scrollLeft, MOUNTS_MOVEMENT_RATIO)}}></div>
        <div className="sky">
          <div className="clouds2"></div>
        </div>
        <div className="heading user-details">
          <h1>{props.data?.name}</h1>
          <h2>{props.data?.label}</h2>
        </div>
        <div className="heading summary">
          <h1>Summary</h1>
          <h3>{props.data?.summary}</h3>
        </div>
      </div>
    </div>
  );
}
