import { async, TestBed } from '@angular/core/testing';

import { DozenComponent } from './dozen.component';
import { MockedComponentFixture, MockRender } from 'ng-mocks';

const createWrapper = () => ({
  date: new Date(2020, 4, 10),
  chosenDate: new Date(2020, 4, 20),
  pickYear: jasmine.createSpy(),
});

describe('DozenComponent', () => {
  let component: DozenComponent;
  let fixture: MockedComponentFixture<DozenComponent, ReturnType<typeof createWrapper>>;
  let wrapper: ReturnType<typeof createWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DozenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    wrapper = createWrapper();
    fixture = MockRender(DozenComponent, wrapper);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have dozen', () => {
    expect(component.dozen).toBeTruthy();
    expect(component.dozen.length).toBe(12);
    expect(component.dozen).toContain(wrapper.date.getFullYear());
  });

  it('should have dozen as 0-11 when date is 5', () => {
    const date = new Date();
    date.setFullYear(1);
    fixture.componentInstance.date = date;
    fixture.detectChanges();
    expect(component.dozen[0]).toBe(0);
    expect(component.dozen[11]).toBe(11);
  });

  it('should have dozen as 2016-2027 when date is 2020', () => {
    fixture.componentInstance.date = new Date(2020, 8);
    fixture.detectChanges();
    expect(component.dozen[0]).toBe(2016);
    expect(component.dozen[11]).toBe(2027);
  });

  it('should have dozen as 2016-2027 when date is 2016', () => {
    fixture.componentInstance.date = new Date(2016, 8);
    fixture.detectChanges();
    expect(component.dozen[0]).toBe(2016);
    expect(component.dozen[11]).toBe(2027);
  });

  it('should have dozen as 2016-2027 when date is 2027', () => {
    fixture.componentInstance.date = new Date(2027, 8);
    fixture.detectChanges();
    expect(component.dozen[0]).toBe(2016);
    expect(component.dozen[11]).toBe(2027);
  });

  it('should render dozen', () => {
    fixture.detectChanges();
    const yearEls: HTMLDivElement[] = fixture.nativeElement.querySelectorAll('.year.cell');
    expect(yearEls.length).toBe(12);
    yearEls.forEach((el, i) => {
      expect(el.textContent.trim()).toBe(component.dozen[i].toString());
    });
  });

  it('should have ability to pick year', () => {
    fixture.detectChanges();
    const yearEl: HTMLDivElement = fixture.nativeElement.querySelectorAll('.year.cell')[5];
    yearEl.click();
    expect(wrapper.pickYear).toHaveBeenCalledWith(+yearEl.textContent);
  });

  describe('today', () => {
    it('should have today when show current dozen', () => {
      const baseTime = new Date(2019, 9);
      const date = new Date(2020, 10);
      jasmine.clock().mockDate(baseTime);

      fixture.componentInstance.date = date;
      fixture.detectChanges();

      const todayEl: HTMLDivElement = fixture.nativeElement.querySelector('.today');
      expect(todayEl.textContent.trim()).toBe(baseTime.getFullYear().toString());
    });

    it('shouldn\'t have today when show not current dozen', () => {
      const baseTime = new Date(2019, 9);
      const date = new Date(2005, 10);
      jasmine.clock().mockDate(baseTime);

      fixture.componentInstance.date = date;
      fixture.detectChanges();

      const todayEl: HTMLDivElement = fixture.nativeElement.querySelector('.today');
      expect(todayEl).toBeFalsy();
    });
  });

  describe('chosen', () => {
    it('should have chosen show chosen dozen', () => {
      const chosenDate = new Date(2023, 10);

      fixture.componentInstance.chosenDate = chosenDate;
      fixture.detectChanges();

      const chosenEl: HTMLDivElement = fixture.nativeElement.querySelector('.chosen');
      expect(chosenEl.textContent.trim()).toBe(chosenDate.getFullYear().toString());
    });

    it('shouldn\'t have chosen show not chosen dozen', () => {
      fixture.componentInstance.chosenDate = new Date(2005, 10);
      fixture.detectChanges();

      const chosenEl: HTMLDivElement = fixture.nativeElement.querySelector('.chosen');
      expect(chosenEl).toBeFalsy();
    });
  });
});
