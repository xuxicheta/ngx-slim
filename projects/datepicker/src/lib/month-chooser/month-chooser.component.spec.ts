import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthChooserComponent } from './month-chooser.component';
import { LocalizeService } from '../localize/localize.service';
import { MockService } from 'ng-mocks';

describe('MonthChooserComponent', () => {
  let component: MonthChooserComponent;
  let fixture: ComponentFixture<MonthChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthChooserComponent ],
      providers: [{
        provide: LocalizeService,
        useValue: MockService(LocalizeService),
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthChooserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
