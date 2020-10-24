import React from "react";

export function Floor(props: { worldSize: number }) {
  return (
    <div
      className="floor"
      style={props.worldSize !== 0 ? {
        width: `${props.worldSize}px`
      } : {}}>
    </div>
  );
}
