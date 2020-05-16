import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DateFunctionsService } from '../services/date-functions.service';
import { mockingDateFunctionsService } from '../services/date-functions.service.mock';
import { MonthComponent } from './month.component';


describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;
  let dateFunctionsService: jasmine.SpyObj<DateFunctionsService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthComponent],
      providers: [
        {
          provide: DateFunctionsService,
          useValue: mockingDateFunctionsService(),
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthComponent);
    dateFunctionsService = TestBed.inject(DateFunctionsService) as jasmine.SpyObj<DateFunctionsService>;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createCalendarArray', () => {
    component.month = 0;
    component.year = 1400;
    dateFunctionsService.createCalendarArray.and.returnValue([22]);
    component.ngOnChanges();

    expect(dateFunctionsService.createCalendarArray).toHaveBeenCalledWith(0, 1400);
    expect(component.calendar).toEqual([22]);
  });

  it('should render days calendar', () => {
    component.calendar = [1, 2, 3, 4, 5, 6, 7];
    fixture.detectChanges();
    const days = fixture.debugElement.queryAll(By.css('.day'));
    expect(days.length).toBe(7);
  });
});
