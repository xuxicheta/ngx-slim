import { TitleCasePipe } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent, MockedComponentFixture, MockPipe, MockRender } from 'ng-mocks';
import { ArrowComponent } from '../arrow/arrow.component';
import { Mode } from '../mode.enum';
import { ControlComponent } from './control.component';
import { MonthNamePipe } from './month-name/month-name.pipe';
import { DozenNamePipe } from './dozen-name/dozen-name.pipe';


class ControlComponentWrapper {
  constructor(
    public date: Date,
    public mode: Mode,
    public left: jasmine.Spy,
    public right: jasmine.Spy,
    public yearClick: jasmine.Spy,
    public monthClick: jasmine.Spy,
  ) {}
}

const monthNameTransform = (x: number) => `${x}`;
const titleCaseTransform = (x: string) => `${x}${x}`;
const dozenNameTransform = (x: number) => `${x} - ${x + 12}`;

describe('ControlComponent', () => {
  let component: ControlComponent;
  let fixture: MockedComponentFixture<ControlComponent, ControlComponentWrapper>;
  let wrapper: ControlComponentWrapper;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ControlComponent,
        MockComponent(ArrowComponent),
        MockPipe(MonthNamePipe, monthNameTransform),
        MockPipe(TitleCasePipe, titleCaseTransform),
        MockPipe(DozenNamePipe, dozenNameTransform),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    wrapper = new ControlComponentWrapper(
      new Date(),
      Mode.Day,
      jasmine.createSpy(),
      jasmine.createSpy(),
      jasmine.createSpy(),
      jasmine.createSpy(),
    );

    fixture = MockRender(ControlComponent, wrapper);
    component = fixture.point.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.point.nativeElement.classList).toContain('slim-control');
  });

  it('should have two arrows', () => {
    const arrows = fixture.debugElement.queryAll(By.directive(ArrowComponent));
    const flipped = fixture.debugElement.queryAll(By.css('.flip'));
    expect(arrows.length).toBe(2);
    expect(flipped.length).toBe(1);
  });

  it('should left arrow click emit left', () => {
    const arrows = fixture.debugElement.queryAll(By.directive(ArrowComponent));
    (arrows[0].nativeElement as HTMLElement).click();
    expect(wrapper.left).toHaveBeenCalled();
  });

  it('should right arrow click emit right', () => {
    const arrows = fixture.debugElement.queryAll(By.directive(ArrowComponent));
    (arrows[1].nativeElement as HTMLElement).click();
    expect(wrapper.right).toHaveBeenCalled();
  });

  it('should have control panel', () => {
    const controlPanel = fixture.debugElement.query(By.css('.control-panel'));
    expect(controlPanel).toBeTruthy();
  });

  it('should have control panel content when mode = Day', () => {
    fixture.componentInstance.mode = Mode.Day;
    fixture.detectChanges();

    const monthPanel: HTMLDivElement = fixture.nativeElement.querySelector('.month-panel');
    const yearPanel: HTMLDivElement = fixture.nativeElement.querySelector('.year-panel');
    expect(monthPanel.textContent.trim()).toBe(titleCaseTransform(monthNameTransform(wrapper.date.getMonth())));
    expect(yearPanel.textContent.trim()).toBe(wrapper.date.getFullYear().toString());

    monthPanel.click();
    expect(wrapper.monthClick).toHaveBeenCalled();

    yearPanel.click();
    expect(wrapper.yearClick).toHaveBeenCalled();
  });

  it('should have control panel content when mode = Month', () => {
    fixture.componentInstance.mode = Mode.Month;
    fixture.detectChanges();

    const monthPanel: HTMLDivElement = fixture.nativeElement.querySelector('.month-panel');
    const yearPanel = fixture.nativeElement.querySelector('.year-panel');
    expect(monthPanel).toBeFalsy();
    expect(yearPanel.textContent.trim()).toBe(wrapper.date.getFullYear().toString());

    yearPanel.click();
    expect(wrapper.yearClick).toHaveBeenCalled();
  });

  it('should have control panel content when mode = Year', () => {
    fixture.componentInstance.mode = Mode.Year;
    fixture.detectChanges();

    const monthPanel: HTMLDivElement = fixture.nativeElement.querySelector('.month-panel');
    const yearPanel = fixture.nativeElement.querySelector('.year-panel');
    const dozenPanel = fixture.nativeElement.querySelector('.dozen-panel');
    expect(monthPanel).toBeFalsy();
    expect(yearPanel).toBeFalsy();
    expect(dozenPanel.textContent.trim()).toBe(dozenNameTransform(wrapper.date.getFullYear()));

    dozenPanel.click();
    expect(wrapper.yearClick).toHaveBeenCalled();
  });
});
