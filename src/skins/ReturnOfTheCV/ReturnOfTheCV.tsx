import React, { PropsWithChildren } from "react";
import "./ReturnOfTheCV.scss";
import { IProfileProps } from "../../models";

export function ReturnOfTheCV(props: PropsWithChildren<IProfileProps>) {
  // const {
  //   basics,
  //   skills,
  //   work,
  //   education,
  //   references,
  //   projects,
  //   publications,
  //   languages,
  // } = props.profile;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current?.getContext("2d");
      if (canvasContext) {
        canvasContext.beginPath();
        canvasContext.arc(50, 50, 50, 0, 2 * Math.PI);
        canvasContext.fill();
      }
    }
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
}
