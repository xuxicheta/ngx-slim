import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { LocalizeService } from '../localize/localize.service';

@Component({
  selector: 'slim-month-chooser',
  templateUrl: './month-chooser.component.html',
  styleUrls: ['./month-chooser.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MonthChooserComponent {
  public monthNames = this.localizeService.monthNames;
  @Output() pickMonth = new EventEmitter<number>();

  constructor(
    private localizeService: LocalizeService,
  ) { }
}
