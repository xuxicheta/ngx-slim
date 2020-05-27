import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dozenName'
})
export class DozenNamePipe implements PipeTransform {

  transform(year: number): string {
    const start = year - ((year % 12) || 12);
    const end = year + 12;
    return `${start} - ${end}`;
  }

}
