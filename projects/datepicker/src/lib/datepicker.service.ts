import { Injectable } from '@angular/core';
import { Mode } from './mode.enum';


@Injectable({
  providedIn: 'root'
})
export class DatepickerService {

  constructor() { }

  makeNextDateOfMode(date: Date, turn: number,  ofMode: Mode): Date {
    const newDate = new Date(date);
    switch (ofMode) {
      case Mode.Day:
        newDate.setMonth(date.getMonth() + turn);
        break;
      case Mode.Month:
        newDate.setFullYear(date.getFullYear() + turn);
        break;
      case Mode.Year:
        newDate.setFullYear(date.getFullYear() + (turn * 12));
        break;
      default:
        newDate.setDate(date.getDate() + turn);
        break;
    }
    return newDate;
  }

  makeTurnOfMode(date: Date, value: number,  ofMode: Mode) {
    switch (ofMode) {
      case Mode.Day:
        return value - date.getMonth();

      case Mode.Month:
        return value - date.getFullYear();

      default:
        return value - date.getDate();
    }
  }
}
