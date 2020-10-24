import React from "react";
import { utils } from "../../utils/Utils";

export function Floor(props: { worldSize: number, scrollLeft:number}) {
  return (
    <div
      className="floor"
      style={props.scrollLeft !== 0 ? {
        width: `${props.worldSize}px`,
        backgroundPositionX: utils.moveElement(
          0,
          props.scrollLeft,
          -0.9
        ),
      } : {}}>
    </div>
  );
}
