import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import { CommonModule } from '@angular/common';
import { MonthComponent } from './month/month.component';
import { MonthContainerComponent } from './month-container/month-container.component';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateFunctionsService } from './services/date-functions.service';
import { MonthNamePipe } from './services/month-name.pipe';
import { ArrowComponent } from './arrow/arrow.component';



@NgModule({
  declarations: [DatepickerComponent, MonthComponent, MonthContainerComponent, MonthNamePipe, ArrowComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [DatepickerComponent, ArrowComponent],
  providers: [DateFunctionsService]
})
export class SlimDatepickerModule { }
