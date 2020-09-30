import React from "react";
import { Work } from "../../../../models";
import { utils } from "../../Utils/Utils";

export function WorkComponent(props: {
  data: Work[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  const CLOUDS_MOVEMENT_RATIO = 0.6;
  const CLOUDS_STARTING_OFFSET = 0.9;
  console.log(props.data);

  return (
    <div className="lvl-education slide">
      <div
        id="clouds"
        className="lvl-clouds"
        style={{
          right: utils.moveElement(
            props.screenSize * CLOUDS_STARTING_OFFSET,
            props.scrollLeft,
            CLOUDS_MOVEMENT_RATIO
          ),
        }}
      ></div>
    </div>
  );
}
