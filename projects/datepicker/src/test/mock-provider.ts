import { Type, ValueProvider } from '@angular/core';
import { MockService } from 'ng-mocks';
import 'ng-mocks/dist/jasmine';

export function mockProvider<T>(provider: Type<T>, setupMock: (m?: T) => void = () => {}): ValueProvider {
  const mocked: T = MockService(provider);
  setupMock(mocked);

  return {
    provide: provider,
    useValue: mocked,
  };
}
