import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { leaferAnimations } from './leafer.animations';

@Component({
  selector: 'slim-leafer',
  templateUrl: './leafer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: leaferAnimations,
  host: { class: 'slim-leafer' },
})
export class LeaferComponent {
  @Input() leaf: 'stable' | 'next' | 'previous' = 'stable';
  @Output() leafDone = new EventEmitter();

  @HostBinding('@.disabled') disabled = false;

  onAnimationDone(evt: AnimationEvent) {
    if (evt.toState !== 'stable') {
      this.leaf = 'stable';
      this.leafDone.emit();
    }
  }

}
