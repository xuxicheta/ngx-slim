import { FormStyle, getLocaleMonthNames, TitleCasePipe, TranslationWidth } from '@angular/common';
import { async, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockedComponentFixture, MockPipe, MockRender } from 'ng-mocks';
import { YearComponent } from './year.component';
import { LOCALE_ID } from '@angular/core';

const createWrapper = () => ({
  date: new Date(2020, 4, 10),
  chosenDate: new Date(2020, 4, 20),
  pickMonth: jasmine.createSpy(),
});

const titleCaseTransform = (x: string) => x;


describe('YearComponent', () => {
  let component: YearComponent;
  let fixture: MockedComponentFixture<YearComponent, ReturnType<typeof createWrapper>>;
  let wrapper: ReturnType<typeof createWrapper>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        YearComponent,
        MockPipe(TitleCasePipe, titleCaseTransform),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    wrapper = createWrapper();
    fixture = MockRender(YearComponent, wrapper);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have monthNames', inject([LOCALE_ID], (localeId: string) => {
    const monthNames: string[] = getLocaleMonthNames(localeId, FormStyle.Standalone, TranslationWidth.Wide);
    expect(component.monthNames).toEqual(monthNames);
  }));


  it('should render monthes', () => {
    const divMonthContents = fixture.debugElement.queryAll(By.css('.month')).map(de => de.nativeElement.textContent.trim()) as string[];
    expect(divMonthContents).toEqual(component.monthNames);
  });

  it('should have ability to pick a month', () => {
    fixture.detectChanges();
    const monthEl: HTMLDivElement = fixture.nativeElement.querySelectorAll('.month.cell')[5];
    monthEl.click();
    expect(wrapper.pickMonth).toHaveBeenCalledWith(5);
  });

  describe('today', () => {
    it('should have today when in current month', inject([LOCALE_ID], (localeId: string) => {
      const baseTime = new Date(2020, 5, 10);
      const date = new Date(2020, 2, 4);
      jasmine.clock().mockDate(baseTime);
      const expectedMonth = getLocaleMonthNames(localeId, FormStyle.Standalone, TranslationWidth.Wide)[5];

      fixture.componentInstance.date = date;
      fixture.detectChanges();

      const todayEl: HTMLDivElement = fixture.nativeElement.querySelector('.today');
      expect(todayEl.textContent.trim()).toBe(expectedMonth);
    }));

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
    it('should have chosen when is chosen month', inject([LOCALE_ID], (localeId: string) => {
      const date = new Date(2020, 4, 15);
      const chosenDate = new Date(2020, 7, 20);
      const expectedMonth = getLocaleMonthNames(localeId, FormStyle.Standalone, TranslationWidth.Wide)[7];

      fixture.componentInstance.date = date;
      fixture.componentInstance.chosenDate = chosenDate;
      fixture.detectChanges();

      const chosenEl: HTMLDivElement = fixture.nativeElement.querySelector('.chosen');
      expect(chosenEl.textContent.trim()).toBe(expectedMonth);
    }));

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
