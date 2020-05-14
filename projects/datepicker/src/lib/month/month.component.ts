import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { DateFunctionsService } from '../services/date-functions.service';

@Component({
  selector: 'slim-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MonthComponent implements OnInit, OnChanges {
  @Input() year: number;
  @Input() month: number;
  public calendar;

  constructor(
    private dateFunctionsService: DateFunctionsService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    const { month, year } = this.dateFunctionsService.normalizeDate(this.month, this.year);
    this.calendar = this.createCalendar(month, year);
  }

  private createCalendar(month: number, year: number) {
    const { localizedGetDay } = this.dateFunctionsService;

    const startDate = new Date(year, month, 1, 12);
    const endDate = new Date(year, month + 1, 0, 12);
    const startDay = localizedGetDay(startDate);
    const endDay = localizedGetDay(endDate);

    let calendar = Array(startDay).fill('');
    for (let i = 1; i <= endDate.getDate(); i++) {
      calendar.push(i);
    }
    calendar = calendar.concat(Array(7 - endDay).fill(''));

    return calendar;
  }

}
