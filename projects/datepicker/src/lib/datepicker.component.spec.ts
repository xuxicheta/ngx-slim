import { ChangeDetectorRef } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MockComponent, MockedComponent, MockedComponentFixture, MockedDebugElement, MockHelper, MockRender } from 'ng-mocks';
import { mockProvider } from '../test/mock-provider';
import { ControlComponent } from './control/control.component';
import { DatepickerComponent } from './datepicker.component';
import { DatepickerService } from './datepicker.service';
import { DozenComponent } from './dozen/dozen.component';
import { LeaferComponent } from './leafer/leafer.component';
import { Mode } from './mode.enum';
import { MonthComponent } from './month/month.component';
import { YearComponent } from './year/year.component';

const createWrapper = () => ({
});

describe('DatepickerComponent', () => {
  let fixture: MockedComponentFixture<DatepickerComponent, ReturnType<typeof createWrapper>>;
  let wrapper: ReturnType<typeof createWrapper>;
  let component: DatepickerComponent;
  let slimControl: ControlComponent;
  let slimLeaferDE: MockedDebugElement<LeaferComponent>;
  let slimLeafer: MockedComponent<LeaferComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatepickerComponent,
        MockComponent(ControlComponent),
        MockComponent(YearComponent),
        MockComponent(MonthComponent),
        MockComponent(DozenComponent),
        MockComponent(LeaferComponent),
      ],
      providers: [
        mockProvider(DatepickerService),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    wrapper = createWrapper();
    fixture = MockRender(DatepickerComponent, wrapper);
    component = fixture.point.componentInstance;

    fixture.detectChanges();

    slimControl = MockHelper.find<ControlComponent>(fixture.debugElement, 'slim-control').componentInstance;
    slimLeaferDE = MockHelper.find<LeaferComponent>(fixture.debugElement, 'slim-leafer');
    slimLeafer = slimLeaferDE.componentInstance as MockedComponent<LeaferComponent>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('slim-control', () => {
    it('should have slim-control', () => {
      expect(slimControl).toBeTruthy();
    });

    it('should transfer date to slim-control', () => {
      expect(slimControl.date).toBe(component.date);
    });

    it('should transfer mode to slim-control', () => {
      expect(slimControl.mode).toBe(component.mode);
    });

    it('should call left on slim-control emit left', () => {
      const leftSpy = spyOn(component, 'left');
      slimControl.left.emit();
      expect(leftSpy).toHaveBeenCalled();
    });

    it('should call left on slim-control emit right', () => {
      const rightSpy = spyOn(component, 'right');
      slimControl.right.emit();
      expect(rightSpy).toHaveBeenCalled();
    });

    it('should call openMonth on slim-control emit monthClick', () => {
      const openMonthSpy = spyOn(component, 'openMonth');
      slimControl.monthClick.emit();
      expect(openMonthSpy).toHaveBeenCalled();
    });

    it('should call openMonth on slim-control emit yearClick', () => {
      const openYearSpy = spyOn(component, 'openYear');
      slimControl.yearClick.emit();
      expect(openYearSpy).toHaveBeenCalled();
    });
  });

  describe('slim-leafer', () => {
    it('should have slim-leafer', () => {
      expect(slimLeafer).toBeTruthy();
    });

    it('should transfer leaf to slim-leafer', () => {
      expect(slimLeafer.leaf).toBe(component.leaf);
    });

    it('should call onMonthAnimationDone on slim-leafer emit leafDone', () => {
      const onMonthAnimationDoneSpy = spyOn(component, 'onMonthAnimationDone');
      slimLeafer.leafDone.emit();
      expect(onMonthAnimationDoneSpy).toHaveBeenCalled();
    });
  });

  describe('slim-month', () => {
    let slimMonthDE: MockedDebugElement<MonthComponent>;
    let slimMonth: MonthComponent;

    beforeEach(() => {
      component.mode = Mode.Day;
      fixture.detectChanges();
      slimMonthDE = MockHelper.find<MonthComponent>(fixture.debugElement, 'slim-month');
      slimMonth = slimMonthDE.componentInstance;
    });


    it('should have slim-month', () => {
      expect(slimMonth).toBeTruthy();
    });

    it('should transfer date to slim-month', () => {
      expect(slimMonth.date).toBe(component.date);
    });

    it('should transfer chosenDate to slim-month', () => {
      expect(slimMonth.chosenDate).toBe(component.chosenDate);
    });

    it('should call pickDay on slim-month emit pickDate', () => {
      const pickDaySpy = spyOn(component, 'pickDay');
      slimMonth.pickDate.emit(1);
      expect(pickDaySpy).toHaveBeenCalledWith(1);
    });
  });

  describe('slim-year', () => {
    let slimYearDE: MockedDebugElement<YearComponent>;
    let slimYear: MockedComponent<YearComponent>;

    beforeEach(async () => {
      component.mode = Mode.Month;
      fixture.point.injector.get(ChangeDetectorRef).detectChanges();
      slimYearDE = MockHelper.find<YearComponent>(fixture.debugElement, 'slim-year');
      slimYear = slimYearDE.componentInstance as MockedComponent<YearComponent>;
    });


    it('should have slim-year', async () => {
      expect(slimYear).toBeTruthy();
    });

    it('should transfer date to slim-year', () => {
      expect(slimYear.date).toBe(component.date);
    });

    it('should transfer chosenDate to slim-year', () => {
      expect(slimYear.chosenDate).toBe(component.chosenDate);
    });

    it('should call pickMonth on slim-year emit pickMonth', () => {
      const pickMonthSpy = spyOn(component, 'pickMonth');
      slimYear.pickMonth.emit(1);
      expect(pickMonthSpy).toHaveBeenCalledWith(1);
    });
  });
});

