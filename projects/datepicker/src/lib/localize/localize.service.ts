import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { FormStyle, getLocaleMonthNames, TranslationWidth } from '@angular/common';

@Injectable()
export class LocalizeService {
  public readonly monthNames = getLocaleMonthNames(this.localeID, FormStyle.Standalone, TranslationWidth.Wide);

  constructor(
    @Inject(LOCALE_ID) private localeID: string,
  ) { }
}
