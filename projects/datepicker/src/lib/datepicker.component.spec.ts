import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockPipe, Mock } from 'ng-mocks';
import { DatepickerComponent } from './datepicker.component';
import { MonthContainerComponent } from './month-container/month-container.component';
import { DateFunctionsService } from './services/date-functions.service';
import { DatepickerService } from './services/datepicker.service';
import { mockingDatepickerService } from './services/datepicker.service.mocks';
import { MonthNamePipe } from './localize/month-name.pipe';
import { ControlComponent } from './control/control.component';
import { LocalizeService } from './localize/localize.service';


describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;
  let datepickerService: DatepickerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatepickerComponent,
        MockComponent(MonthContainerComponent),
        MockComponent(ControlComponent),
      ],
      providers: [DateFunctionsService, LocalizeService],
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
