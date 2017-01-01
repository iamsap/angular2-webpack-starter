import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { RegisterComponent } from './register';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**',    component: NoContentComponent },
];
