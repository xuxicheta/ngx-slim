import { LOCALE_ID } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MonthNamePipe } from './month-name.pipe';
import * as AngularCommon from '@angular/common';

const monthNames = () => Array(12).fill(0).map((_, i) => 'm' + i);

describe('MonthNamePipe', () => {
  let pipe: MonthNamePipe;

  beforeEach(inject([LOCALE_ID], (localeId: string) => {
    pipe = new MonthNamePipe(localeId);
  }));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  xit('should transform month', () => {
    spyOn(AngularCommon, 'getLocaleMonthNames').and.returnValue(monthNames());
    expect(pipe.transform(0)).toBe('m0');
    expect(pipe.transform(6)).toBe('m6');
    expect(pipe.transform(7)).toBe('m7');
  });

  it('should not transform outrange number', () => {
    expect(pipe.transform(12)).toBe('');
  });
});
