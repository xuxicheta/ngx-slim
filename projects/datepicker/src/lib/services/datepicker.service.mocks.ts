import { BehaviorSubject, Subject } from 'rxjs';
import { DatepickerService, MonthTurn } from './datepicker.service';

export function mockingDatepickerService(data: Partial<DatepickerService> = {}) {
  const emptyData = {
    month: new BehaviorSubject(0),
    year: new BehaviorSubject(0),
    changingMonth: new Subject<MonthTurn>(),
  };

  return jasmine.createSpyObj<DatepickerService>(
    'DatepickerService',
    ['changeMonth', 'setMonthTurn', 'ngOnDestroy'],
    {
      ...emptyData,
      ...data,
    });
}
