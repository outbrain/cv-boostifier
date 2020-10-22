import React from "react";
import { Publication } from "../../../../models";
import { utils } from "../../utils/Utils";

export function PublicationComponent(props: {
  data: Publication[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  console.log(props.data);
  return (
    <div>
      <div>
        <h1>Publications</h1>
      </div>
      <div className="flex-container">
        {props.data.map((publication: Publication, index) => (
          <div key={index} className="slide">
            <div className="half-box ">
              <div className="dates">
                {utils.formatDate(publication?.releaseDate)}
              </div>
              <div className="space-between name">
                <div className="margin-right">{publication?.name}</div>
                <div>{publication?.publisher}</div>
              </div>
              <div className="summary">{publication?.summary}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
