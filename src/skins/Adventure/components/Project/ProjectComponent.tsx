import React from "react";
import { Project } from "../../../../models";
import { utils } from "../../utils/Utils";

export function ProjectComponent(props: {
  data: Project[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  console.log(props.data);

  const listItems = props.data.map((project: Project, index) => {
    return (
      <div key={index} className="slide">
        <div className="box">
          <div className="dates">
            {utils.formatDate(project?.startDate)} -{" "}
            {utils.formatDate(project?.endDate) || "Present"}
          </div>
          <div className="space-between">
            <div className="name margin-right">{project?.name}</div>
            <div className="name">{project?.entity}</div>
          </div>
          <div className="summary">{project?.description}</div>
          <div className="website">
            <a href={project?.url} target="_blank" rel="noopener noreferrer">
              See project
            </a>
          </div>
          {/* <div className="dates space-between">
            {education?.studyType && <span>{education?.studyType}</span>}
            {education?.gpa && <span>GPA: {education?.gpa}</span>}
          </div> */}
        </div>
        {/* {education?.courses && education.courses.length && (
          <div className="courses box">
            <div className="name">Courses</div>
            {education.courses.map((course, indexA) => (
              <div key={indexA}>{course}</div>
            ))}
          </div>
        )} */}
      </div>
    );
  });

  return <div>{listItems}</div>;
}
