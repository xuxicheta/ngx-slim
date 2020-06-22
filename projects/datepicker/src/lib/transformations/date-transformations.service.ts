import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateTransformationsService {
  private readonly dateFormat = 'shortDate';

  constructor(
    @Inject(LOCALE_ID) private localeID: string,
  ) { }

  parse(str: string): Date {
    const [day, month, year] = str.split('.');
    return new Date(+year, +month - 1, +day);
  }

  stringify(date: Date): string {
    return formatDate(date, this.dateFormat, this.localeID);
  }
}
