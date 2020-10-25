import { isoLangs } from "./languages";

export class Utils {
  // constructor() {}
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
    return this.monthNames[date.getMonth()];
  }

  mapLanguageCodeToName(languageCode: string = ""): string {
    return isoLangs[languageCode]?.name || languageCode;
  }

  formatDate(dateStr: string = ""): string {
    if (!dateStr || dateStr.length < 3) {
      return "";
    }
    const date = new Date(dateStr);
    return `${this.getMonthName(date)} ${date.getFullYear()}`;
  }
}

export let utils = new Utils();
