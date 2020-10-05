export class Utils {
  constructor() {}
  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  moveElement = (
    startingPosition: number,
    scrollPosition: number,
    speedRatio: number
  ) => startingPosition - speedRatio * scrollPosition;

  getMonthName(date: Date): string {
    return this.monthNames[date.getDate()];
  }

  formatDate(dateStr: string = ""): string {
    const date = new Date(dateStr);
    return `${this.getMonthName(date)} ${date.getFullYear()}`;
  }
}

export let utils = new Utils();
