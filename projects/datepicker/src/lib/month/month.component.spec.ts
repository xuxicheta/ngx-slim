import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MonthComponent } from './month.component';


describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call createCalendarArray', () => {
  //   component.date = new Date();
  //   expect(component.calendar).toEqual([22]);
  // });

  it('should render days calendar', () => {
    component.calendar = [1, 2, 3, 4, 5, 6, 7];
    fixture.detectChanges();
    const days = fixture.debugElement.queryAll(By.css('.day'));
    expect(days.length).toBe(7);
  });
});
