import React from 'react';
import {Education} from '../../../../models';

export function EducationComponent(props: { data: Education[], scrollLeft: number, scrollTop: number }) {
    return <div className="lvl-education slide">
        <div id="cloud-1" className="lvl-cloud-1"></div>
        <div id="cloud-3" className="lvl-cloud-3"></div>
        <div id="cloud-4" className="lvl-cloud-4"></div>
    </div>
}