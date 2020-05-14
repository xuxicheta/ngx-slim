import { Injectable } from '@angular/core';

@Injectable()
export class DateFunctionsService {

  public normalizeDate(month: number, year: number) {
    const result = { month, year };
    while (result.month < 0) {
      result.month += 12;
      result.year -= 1;
    }
    while (result.month > 11) {
      result.month -= 12;
      result.year += 1;
    }
    return result;
  }

  public localizedGetDay(date: Date): number {
    return (date.getDay() || 7) - 1;
  }
}
