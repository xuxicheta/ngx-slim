import { DatepickerService } from './datepicker.service';
import { DateFunctionsService } from './date-functions.service';
import { mockingDateFunctionsService } from './date-functions.service.mock';

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
    dateFunctionsService.normalizeDate.and.returnValue({ month: 5, year: 15 });
    const result = service.changeMonth(10);

    expect(result).toBeUndefined();
    service.month.subscribe(m => expect(m).toBe(5));
    service.year.subscribe(y => expect(y).toBe(15));
    expect(dateFunctionsService.normalizeDate).toHaveBeenCalled();
    expect(dateFunctionsService.normalizeDate).toHaveBeenCalledWith(10, new Date().getFullYear());
  });

  it('should emit changingMonth "next" after shiftMonth', () => {
    let changeMonth;
    service.changingMonth.subscribe(c => changeMonth = c);
    service.shiftMonth('next');

    expect(changeMonth).toBe('next');
  });

  it('should emit changingMonth "previous" after shiftMonth', () => {
    let changeMonth;
    service.changingMonth.subscribe(c => changeMonth = c);
    service.shiftMonth('previous');

    expect(changeMonth).toBe('previous');
  });

  it('should complete subjects after ngOnDestroy', () => {
    service.ngOnDestroy();

    expect((service as any).month$.complete).toBeTruthy();
    expect((service as any).year$.complete).toBeTruthy();
    expect((service as any).shiftMonth$.complete).toBeTruthy();
  });
});
