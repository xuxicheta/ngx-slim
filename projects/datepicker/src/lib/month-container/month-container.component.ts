import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { monthContainerAnimations } from './month-container.animations';
import { MonthTurn } from '../services/datepicker.service';


@Component({
  selector: 'slim-month-container',
  templateUrl: './month-container.component.html',
  styleUrls: ['./month-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: monthContainerAnimations,
})
export class MonthContainerComponent {
  public nextMonth = 0;
  public animationState = 'stable';

  @Input() year: number;
  @Input() month: number;

  @Input() set monthTurn(monthTurn: MonthTurn) {
    if (monthTurn?.turn) {
      this.animationState = monthTurn.turn > 0 ? 'next' : 'previous';
      this.nextMonth = this.month + monthTurn.turn;
    }
  }

  @Output() nextMonthChange = new EventEmitter<number>();

  onCurrentDone(evt: AnimationEvent) {
    if (evt.toState !== 'stable') {
      this.animationState = 'stable';
      this.nextMonthChange.emit(this.nextMonth);
      this.nextMonth = 0;
    }
  }
}
