import React from "react";
import { Reference } from "../../../../models";

export function ReferencesComponent(props: {
  references: Reference[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  const getReferencesDataDiv = (reference: Reference) => {
    return <div className="lvl-references-data">
      {Object.entries(reference).map(data => <div><b>{data[0]}</b>: {data[1]}</div>)}
    </div>
  }
  return (
    <div className="lvl-references-background" style={{width:`${props.references.length*100}vw`}}>
      {
        props.references.map((reference, index) => 
        <div key={`reference-${index}`} >
          {getReferencesDataDiv(reference)}
          <div className="lvl-references-item lvl-references-road"></div>
          <div className="lvl-references-item lvl-references-houses-1"></div>
          <div className="lvl-references-item lvl-references-houses-2"></div>
          <div className="lvl-references-item lvl-references-houses-3"></div>
          <div className="lvl-references-item lvl-references-fountain"></div>
          <div className="lvl-references-item lvl-references-decortions"></div>
        </div>
        )
      }
    </div>
  );
}