import { FormStyle, getLocaleMonthNames, TitleCasePipe, TranslationWidth } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockPipe } from 'ng-mocks';
import { YearComponent } from './year.component';


describe('MonthChooserComponent', () => {
  const monthNames = getLocaleMonthNames('ru', FormStyle.Standalone, TranslationWidth.Wide);
  let component: YearComponent;
  let fixture: ComponentFixture<YearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        YearComponent,
        MockPipe(TitleCasePipe, (v: string) => v),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render monthes', () => {
    const divMonthContents = fixture.debugElement.queryAll(By.css('.month')).map(de => de.nativeElement.textContent.trim()) as string[];
    expect(divMonthContents).toEqual(monthNames);
  });

  it('should emit pickMonth after click at month', () => {
    const clicksResult = [];
    component.pickMonth.subscribe((v) => clicksResult.push(v));
    const expectedResult = Array.from(Array(12), (_, i) => i);

    const divMonths = fixture.debugElement.queryAll(By.css('.month')).map(de => de.nativeElement) as HTMLDivElement[];
    divMonths.forEach(divMonth => divMonth.click());
    expect(clicksResult).toEqual(expectedResult);
  });
});
