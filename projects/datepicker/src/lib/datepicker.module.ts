import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import { CommonModule } from '@angular/common';
import { MonthComponent } from './month/month.component';
import { MonthContainerComponent } from './month-container/month-container.component';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateFunctionsService } from './services/date-functions.service';



@NgModule({
  declarations: [DatepickerComponent, MonthComponent, MonthContainerComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [DatepickerComponent],
  providers: [DateFunctionsService]
})
export class SlimDatepickerModule { }
