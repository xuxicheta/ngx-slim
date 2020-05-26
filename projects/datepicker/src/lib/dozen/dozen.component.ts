import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { falser } from '../falser';

@Component({
  selector: 'slim-dozen',
  templateUrl: './dozen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'slim-dozen' },
})
export class DozenComponent {
  public dozen: number[] = [];
  private dateCache: Date;
  private chosenDateCache: Date;

  @Input() set date(date: Date) {
    this.dozen = this.createDozen(date);
    this.dateCache = date;
    this.setupMatchers();
  }

  @Input() set chosenDate(chosenDate: Date) {
    this.chosenDateCache = chosenDate;
    this.setupMatchers();
  }

  @Output() pickYear = new EventEmitter<number>();

  public isNow = falser;
  public isChosen = falser;

  private createDozen(date: Date): number[] {
    const year = date.getFullYear();
    const start = year - ((year % 12) || 12);
    return Array.from({ length: 12}, (_, i) => start + i);
  }

  private createIsMatch(rootDate: Date, date: Date): (d: number) => boolean {
    if (!rootDate || !date) {
      return falser;
    }
    const year = rootDate.getFullYear();
    return (y: number) => y === year;
  }

  private setupMatchers() {
    this.isNow = this.createIsMatch(new Date(), this.dateCache);
    this.isChosen = this.createIsMatch(this.chosenDateCache, this.dateCache);
  }

}
