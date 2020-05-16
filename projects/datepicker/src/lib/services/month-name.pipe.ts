import { FormStyle, getLocaleMonthNames, TranslationWidth } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {
  private monthNames = getLocaleMonthNames(this.localeID, FormStyle.Standalone, TranslationWidth.Wide);

  constructor(
    @Inject(LOCALE_ID) private localeID: string,
  ) {}

  transform(month: number): string {
    return this.monthNames[month] ?? '';
  }
}
