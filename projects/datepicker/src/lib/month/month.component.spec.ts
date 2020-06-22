import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockedComponentFixture, MockRender } from 'ng-mocks';
import { MonthComponent } from './month.component';

const createWrapper = () => ({
  date: new Date(2020, 4, 10),
  chosenDate: new Date(2020, 4, 20),
  pickDate: jasmine.createSpy(),
});


describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: MockedComponentFixture<MonthComponent, ReturnType<typeof createWrapper>>;
  let wrapper: ReturnType<typeof createWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    wrapper = createWrapper();
    fixture = MockRender(MonthComponent, wrapper);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createCalendar', () => {

    it('should create calendar when date is may 2020', () => {
      fixture.componentInstance.date = new Date(2020, 4);
      fixture.detectChanges();

      const result = component.calendar;

      expect(result.length).toBe(35);
      expect(result[3]).toBe(null);
      expect(result[4]).toBe(1);
      expect(result[34]).toBe(31);
    });

    it('january 2009', () => {
      fixture.componentInstance.date = new Date(2009, 0);
      fixture.detectChanges();

      const result = component.calendar;

      expect(result.length).toBe(35);
      expect(result[2]).toBe(null);
      expect(result[3]).toBe(1);
      expect(result[33]).toBe(31);
      expect(result[34]).toBe(null);
    });

    it('october 1985', () => {
      fixture.componentInstance.date = new Date(1985, 9);
      fixture.detectChanges();

      const result = component.calendar;

      expect(result.length).toBe(35);
      expect(result[0]).toBe(null);
      expect(result[1]).toBe(1);
      expect(result[31]).toBe(31);
    });
  });

  it('should render days calendar', () => {
    fixture.componentInstance.date = new Date(2020, 4);
    fixture.detectChanges();
    const days = fixture.debugElement.queryAll(By.css('.day'));
    expect(days.length).toBe(35);
    expect(days[4].nativeElement.textContent.trim()).toBe('1');
    expect(days[34].nativeElement.textContent.trim()).toBe('31');
  });

  it('should have ability to pick a date', () => {
    fixture.detectChanges();
    const dateEl: HTMLDivElement = fixture.nativeElement.querySelectorAll('.day.cell')[5];
    dateEl.click();
    expect(wrapper.pickDate).toHaveBeenCalledWith(+dateEl.textContent);
  });

  describe('today', () => {
    it('should have today when in current month', () => {
      const baseTime = new Date(2020, 5, 10);
      const date = new Date(2020, 5, 4);
      jasmine.clock().mockDate(baseTime);

      fixture.componentInstance.date = date;
      fixture.detectChanges();

      const todayEl: HTMLDivElement = fixture.nativeElement.querySelector('.today');
      expect(todayEl.textContent.trim()).toBe(baseTime.getDate().toString());
    });

    it('shouldn\'t have today when in not current month', () => {
      const baseTime = new Date(2020, 5);
      const date = new Date(2020, 7);
      jasmine.clock().mockDate(baseTime);

      fixture.componentInstance.date = date;
      fixture.detectChanges();

      const todayEl: HTMLDivElement = fixture.nativeElement.querySelector('.today');
      expect(todayEl).toBeFalsy();
    });

    it('shouldn\'t have today when in not current year', () => {
      const baseTime = new Date(2020, 5);
      const date = new Date(2019, 5);
      jasmine.clock().mockDate(baseTime);

      fixture.componentInstance.date = date;
      fixture.detectChanges();

      const todayEl: HTMLDivElement = fixture.nativeElement.querySelector('.today');
      expect(todayEl).toBeFalsy();
    });
  });

  describe('chosen', () => {
    it('should have chosen when is chosen month', () => {
      const date = new Date(2020, 4, 15);
      const chosenDate = new Date(2020, 4, 20);

      fixture.componentInstance.date = date;
      fixture.componentInstance.chosenDate = chosenDate;
      fixture.detectChanges();

      const chosenEl: HTMLDivElement = fixture.nativeElement.querySelector('.chosen');
      expect(chosenEl.textContent.trim()).toBe(chosenDate.getDate().toString());
    });

    it('shouldn\'t have today when in not current month', () => {
      const date = new Date(2020, 3, 15);
      const chosenDate = new Date(2020, 4, 20);

      fixture.componentInstance.date = date;
      fixture.componentInstance.chosenDate = chosenDate;
      fixture.detectChanges();

      const chosenEl: HTMLDivElement = fixture.nativeElement.querySelector('.chosen');
      expect(chosenEl).toBeFalsy();
    });

    it('shouldn\'t have today when in not current year', () => {
      const date = new Date(2020, 3, 15);
      const chosenDate = new Date(2015, 3, 20);

      fixture.componentInstance.date = date;
      fixture.componentInstance.chosenDate = chosenDate;
      fixture.detectChanges();

      const chosenEl: HTMLDivElement = fixture.nativeElement.querySelector('.chosen');
      expect(chosenEl).toBeFalsy();
    });
  });


});
