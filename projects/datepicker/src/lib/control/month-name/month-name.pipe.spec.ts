import { MonthNamePipe } from './month-name.pipe';
import 'ng-mocks/dist/jasmine';
import { MockService, MockHelper } from 'ng-mocks';

describe('MonthNamePipe', () => {
  let pipe: MonthNamePipe;

  beforeEach(() => {
    pipe = new MonthNamePipe(mockLocalizeService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform month', () => {
    const monthNames = Array(12).fill(0).map((_, i) => 'm' + i);
    MockHelper.mockService<jasmine.Spy>(mockLocalizeService, 'monthNames', 'get').and.returnValue(monthNames);
    expect(pipe.transform(0)).toBe('m0');
    expect(pipe.transform(6)).toBe('m6');
    expect(pipe.transform(7)).toBe('m7');
  });

  it('should not transform outrange number', () => {
    const monthNames = Array(12).fill(0).map((_, i) => 'm' + i);
    MockHelper.mockService<jasmine.Spy>(mockLocalizeService, 'monthNames', 'get').and.returnValue(monthNames);
    expect(pipe.transform(12)).toBe('');
  });
});
