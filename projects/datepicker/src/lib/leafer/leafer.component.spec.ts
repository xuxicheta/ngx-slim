import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockedComponentFixture, MockRender } from 'ng-mocks';
import { LeaferComponent } from './leafer.component';
import { AnimationEvent } from '@angular/animations';


const wrapperTemplate = `
    <slim-leafer [leaf]="leaf" [disableAnimation]="disableAnimation" (leafDone)="leafDoneListener($event)">
      <ng-container ngProjectAs="stand"><div id="stand"></div></ng-container>
      <ng-container ngProjectAs="turn"><div id="turn"></div></ng-container>
    </slim-leafer>
  `;

const createWrapper = () => ({
  leaf: 'stable',
  disableAnimation: false,
  leafDoneListener: jasmine.createSpy(),
});

describe('LeaferComponent', () => {
  let component: LeaferComponent;
  let fixture: MockedComponentFixture<LeaferComponent, ReturnType<typeof createWrapper>>;
  let wrapper: ReturnType<typeof createWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaferComponent],
      imports: [NoopAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    wrapper = createWrapper();
    fixture = MockRender(wrapperTemplate, wrapper);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default parameters', () => {
    expect(component.leaf).toBe('stable');
  });

  it('should contain context', () => {
    const standEl = fixture.point.nativeElement.querySelector('#stand');
    const turnEl = fixture.point.nativeElement.querySelector('#turn');
    expect(standEl).toBeDefined();
    expect(turnEl).toBeDefined();
  });


  it('should call onAnimationDone after setting leaf = "next"', async () => {
    spyOn(component, 'onAnimationDone');
    fixture.componentInstance.leaf = 'next';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.onAnimationDone).toHaveBeenCalled();
  });

  it('should call onAnimationDone after setting leaf = "previous"', async () => {
    await fixture.whenStable();
    spyOn(component, 'onAnimationDone');

    fixture.componentInstance.leaf = 'previous';
    fixture.detectChanges();

    await fixture.whenStable();

    expect(component.onAnimationDone).toHaveBeenCalled();

    const argument = (component.onAnimationDone as jasmine.Spy).calls.argsFor(0)[0] as AnimationEvent;
    expect(argument.toState).toBe('previous');
    expect(argument.triggerName).toBe('turn');
    expect(argument.totalTime).toBe(200);
  });


  it('should change leaf and emit leafDone after call onAnimationDone', async () => {
      const evt = { toState: 'previous' } as AnimationEvent;
      component.leaf = null;
      component.onAnimationDone(evt);

      expect(component.leaf).toBe('stable');
      expect(fixture.componentInstance.leafDoneListener).toHaveBeenCalled();
    });
});
