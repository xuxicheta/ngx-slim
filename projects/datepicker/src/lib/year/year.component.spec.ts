import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearComponent } from './year.component';
import { LocalizeService } from '../localize/localize.service';
import { MockService, MockHelper, MockPipe } from 'ng-mocks';
import { getLocaleMonthNames, FormStyle, TranslationWidth, TitleCasePipe, CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { mockProvider } from '../../test/mock-provider';
import { ClickOutsideService } from '../click-outside/click-outside.service';

describe('MonthChooserComponent', () => {
  const monthNames = getLocaleMonthNames('ru', FormStyle.Standalone, TranslationWidth.Wide);
  let component: YearComponent;
  let fixture: ComponentFixture<YearComponent>;
  let localizeService: jasmine.SpyObj<LocalizeService>;

  beforeEach(async(() => {
    const mocklocalizeService = MockService(LocalizeService);
    MockHelper.mockService<jasmine.Spy>(mocklocalizeService, 'monthNames', 'get').and.returnValue(monthNames);

    TestBed.configureTestingModule({
      declarations: [
        YearComponent,
        MockPipe(TitleCasePipe, (v: string) => v),
      ],
      providers: [{
        provide: LocalizeService,
        useValue: mocklocalizeService,
      }]
    })
      .overrideComponent(YearComponent, {
        set: {
          providers: [
            mockProvider(ClickOutsideService)
          ]
        }
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearComponent);
    component = fixture.componentInstance;
    localizeService = TestBed.inject(LocalizeService) as jasmine.SpyObj<LocalizeService>;
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
