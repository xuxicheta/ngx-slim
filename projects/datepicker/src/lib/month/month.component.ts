import { getLocaleFirstDayOfWeek } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, LOCALE_ID, Output, ViewEncapsulation } from '@angular/core';
import { falser } from '../falser';

@Component({
  selector: 'slim-month',
  templateUrl: './month.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'slim-month' },
})
export class MonthComponent {
  private firstDayOfWeek: number;
  private dateCache: Date;
  private chosenDateCache: Date;
  public calendar: number[] = [];

  @Input() set date(date: Date) {
    this.calendar = this.createCalendar(date, this.firstDayOfWeek);
    this.dateCache = date;
    this.setupMatchers();
  }

  @Input() set chosenDate(chosenDate: Date) {
    this.chosenDateCache = chosenDate;
    this.setupMatchers();
  }

  @Output() pickDate = new EventEmitter<number>();

  public isNow = falser;
  public isChosen = falser;

  constructor(
    @Inject(LOCALE_ID) localeID: string,
  ) {
    this.firstDayOfWeek = getLocaleFirstDayOfWeek(localeID);
  }


  private createCalendar(date: Date, firstDayOfWeek: number) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1, 12);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 12);
    const startDay = ((startDate.getDay() || 7) - firstDayOfWeek) % 7;
    const endDay = ((endDate.getDay() || 7) - firstDayOfWeek) % 7;

    return Array(startDay).fill(null)
      .concat(
        Array.from(Array(endDate.getDate() + 1), (_, i) => i).slice(1),
        Array(6 - endDay).fill(null)
      );
  }

  private createIsMatch(rootDate: Date, date: Date): (d: number) => boolean {
    if (
      !rootDate
      || !date
      || date.getFullYear() !== rootDate.getFullYear()
      || date.getMonth() !== rootDate.getMonth()
    ) {
      return falser;
    }

    const day = rootDate.getDate();
    return (d: number) => d === day;
  }

  private setupMatchers() {
    this.isNow = this.createIsMatch(new Date(), this.dateCache);
    this.isChosen = this.createIsMatch(this.chosenDateCache, this.dateCache);
  }
}
