import React from 'react';
import {Education} from '../../../../models';

export function EducationComponent(props: { data: Education[], screenSize: number, scrollLeft: number, scrollTop: number }) {
    const CLOUDS_MOVEMENT_RATIO = 0.6;
    const CLOUDS_STARTING_OFFSET = 0.9;
    const moveElement = (startingPosition: number, scrollPosition: number) => startingPosition - CLOUDS_MOVEMENT_RATIO * scrollPosition;

    return (
        <div className="lvl-education slide">
            <div id="clouds" className="lvl-clouds" style={{right:moveElement(props.screenSize * CLOUDS_STARTING_OFFSET ,props.scrollLeft)}}></div>
        </div>
    );
}