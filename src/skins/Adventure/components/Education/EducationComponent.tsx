import React from "react";
import { Education } from "../../../../models";
import { utils } from "../../utils/Utils";

export function EducationComponent(props: {
  data: Education[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  const listItems = props.data.map((education: Education, index) => {
    return (
      <div key={index} className="slide">
        <div className="box">
          <div className="dates">
            {utils.formatDate(education?.startDate)} -{" "}
            {utils.formatDate(education?.endDate) || "Present"}
          </div>
          <div className="name">
            {education?.area} at {education?.institution}
          </div>
          <div className="dates space-between">
            {education?.studyType && <span>{education?.studyType}</span>}
            {education?.gpa && <span>GPA: {education?.gpa}</span>}
          </div>
        </div>
        {education?.courses && education.courses.length && (
          <div className="courses half-box">
            <div className="name">Courses</div>
            {education.courses.map((course, indexA) => (
              <li key={indexA}>{course}</li>
            ))}
          </div>
        )}
      </div>
    );
  });

  return (
    <div>
      <div>
        <h1>Education</h1>
      </div>
      <div>{listItems}</div>;
    </div>
  );
}
