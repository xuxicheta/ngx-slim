import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { DatepickerService } from './datepicker.service';
import { Mode } from './mode.enum';


@Component({
  selector: 'slim-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {class: 'slim-datepicker'},
})
export class DatepickerComponent {
  public date = new Date();
  public chosenDate = new Date();
  public nextDate = this.date;
  public hangDate = this.date;
  public leaf: 'stable' | 'next' | 'previous' = 'stable';
  public mode = Mode.Day;
  Mode = Mode;

  @Output() valueChange = new EventEmitter<Date>();
  @Output() dispose = new EventEmitter();

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private datepickerService: DatepickerService,
  ) {
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target as Node)) {
      this.cancelMode();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    switch (evt.code) {
      case 'Escape':
        return this.cancelMode();
      case 'ArrowLeft':
        return this.left();
      case 'ArrowRight':
        return this.right();
      case 'KeyM':
        return this.modeDown(Mode.Month);
      case 'KeyY':
        return this.modeDown(Mode.Year);
    }
  }

  onMonthAnimationDone() {
    this.date = this.nextDate;
    this.leaf = 'stable';
  }

  private onControlTurn(turn: number, ofMode: Mode) {
    if (turn) {
      this.leaf = turn > 0 ? 'next' : 'previous';
      this.nextDate = this.datepickerService.makeNextDateOfMode(this.date, turn, ofMode);
    }
  }


  private onUiPick(value: number, ofMode: Mode) {
    const turn = this.datepickerService.makeTurnOfMode(this.date, value, ofMode);
    this.onControlTurn(turn, ofMode);
    this.mode = Mode.Day;
  }

  private modeDown(mode: Mode) {
    setTimeout(() => {
      this.hangDate = this.date;
      this.mode = mode;
      this.cdr.markForCheck();
    });
  }

  private cancelMode() {
    if (this.mode !== Mode.Day) {
      this.mode = Mode.Day;
      this.date = this.hangDate;
    } else {
      this.dispose.emit();
    }
  }

  // api

  left() {
    this.onControlTurn(-1, this.mode);
  }

  right() {
    this.onControlTurn(1, this.mode);
  }

  openDay() {
    this.cancelMode();
  }

  openMonth() {
    this.modeDown(Mode.Month);
  }

  openYear() {
    this.modeDown(Mode.Year);
  }

  pickDay(day: number) {
    this.chosenDate = new Date(this.date);
    this.chosenDate.setDate(day);
    this.valueChange.emit(this.chosenDate);
  }

  pickMonth(month: number) {
    this.onUiPick(month, Mode.Day);
  }

  pickYear(year: number) {
    this.onUiPick(year, Mode.Month);
  }

  get(): Date {
    return this.chosenDate;
  }

  set(date: Date) {
    this.leaf = date.getTime() > this.date.getTime() ? 'next' : 'previous';
    this.nextDate = date;
    this.chosenDate = date;
  }
}
