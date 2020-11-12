import React from "react";
import { Reference } from "../../../../models";

export function ReferenceComponent(props: {
  data: Reference[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  return (
    <div>
      <div>
        <h1>Recommendations</h1>
      </div>
      <div className="flex-container">
        {props.data.map((reference: Reference, index: number) => (
          <div key={index} className="slide">
            <div className="half-box">
              <div className="name">{reference?.name}</div>
              <div className="summary">{reference?.reference}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
