import { AnimationEvent, trigger } from '@angular/animations';
import { Component, Input, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DatepickerService } from '../services/datepicker.service';
import { currentMetadata, flyingMetadata } from './slim-month.animation';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'slim-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('flying', flyingMetadata),
    trigger('current', currentMetadata),
  ]
})
export class YearComponent implements OnInit {
  public month$ = this.datepickerService.month;
  public nextMonth$ = new Subject<number>();
  private nextMonth: number;
  public flying$ = new BehaviorSubject('stable');
  public current$ = new BehaviorSubject('stable');

  @Input() year: number;

  constructor(
    private datepickerService: DatepickerService,
  ) {
  }

  ngOnInit(): void {
    this.shiftMonthReaction();
  }

  private shiftMonthReaction() {
    this.datepickerService.changingMonth.pipe(
      withLatestFrom(this.month$),
    ).subscribe(([shiftMonth, month]) => {
      this.nextMonth = month + { next: 1, previous: -1 }[shiftMonth];
      this.nextMonth$.next(this.nextMonth);
      this.flying$.next(shiftMonth);
      this.current$.next(shiftMonth);
    });
  }

  onFlyingDone(evt: AnimationEvent) {
    if (evt.toState !== 'stable') {
      this.flying$.next('stable');
      this.datepickerService.changeMonth(this.nextMonth);
    }
  }

  onCurrentDone(evt: AnimationEvent) {
    if (evt.toState !== 'stable') {
      this.current$.next('stable');
    }
  }
}
