export interface IDateProvider {
  compareInHours(start_date: Date | undefined, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  compareInDays(start_date: Date | undefined, end_date: Date): number;
}
