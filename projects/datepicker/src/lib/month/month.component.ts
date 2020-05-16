import { ChangeDetectionStrategy, Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { DateFunctionsService } from '../services/date-functions.service';
import { HttpParams } from '@angular/common/http'

@Component({
  selector: 'slim-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MonthComponent implements OnChanges {
  @Input() year: number;
  @Input() month: number;
  public calendar: number[] = [];

  constructor(
    private dateFunctionsService: DateFunctionsService,
  ) { }

  ngOnChanges() {
    this.calendar = this.dateFunctionsService.createCalendarArray(this.month, this.year);
  }
}
