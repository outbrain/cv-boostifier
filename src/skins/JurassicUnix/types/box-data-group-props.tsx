import {BoxData} from "./box-data";
import {Coordinates} from "./coordinates";
import {BoxProps} from "./box-props";

export interface BoxDataGroupProps{
    absolutePosition?: Coordinates,
    data: BoxData[],
    groupWidth: number,
    hue: number,
    onClick: (boxProps: BoxProps, e: MouseEvent)=>void
}
