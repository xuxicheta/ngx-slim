import { Routes } from '@angular/router';
import { InlineComponentPageComponent } from './pages/inline-component-page/inline-component-page.component';
import { ControlPageComponent } from './pages/control/control-page.component';


export const appRoutes: Routes = [
  {
    path: 'inline-component',
    component: InlineComponentPageComponent,
  },
  {
    path: 'form-control',
    component: ControlPageComponent,
  },
  {
    path: '',
    redirectTo: 'inline-component',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
