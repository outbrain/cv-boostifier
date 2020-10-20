import React from "react";
import { Education } from "../../../../models";
import { utils } from "../../utils/Utils";

export function EducationComponent(props: {
  data: Education[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  // const getEducationDataDiv = (education: Education[]) => {
  //   return education.map((institution, index) =>
  //     <div className="lvl-education-data" key={`education-${index}`} >
  //       {Object.entries(institution).map((data, index) => <div key={`data-${index}`}><b>{data[0]}</b>: {data[1]}</div>)}
  //     </div>
  //   )
  // }

  // return (
  //   <div className="lvl-education-background" style={{width:`${props.education.length*100}vw`}}>
  //     <div className="lvl-education-item lvl-education-road"/>
  //     <div className="lvl-education-item lvl-education-houses-1"/>
  //     <div className="lvl-education-item lvl-education-houses-2"/>
  //     <div className="lvl-education-item lvl-education-houses-3"/>
  //     <div className="lvl-education-item lvl-education-crosswalk"/>
  //     {
  //       getEducationDataDiv(props.education)
  //     }
  //   </div>
  // );
  const listItems = props.data.map((education: Education, index) => {
    console.log(education);

    return (
      <div key={index} className="slide">
        <div className="box">
          <div className="dates">
            {utils.formatDate(education?.startDate)} -{" "}
            {utils.formatDate(education?.endDate) || "Present"}
          </div>
          <div className="name">
            {education?.area} @ {education?.institution}
          </div>
          <div className="dates space-between">
            {education?.studyType && <span>{education?.studyType}</span>}
            {education?.gpa && <span>GPA: {education?.gpa}</span>}
          </div>
        </div>
        {education?.courses && education.courses.length && (
          <div className="courses box">
            <div className="name">Courses</div>
            {education.courses.map((course) => (
              <div>{course}</div>
            ))}
          </div>
        )}
      </div>
    );
  });

  return <div>{listItems}</div>;
}
