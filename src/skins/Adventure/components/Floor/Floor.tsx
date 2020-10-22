import React, { useEffect, useRef } from "react";
import { utils } from "../../utils/Utils";

export function Floor(props: { worldSize: number,scrollLeft:number }) {
  return (
    <div
      className="floor">
      <div className="ramp-general">
        <div className="ramp-part-1" />
        <div className="ramp-part-2" />
      </div>
    </div>
  );
}
