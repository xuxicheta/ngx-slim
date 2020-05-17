import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlComponent } from './control.component';
import { MockComponent, MockPipe } from 'ng-mocks';
import { ArrowComponent } from '../arrow/arrow.component';
import { MonthNamePipe } from '../localize/month-name.pipe';
import { By } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';

describe('ControlComponent', () => {
  let component: ControlComponent;
  let fixture: ComponentFixture<ControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ControlComponent,
        MockComponent(ArrowComponent),
        MockPipe(MonthNamePipe, (x: number) => `${x}`),
        MockPipe(TitleCasePipe, (x: string) => `${x}${x}`),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two arrows', () => {
    const arrows = fixture.debugElement.queryAll(By.directive(ArrowComponent));
    const flipped = fixture.debugElement.queryAll(By.css('.flip'));
    expect(arrows.length).toBe(2);
    expect(flipped.length).toBe(1);
  });

  it('should left arrow click emit -1', () => {
    let emitted: number = null;
    component.turn.subscribe(turn => emitted = turn);
    const arrows = fixture.debugElement.queryAll(By.directive(ArrowComponent));
    (arrows[0].nativeElement as HTMLElement).click();
    expect(emitted).toBe(-1);
  });

  it('should right arrow click emit 1', () => {
    let emitted: number = null;
    component.turn.subscribe(turn => emitted = turn);
    const arrows = fixture.debugElement.queryAll(By.directive(ArrowComponent));
    (arrows[0].nativeElement as HTMLElement).click();
    expect(emitted).toBe(-1);
  });

  it('should have control panel', () => {
    const controlPanel = fixture.debugElement.query(By.css('.control-panel'));
    expect(controlPanel).toBeTruthy();
  });

  it('should have control panel text', () => {
    component.month = 1;
    component.year = 2000;
    fixture.detectChanges();
    const spans = fixture.nativeElement.querySelectorAll('.control-panel span');
    expect(spans.length).toBe(2);
    expect(spans[0].textContent).toBe('11');
    expect(spans[1].textContent).toBe('2000');
  });

  it('should month click emit pickMonth', () => {
    let emitted: number = null;
    component.pickMonth.subscribe(() => emitted = 1);
    const spanMonth = fixture.nativeElement.querySelectorAll('.control-panel span')[0];
    spanMonth.click();
    expect(emitted).toBe(1);
  });

  it('should year click emit pickYear', () => {
    let emitted: number = null;
    component.pickYear.subscribe(() => emitted = 1);
    const spanMonth = fixture.nativeElement.querySelectorAll('.control-panel span')[1];
    spanMonth.click();
    expect(emitted).toBe(1);
  });
});
