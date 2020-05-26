import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, HostListener } from '@angular/core';
import { Mode } from '../mode.enum';

@Component({
  selector: 'slim-control',
  templateUrl: './control.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'slim-control' },
})
export class ControlComponent {
  @Input() date: Date;
  @Input() mode: Mode;

  @Output() left = new EventEmitter<number>();
  @Output() right = new EventEmitter<number>();
  @Output() monthClick = new EventEmitter();
  @Output() yearClick = new EventEmitter();

  Mode = Mode;
}
