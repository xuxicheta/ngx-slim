import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { DatepickerComponent } from './datepicker.component';
import { DateFunctionsService } from './services/date-functions.service';
import { DatepickerService } from './services/datepicker.service';
import { mockingDatepickerService } from './services/datepicker.service.mocks';
import { YearComponent } from './year/year.component';


describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;
  let datepickerService: DatepickerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatepickerComponent,
        MockComponent(YearComponent)
      ],
      providers: [DateFunctionsService],
    })
      .overrideComponent(DatepickerComponent, {
        set: {
          providers: [
            {
              provide: DatepickerService,
              useValue: mockingDatepickerService(),
            },
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    datepickerService = fixture.debugElement.injector.get(DatepickerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
