import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { mockProvider } from '../test/mock-provider';
import { ControlComponent } from './control/control.component';
import { DatepickerComponent } from './datepicker.component';
import { YearComponent } from './year/year.component';
import { MonthComponent } from './month/month.component';
import { DozenComponent } from './dozen/dozen.component';
import { DatepickerService } from './datepicker.service';
import { LeaferComponent } from './leafer/leafer.component';


describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatepickerComponent,
        MockComponent(ControlComponent),
        MockComponent(YearComponent),
        MockComponent(MonthComponent),
        MockComponent(DozenComponent),
        MockComponent(LeaferComponent),
      ],
      providers: [
        mockProvider(DatepickerService),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// it('should emit year and month after changeMonth', () => {
//   dateFunctionsService.normalizeDate.and.returnValue({ month: 5, year: 15, date: null });
//   const result = service.changeMonth(10);

//   expect(result).toBeUndefined();
//   service.month.subscribe(m => expect(m).toBe(5));
//   service.year.subscribe(y => expect(y).toBe(15));
//   expect(dateFunctionsService.normalizeDate).toHaveBeenCalled();
//   expect(dateFunctionsService.normalizeDate).toHaveBeenCalledWith(10, new Date().getFullYear());
// });

// it('should emit changingMonth "next" after shiftMonth', () => {
//   let monthTurn: MonthTurn;
//   service.monthTurn.subscribe(c => monthTurn = c);
//   service.setMonthTurn({ turn: 1 });

//   expect(monthTurn).toEqual({ turn: 1 });
// });

// it('should emit changingMonth "previous" after shiftMonth', () => {
//   let monthTurn: MonthTurn;
//   service.monthTurn.subscribe(c => monthTurn = c);
//   service.setMonthTurn({ turn: -1 });

//   expect(monthTurn).toEqual({ turn: -1 });
// });

// it('should complete subjects after ngOnDestroy', () => {
//   service.ngOnDestroy();
//   const { month$, year$, monthTurn$ } = service as unknown as Record<string, Subject<any>>;

//   expect(month$.isStopped).toBeTruthy();
//   expect(year$.isStopped).toBeTruthy();
//   expect(monthTurn$.isStopped).toBeTruthy();
// });
