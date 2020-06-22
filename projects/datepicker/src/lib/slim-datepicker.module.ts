import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import { CommonModule } from '@angular/common';
import { MonthComponent } from './month/month.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonthNamePipe } from './control/month-name/month-name.pipe';
import { ArrowComponent } from './arrow/arrow.component';
import { ControlComponent } from './control/control.component';
import { YearComponent } from './year/year.component';
import { LeaferComponent } from './leafer/leafer.component';
import { DozenComponent } from './dozen/dozen.component';
import { DozenNamePipe } from './control/dozen-name/dozen-name.pipe';
import { SlimDatepickerDirective } from './slim-datepicker.directive';



@NgModule({
  declarations: [
    DatepickerComponent,
    MonthComponent,
    MonthNamePipe,
    ArrowComponent,
    ControlComponent,
    YearComponent,
    LeaferComponent,
    DozenComponent,
    DozenNamePipe,
    SlimDatepickerDirective,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  entryComponents: [DatepickerComponent],
  exports: [DatepickerComponent, SlimDatepickerDirective],
})
export class SlimDatepickerModule { }
