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

  constructor(
    private datepickerService: DatepickerService,
  ) { }

  ngOnInit(): void {
  }

  onPreviousClick() {
    this.datepickerService.shiftMonth('previous');
  }

  onNextClick() {
    this.datepickerService.shiftMonth('next');
  }
}
