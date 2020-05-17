import { Pipe, PipeTransform } from '@angular/core';
import { LocalizeService } from './localize.service';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {

  constructor(
    private localizeService: LocalizeService,
  ) {}

  transform(month: number): string {
    return this.localizeService.monthNames[month] ?? '';
  }
}
