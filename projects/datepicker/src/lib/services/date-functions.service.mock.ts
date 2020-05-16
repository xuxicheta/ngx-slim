import { DateFunctionsService } from './date-functions.service';

export function mockingDateFunctionsService() {
  return jasmine.createSpyObj<DateFunctionsService>(
    'DateFunctionsService',
    ['normalizeDate', 'localizedGetDay', 'createCalendarArray']);
}
