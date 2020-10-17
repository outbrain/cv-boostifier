import React , {useEffect, useRef} from 'react';

export function Floor(props: {worldSize: number}) {
    return <div className="floor" style={{width: `${props.worldSize}vw`}}>
        <div className="ramp-general">
            <div className="ramp-part-1"/>
            <div className="ramp-part-2"/>
        </div>
    </div>
}