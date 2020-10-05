import React from "react";
import { Reference } from "../../../../models";

export function ReferencesComponent(props: {
  references: Reference[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  const getReferencesDataDiv = (references: Reference[]) => {
    return references.map((reference, index) => 
      <div className="lvl-references-data" key={`reference-${index}`} >
        {Object.entries(reference).map((data,index) => <div key={`data-${index}`}><b>{data[0]}</b>: {data[1]}</div>)}
      </div>
    )
  }
  return (
    <div className="lvl-references-background" style={{width:`${props.references.length*100}vw`}}>
      <div className="lvl-references-item lvl-references-road"></div>
      <div className="lvl-references-item lvl-references-houses-1"></div>
      <div className="lvl-references-item lvl-references-houses-2"></div>
      <div className="lvl-references-item lvl-references-houses-3"></div>
      <div className="lvl-references-item lvl-references-fountain"></div>
      <div className="lvl-references-item lvl-references-decortions"></div>
      {
        getReferencesDataDiv(props.references)
      }
    </div>
  );
}