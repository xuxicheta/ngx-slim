import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DatepickerService } from './services/datepicker.service';

@Component({
  selector: 'slim-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    DatepickerService,
  ]
})
export class DatepickerComponent implements OnInit {
  public month$ = this.datepickerService.month;
  public year$ = this.datepickerService.year;
  public monthTurn$ = this.datepickerService.monthTurn;

  constructor(
    private datepickerService: DatepickerService,
  ) { }

  ngOnInit(): void {
  }

  onTurn(turn: 1|-1) {
    console.log(turn);
    this.datepickerService.setMonthTurn({ turn });
  }

  onNextMonthChange(nextMont: number) {
    this.datepickerService.changeMonth(nextMont);
  }
}
