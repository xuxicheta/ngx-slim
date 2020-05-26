import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { getLocaleMonthNames, FormStyle, TranslationWidth } from '@angular/common';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {
  private readonly monthNames = getLocaleMonthNames(this.localeID, FormStyle.Standalone, TranslationWidth.Wide);

  constructor(
    @Inject(LOCALE_ID) private localeID: string,
  ) {}

  transform(month: number): string {
    return this.monthNames[month] ?? '';
  }
}
