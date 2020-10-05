export interface BoxProps{
    id: string,
    name?: string,
    textContent?: string,
    children?: BoxProps[],
}
