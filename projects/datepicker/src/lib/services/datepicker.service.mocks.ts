import { BehaviorSubject, Subject } from 'rxjs';
import { DatepickerService } from './datepicker.service';

export function mockingDatepickerService(data: Partial<DatepickerService> = {}) {
  const emptyData = {
    month: new BehaviorSubject(0),
    year: new BehaviorSubject(0),
    changingMonth: new Subject<'next'|'previous'>(),
  };

  return jasmine.createSpyObj<DatepickerService>(
    'DatepickerService',
    ['changeMonth', 'shiftMonth', 'ngOnDestroy'],
    {
      ...emptyData,
      ...data,
    });
}
