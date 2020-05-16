import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'slim-arrow',
  templateUrl: './arrow.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ArrowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
