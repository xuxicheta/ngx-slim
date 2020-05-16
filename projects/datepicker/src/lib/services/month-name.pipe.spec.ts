import { MonthNamePipe } from './month-name.pipe';
import { inject } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';

describe('MonthNamePipe', () => {
  let pipe: MonthNamePipe;

  beforeEach(inject([LOCALE_ID], (localeId: string) => {
    pipe = new MonthNamePipe(localeId);
  }));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
