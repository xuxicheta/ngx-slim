import { LOCALE_ID } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MonthNamePipe } from './month-name.pipe';
import { getLocaleMonthNames, FormStyle, TranslationWidth} from '@angular/common';

describe('MonthNamePipe', () => {
  let pipe: MonthNamePipe;
  let monthNames: string[];

  beforeEach(inject([LOCALE_ID], (localeId: string) => {
    pipe = new MonthNamePipe(localeId);
    monthNames = getLocaleMonthNames(localeId, FormStyle.Standalone, TranslationWidth.Wide);
  }));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform month', () => {
    monthNames.forEach((monthName, index) => expect(pipe.transform(index)).toBe(monthName));
  });

  it('should not transform outrange number', () => {
    expect(pipe.transform(12)).toBe('');
  });
});
