import {SIZE_UNIT} from "./JurassicUnix.constants";
import {Coordinates} from './types/coordinates';
import {PerspectiveType} from "./types/perspective-type";
import {Perspective} from "./types/perspective";

export function getPerspectiveFor(x: number, y: number, z: number, width: number, perspectiveType: PerspectiveType): Perspective {
    // x, y, z: coordinates of the lower left corner of the object closest to the observer (with maximum z)
    // width: the width of the object we're looking at (size in direction x)
    // output: offset to which we need to move the view in order to see the object

    // First we determine where the centre of the object's top side is (For the sake of simplicity we assume the object's width equals its length)
    const objectTopCentre: Coordinates = { x: -width*0.5 - x, y: -y, z: width*0.5 - z };
    let offset: Coordinates;

    if(perspectiveType===PerspectiveType.SIDE_VIEW){
        offset= { x: 0, y: width*0.4, z: -width*0.8 };
    } else{
        offset= { x: 0, y: width*1.2, z: 0 };
    }

    return {viewPoint:addCoordinates(objectTopCentre, offset), perspectiveType};
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

export function get3DRotation(direction: 'x'|'y'|'z', degrees: number): string {
    return (
        "rotate"+direction.toUpperCase()+"(" +
        degrees+
        "deg)"
    );
}

export function addCoordinates(position1?: Coordinates, position2?: Coordinates): Coordinates {
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
