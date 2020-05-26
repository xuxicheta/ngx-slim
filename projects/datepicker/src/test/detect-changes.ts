import { ComponentFixture } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';

export function detectChangesOnPush<T>(fixture: ComponentFixture<T>) {
  return fixture.debugElement.injector.get(ChangeDetectorRef).detectChanges();
}
