import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearComponent } from './year.component';
import { DatepickerService } from '../services/datepicker.service';
import { MockComponent } from 'ng-mocks';
import { MonthComponent } from '../month/month.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockingDatepickerService } from '../services/datepicker.service.mocks';

describe('YearComponent', () => {
  let component: YearComponent;
  let fixture: ComponentFixture<YearComponent>;
  let datepickerService: DatepickerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YearComponent, MockComponent(MonthComponent)],
      providers: [
        {
          provide: DatepickerService,
          useValue: mockingDatepickerService()
        },
      ],
      imports: [
        NoopAnimationsModule,
      ]
    })
      .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearComponent);
    datepickerService = TestBed.inject(DatepickerService);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
