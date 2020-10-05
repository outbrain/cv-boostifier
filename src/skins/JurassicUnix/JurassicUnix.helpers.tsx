import {SIZE_UNIT} from "./JurassicUnix.constants";
import {Coordinates} from './types/coordinates';

export function getPerspectiveFor(x: number, y: number, z: number, width: number): Coordinates {
    // x, y, z: coordinates of the lower left corner of the object closest to the observer (with maximum z)
    // width: the width of the object we're looking at (size in direction x)
    // output: offset to which we need to move the view in order to see the object
    return { x: -width / 2 - x, y: width / 2.5 - y, z: -width / 3.5 - z };
}

export function get3DTranslation(offset: Coordinates): string {
    return (
        "translate3d(" +
        offset.x +
        SIZE_UNIT +
        ", " +
        offset.y +
        SIZE_UNIT +
        ", " +
        offset.z +
        SIZE_UNIT +
        ")"
    );
}

export function addPositions(position1: Coordinates, position2: Coordinates): Coordinates {
    const pos1 = position1 || { x: 0, y: 0, z: 0 };
    const pos2 = position2 || { x: 0, y: 0, z: 0 };

    return {
        x: pos1.x + pos2.x,
        y: pos1.y + pos2.y,
        z: pos1.z + pos2.z,
    };
}

export function isBrowserFirefox() {
    return navigator.userAgent.includes("Firefox");
}
