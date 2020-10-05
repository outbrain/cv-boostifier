import {Coordinates} from "./coordinates";

export interface BoxProps{
    position: Coordinates,
    absolutePosition: Coordinates,
    width: number,
    height: number,
    hue: number,
    id: string,
    textContent?: string,
    onClick: (boxProps: BoxProps, e: MouseEvent)=>void
}
