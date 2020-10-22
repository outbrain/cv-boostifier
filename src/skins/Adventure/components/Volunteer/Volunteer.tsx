import React from "react";
import { Volunteer, Work } from "../../../../models";
import { utils } from "../../utils/Utils";

export function VolunteerComponent(props: {
  data: Volunteer[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  const listItems = props.data.map((volunteer: Volunteer, index) => {
    return (
      <div key={index} className="slide">
        <div className="half-box">
          <div className="dates">
            {utils.formatDate(volunteer?.startDate)} -{" "}
            {utils.formatDate(volunteer?.endDate) || "Present"}
          </div>
          <div className="name">
            {volunteer?.position} at {volunteer?.organization}
            <div className="website">
              <a
                href={volunteer?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {volunteer?.url}
              </a>
            </div>
          </div>
          <div className="summary">{volunteer?.summary}</div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div>
        <h1>Volunteer Experience</h1>
      </div>
      <div>{listItems}</div>;
    </div>
  );
}
