import React from 'react';
import {Education} from '../../../../models';

export function EducationComponent(props: { data: Education[], scrollLeft: number, scrollTop: number }) {
    const CLOUDS_MOVEMENT_RATIO = 0.6;
    const CLOUDS_STARTING_POSITION = 5500;
    const moveElement = (startingPosition: number, movingRatio: number) => startingPosition - movingRatio * props.scrollLeft;

    return <div className="lvl-education slide">
        <div id="clouds" className="lvl-clouds" style={{right:moveElement(CLOUDS_STARTING_POSITION, CLOUDS_MOVEMENT_RATIO)}}></div>
    </div>
}