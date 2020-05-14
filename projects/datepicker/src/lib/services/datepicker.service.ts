import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DateFunctionsService } from './date-functions.service';


@Injectable()
export class DatepickerService implements OnDestroy {
  private month$ = new BehaviorSubject(0);
  private year$ = new BehaviorSubject(new Date().getFullYear());
  private shiftMonth$ = new Subject<'next'|'previous'>();

  constructor(
    private dateFunctionsService: DateFunctionsService,
  ) { }

  get month() {
    return this.month$.asObservable();
  }

  get year() {
    return this.year$.asObservable();
  }

  get changingMonth() {
    return this.shiftMonth$.asObservable();
  }

  public changeMonth(month: number) {
    const result = this.dateFunctionsService.normalizeDate(month, this.year$.value);
    this.month$.next(result.month);
    this.year$.next(result.year);
  }

  public shiftMonth(shift: 'next' | 'previous') {
    this.shiftMonth$.next(shift);
  }

  ngOnDestroy() {
    this.shiftMonth$.complete();
    this.month$.complete();
    this.year$.complete();
  }
}
