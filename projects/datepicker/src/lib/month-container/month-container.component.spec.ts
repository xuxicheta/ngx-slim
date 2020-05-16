import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthContainerComponent } from './month-container.component';
import { MockComponent } from 'ng-mocks';
import { MonthComponent } from '../month/month.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('YearComponent', () => {
  let component: MonthContainerComponent;
  let fixture: ComponentFixture<MonthContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthContainerComponent, MockComponent(MonthComponent)],
      imports: [
        NoopAnimationsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
