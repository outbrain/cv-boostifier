export class Utils {
  constructor() {}
  moveElement = (startingPosition: number, scrollPosition: number,speedRatio: number) => startingPosition - speedRatio * scrollPosition;
}

export let utils = new Utils()
