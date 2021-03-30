import React from "react";
import { Work } from "../../../../models";
import { utils } from "../../utils/Utils";

export function WorkComponent(props: {
  data: Work[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  const listItems = props.data.map((work: Work, index) => {
    return (
      <div key={index} className="slide">
        <div className="half-box">
          <div className="dates">
            {utils.formatDate(work?.startDate)} -{" "}
            {utils.formatDate(work?.endDate) || "Present"}
          </div>
          <div className="name">
            {work?.position} at{" "}
<<<<<<< HEAD
            <a href={work?.website} target="_blank" rel="noopener noreferrer">
              {work?.company}
=======
            <a href={work?.url} target="_blank" rel="noopener noreferrer">
              {work?.name}
>>>>>>> 6ea365a6de000306689ca5361edab37613b1e818
            </a>
          </div>
          <div className="summary">{work?.summary}</div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div>
        <h1>Experience</h1>
      </div>
      <div className="flex-container">{listItems}</div>;
      <div className="log-spike-wall"/>
      <div className="log-cabin"/>
    </div>
  );
}
