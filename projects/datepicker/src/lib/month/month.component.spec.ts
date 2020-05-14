import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthComponent } from './month.component';
import { DateFunctionsService } from '../services/date-functions.service';
import { mockingDateFunctionsService } from '../services/date-functions.service.mock';

describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;
  let dateFunctionsService: DateFunctionsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthComponent],
      providers: [
        {
          provide: DateFunctionsService,
          useValue: mockingDateFunctionsService(),
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthComponent);
    dateFunctionsService = TestBed.inject(DateFunctionsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
