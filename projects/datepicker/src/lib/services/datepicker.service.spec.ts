import { DatepickerService, MonthTurn } from './datepicker.service';
import { DateFunctionsService } from './date-functions.service';
import { mockingDateFunctionsService } from './date-functions.service.mock';
import { Subject } from 'rxjs';

describe('DatepickerService', () => {
  let service: DatepickerService;
  let dateFunctionsService: jasmine.SpyObj<DateFunctionsService>;

  beforeEach(() => {
    dateFunctionsService = mockingDateFunctionsService();
    service = new DatepickerService(dateFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit year and month after changeMonth', () => {
    dateFunctionsService.normalizeDate.and.returnValue({ month: 5, year: 15, date: null });
    const result = service.changeMonth(10);

    expect(result).toBeUndefined();
    service.month.subscribe(m => expect(m).toBe(5));
    service.year.subscribe(y => expect(y).toBe(15));
    expect(dateFunctionsService.normalizeDate).toHaveBeenCalled();
    expect(dateFunctionsService.normalizeDate).toHaveBeenCalledWith(10, new Date().getFullYear());
  });

  it('should emit changingMonth "next" after shiftMonth', () => {
    let monthTurn: MonthTurn;
    service.monthTurn.subscribe(c => monthTurn = c);
    service.setMonthTurn({ turn: 1 });

    expect(monthTurn).toEqual({ turn: 1 });
  });

  it('should emit changingMonth "previous" after shiftMonth', () => {
    let monthTurn: MonthTurn;
    service.monthTurn.subscribe(c => monthTurn = c);
    service.setMonthTurn({ turn: -1 });

    expect(monthTurn).toEqual({ turn: -1 });
  });

  it('should complete subjects after ngOnDestroy', () => {
    service.ngOnDestroy();
    const { month$, year$, monthTurn$ } = service as unknown as Record<string, Subject<any>>;

    expect(month$.isStopped).toBeTruthy();
    expect(year$.isStopped).toBeTruthy();
    expect(monthTurn$.isStopped).toBeTruthy();
  });
});
