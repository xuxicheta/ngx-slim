import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'slim-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ControlComponent {
  @Input() year: number;
  @Input() month: number;

  @Output() turn = new EventEmitter<number>();
  @Output() pickMonth = new EventEmitter();
  @Output() pickYear = new EventEmitter();
}
