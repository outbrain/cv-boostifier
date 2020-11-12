import {PerspectiveType} from "./perspective-type";
import {Coordinates} from "./coordinates";

export interface Perspective{
    viewPoint: Coordinates,
    perspectiveType: PerspectiveType,
}
