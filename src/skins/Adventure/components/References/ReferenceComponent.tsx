import React from "react";
import { Reference } from "../../../../models";

export function ReferenceComponent(props: {
  data: Reference[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  // const listItems = props.data.map((reference: Reference, index) => {
  //   console.log(reference);

  //   return (
  //     <div key={index} className="slide">
  //       {/* <div className="box">
  //         <div className="dates">
  //           {utils.formatDate(education?.startDate)} -{" "}
  //           {utils.formatDate(education?.endDate) || "Present"}
  //         </div>
  //         <div className="name">
  //           {education?.area} @ {education?.institution}
  //         </div>
  //         <div className="dates space-between">
  //           {education?.studyType && <span>{education?.studyType}</span>}
  //           {education?.gpa && <span>GPA: {education?.gpa}</span>}
  //         </div>
  //       </div>
  //       {education?.courses && education.courses.length && (
  //         <div className="courses box">
  //           <div className="name">Courses</div>
  //           {education.courses.map((course, index) => (
  //             <div key={index}>{course}</div>
  //           ))}
  //         </div>
  //       )} */}
  //     </div>
  //   );
  // });

  return (
    <div>
      <div>
        <h1>Recommending</h1>
      </div>

      {props.data.map((reference: Reference, index) => (
        <div className="slide">
          <div key={index} className="box">
            <div className="name">{reference?.name}</div>
            <div className="summary">{reference?.reference}</div>
          </div>
        </div>
      ))}
    </div>
  );

  //   {props.data.map((reference: Reference, index) => (
  //     <div className="slide">
  //     <div key={index} className="box">
  //       <div className="name">{reference?.name}</div>
  //       <div className="summary">{reference?.reference}</div>
  //     </div>
  // </div>
  //   ))}
}
