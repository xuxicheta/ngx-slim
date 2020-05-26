import { FormStyle, getLocaleMonthNames, TranslationWidth } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Inject, Input, LOCALE_ID, Output, ViewEncapsulation } from '@angular/core';
import { falser } from '../falser';

@Component({
  selector: 'slim-year',
  templateUrl: './year.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'slim-year' },
})
export class YearComponent {
  public readonly monthNames = getLocaleMonthNames(this.localeID, FormStyle.Standalone, TranslationWidth.Wide);
  private dateCache: Date;
  private chosenDateCache: Date;

  @Input() set date(date: Date) {
    this.dateCache = date;
    this.setupMatchers();
  }

  @Input() set chosenDate(chosenDate: Date) {
    this.chosenDateCache = chosenDate;
    this.setupMatchers();
  }

  @Output() pickMonth = new EventEmitter<number>();

  public isChosen = falser;
  public isNow = falser;

  constructor(
    @Inject(LOCALE_ID) private localeID: string,
  ) { }

  private createIsMatch(rootDate: Date, date: Date) {
    if (!rootDate || !date || date.getFullYear() !== rootDate.getFullYear()) {
      return falser;
    }

    const month = rootDate.getMonth();
    return (m: number) => m === month;
  }

  private setupMatchers() {
    this.isNow = this.createIsMatch(new Date(), this.dateCache);
    this.isChosen = this.createIsMatch(this.chosenDateCache, this.dateCache);
  }
}
