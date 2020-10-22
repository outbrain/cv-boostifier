import React from "react";
import { Award } from "../../../../models";
import { utils } from "../../utils/Utils";

export function AwardComponent(props: {
  data: Award[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  return (
    <div>
      <div>
        <h1>Awards</h1>
      </div>

      {props.data.map((award: Award, index) => (
        <div key={index} className="slide">
          <div className="half-box ">
            <div className="dates">{utils.formatDate(award?.date)}</div>
            <div className="space-between name">
              <div className="margin-right">{award?.title}</div>
              <div>{award?.awarder}</div>
            </div>
            <div className="summary">{award?.summary}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
