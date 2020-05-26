import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DozenComponent } from './dozen.component';

describe('DozenComponent', () => {
  let component: DozenComponent;
  let fixture: ComponentFixture<DozenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DozenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DozenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
