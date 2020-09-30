import React from "react";
import { Education } from "../../../../models";

export function EducationComponent(props: {
  data: Education[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  return (
    <div className="lvl-education slide">
      <div id="clouds" className="lvl-clouds"></div>
    </div>
  );
}
