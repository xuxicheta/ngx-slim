import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DateFunctionsService } from './date-functions.service';

export type MonthTurn = { turn: number };

@Injectable()
export class DatepickerService implements OnDestroy {
  private month$ = new BehaviorSubject(0);
  private year$ = new BehaviorSubject(new Date().getFullYear());
  private monthTurn$ = new Subject<MonthTurn>();

  constructor(
    private dateFunctionsService: DateFunctionsService,
  ) { }

  get month() {
    return this.month$.asObservable();
  }

  get year() {
    return this.year$.asObservable();
  }

  get monthTurn() {
    return this.monthTurn$.asObservable();
  }

  public changeMonth(month: number) {
    const result = this.dateFunctionsService.normalizeDate(month, this.year$.value);
    this.month$.next(result.month);
    this.year$.next(result.year);
  }

  public setMonthTurn(turn: MonthTurn) {
    this.monthTurn$.next(turn);
  }

  ngOnDestroy() {
    this.monthTurn$.complete();
    this.month$.complete();
    this.year$.complete();
  }
}
