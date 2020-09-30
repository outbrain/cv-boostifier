import React from 'react';
import {Basics} from "../../../../models";
import {utils} from "../../Utils/Utils";

export function BasicsComponent(props: { data: Basics, screenSize: number, scrollLeft: number, scrollTop: number }) {
  const CLOUDS_MOVEMENT_RATIO = -1;
  const CLOUDS_STARTING_OFFSET = 0.9;

  return (

    <div className="lvl-basics slide one">
      <div id="rocks" className="rocks"
           style={{backgroundPositionX:utils.moveElement(props.screenSize * CLOUDS_STARTING_OFFSET, props.scrollLeft,CLOUDS_MOVEMENT_RATIO)}}></div>
        <div className="sky">
        <div className="clouds2"></div>
       </div>
      <div className="user-details ">
        <h1>{props.data?.name}</h1>
        <h2>{props.data?.label}</h2>
      </div>
    </div>
  );
}
