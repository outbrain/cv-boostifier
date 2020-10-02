import React from "react";
import { Education } from "../../../../models";

export function EducationComponent(props: {
  education: Education[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  const getEducationDataDiv = (institution: Education) => {
    return <div className="lvl-education-data">
      {Object.entries(institution).map(data => <div><b>{data[0]}</b>: {data[1]}</div>)}
    </div>
  }

  return (
    <div className="lvl-education-background" style={{width:`${props.education.length*100}vw`}}>
      {
        props.education.map((institution, index) => 
        <div key={`education-${index}`} >
          {getEducationDataDiv(institution)}
          <div className="lvl-education-item lvl-education-road"/>
          <div className="lvl-education-item lvl-education-houses-1"/>
          <div className="lvl-education-item lvl-education-houses-2"/>
          <div className="lvl-education-item lvl-education-houses-3"/>
          <div className="lvl-education-item lvl-education-crosswalk"/>
        </div>
        )
      }
    </div>
  );
}
