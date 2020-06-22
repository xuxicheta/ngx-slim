import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { SlimDatepickerModule } from 'ngx-slim-datepicker';

import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { InlineComponentPageComponent } from './pages/inline-component-page/inline-component-page.component';
import { ControlPageComponent } from './pages/control/control-page.component';
import { ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InlineComponentPageComponent,
    ControlPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    SlimDatepickerModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
