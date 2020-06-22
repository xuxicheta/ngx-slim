import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineComponentPageComponent } from './inline-component-page.component';

describe('InlineComponentPageComponent', () => {
  let component: InlineComponentPageComponent;
  let fixture: ComponentFixture<InlineComponentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineComponentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineComponentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
