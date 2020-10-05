import {Coordinates} from "./coordinates";

export interface BoxProps{
    position: Coordinates,
    absolutePosition: Coordinates,
    width: number,
    height: number,
    hue: number,
    id: string,
    textContent?: string,
    onClick: (boxProps: any, e: any)=>void // TODO (jgosar): add types
}
