import { MonthNamePipe } from './month-name.pipe';
import 'ng-mocks/dist/jasmine';
import { MockService } from 'ng-mocks';
import { LocalizeService } from './localize.service';

describe('MonthNamePipe', () => {
  let pipe: MonthNamePipe;
  // const mockLocalizeService = jasmine.createSpyObj('LocalizeService', [], ['monthNames']);
  const mockLocalizeService = MockService(LocalizeService);

  beforeEach(() => {
    pipe = new MonthNamePipe(mockLocalizeService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
