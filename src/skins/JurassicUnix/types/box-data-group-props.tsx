import {BoxData} from "./box-data";
import {Coordinates} from "./coordinates";

export interface BoxDataGroupProps{
    absolutePosition?: Coordinates,
    data: BoxData[],
    groupWidth: number,
    hue: number,
    onClick: (boxProps: any, e: any)=>void // TODO (jgosar): add types
}
