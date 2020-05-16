import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Injectable()
export class DateFunctionsService {

  constructor(
    @Inject(LOCALE_ID) private localeID: string,
  ) { }

  public normalizeDate(month: number, year: number): {month: number, year: number, date: Date} {
    const date = new Date(year, month, 1, 12);
    return {
      month: date.getMonth(),
      year: date.getFullYear(),
      date,
    };
  }

  public localizedGetDay(date: Date, localeID: string): number {
    return ((date.getDay() || 7) - getLocaleFirstDayOfWeek(localeID)) % 7;
  }

  public createCalendarArray(month: number, year: number): number[] {
    const { localizedGetDay, normalizeDate } = this;
    const d = normalizeDate(month, year);

    const endDate = new Date(d.year, d.month + 1, 0, 12);
    const startDay = localizedGetDay(d.date, this.localeID);
    const endDay = localizedGetDay(endDate, this.localeID);

    let calendar: number[] = Array(startDay).fill(null);
    for (let i = 1; i <= endDate.getDate(); i++) {
      calendar.push(i);
    }
    calendar = calendar.concat(Array(6 - endDay).fill(null));

    return calendar;
  }
}
