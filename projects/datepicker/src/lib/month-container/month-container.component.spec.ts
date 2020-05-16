import { AnimationEvent } from '@angular/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent, MockedComponent } from 'ng-mocks';
import { MonthComponent } from '../month/month.component';
import { MonthContainerComponent } from './month-container.component';


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

  it('should have default parameters', () => {
    expect(component.nextMonth).toBe(0);
    expect(component.animationState).toBe('stable');
  });

  it('should contain two slim-month', () => {
    fixture.detectChanges();
    const slimMonthDE = fixture.debugElement.queryAll(By.directive(MonthComponent));
    expect(slimMonthDE.length).toBe(2);
  });

  it('should monthes gets inputs parameters', () => {
    component.year = 1005;
    component.month = 5;
    component.nextMonth = 4;
    fixture.detectChanges();

    const flying: MockedComponent<MonthComponent> = fixture.debugElement.query(By.css('.flying-month')).componentInstance;
    const current: MockedComponent<MonthComponent> = fixture.debugElement.query(By.css('.current-month')).componentInstance;

    expect(flying.month).toBe(component.nextMonth);
    expect(flying.year).toBe(component.year);

    expect(current.month).toBe(component.month);
    expect(current.year).toBe(component.year);
  });

  it('should change animationState and nextMonty after getting positive monthTurn', () => {
    component.month = 5;
    component.monthTurn = { turn: 1 };
    expect(component.nextMonth).toBe(6);
    expect(component.animationState).toBe('next');
  });

  it('should change animationState and nextMonty after getting negative monthTurn', () => {
    component.month = 5;
    component.monthTurn = { turn: -1 };
    expect(component.nextMonth).toBe(4);
    expect(component.animationState).toBe('previous');
  });

  it('should call onCurrentDone after setting animationState "next"', async () => {
    spyOn(component, 'onCurrentDone');
    component.animationState = 'next';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.onCurrentDone).toHaveBeenCalled();
  });

  it('should call onCurrentDone after setting animationState "previous"', async () => {
    spyOn(component, 'onCurrentDone');
    component.animationState = 'previous';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.onCurrentDone).toHaveBeenCalled();
  });

  it('should change animationState and nextMonth after call onCurrentDone', async () => {
    let emittedNextMonth: number = null;
    const evt = { toState: 'previous' } as AnimationEvent;
    component.nextMonthChange.subscribe(n => emittedNextMonth = n);
    component.animationState = 'previous';
    component.nextMonth = 11;
    component.onCurrentDone(evt);

    expect(emittedNextMonth).toBe(11);
    expect(component.nextMonth).toBe(0);
    expect(component.animationState).toBe('stable');
  });
});
