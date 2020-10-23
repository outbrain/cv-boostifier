import React from "react";
import { utils } from "../../utils/Utils";

export function Floor(props: { worldSize: number,scrollLeft:number }) {
  return (
    <div
      className="floor"
      style={props.worldSize !== 0 ? {
        width: `${props.worldSize}px`,
        backgroundPositionX: utils.moveElement(
          0,
          props.scrollLeft,
          -0.9
        ),
      } : {}}
    >
      <div className="ramp-general">
        <div className="ramp-part-1" />
        <div className="ramp-part-2" />
      </div>
    </div>
  );
}
