import React from "react";
import { Education } from "../../../../models";

export function EducationComponent(props: {
  education: Education[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  const getEducationDataDiv = (education: Education[]) => {
    return education.map((institution, index) => 
      <div className="lvl-education-data" key={`education-${index}`} >
        {Object.entries(institution).map((data, index) => <div key={`data-${index}`}><b>{data[0]}</b>: {data[1]}</div>)}
      </div>
    )
  }

  return (
    <div className="lvl-education-background" style={{width:`${props.education.length*100}vw`}}>
      <div className="lvl-education-item lvl-education-road"/>
      <div className="lvl-education-item lvl-education-houses-1"/>
      <div className="lvl-education-item lvl-education-houses-2"/>
      <div className="lvl-education-item lvl-education-houses-3"/>
      <div className="lvl-education-item lvl-education-crosswalk"/>
      {
        getEducationDataDiv(props.education)
      }
    </div>
  );
}
