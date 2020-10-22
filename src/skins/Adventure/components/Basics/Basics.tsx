import React from "react";
import { Basics } from "../../../../models";

export function BasicsComponent(props: {
  data: Basics;
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  return (
    <div className="basics">
      <div className="slide intro">
        <div className="heading user-details">
          <h1>{props.data?.name}</h1>
          <h2>{props.data?.label}</h2>
        </div>
      </div>
      <div>
        <h1>Summary</h1>
        <div className="slide">
          <div className="half-box">
            <div className="summary">{props.data?.summary}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
