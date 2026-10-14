import { Routes } from '@angular/router';
import { UserForm } from './user-form/user-form';
import { UserDetails } from './user-details/user-details';

export const routes: Routes = [
  { path: 'form', component: UserForm },
  { path: 'details', component: UserDetails },
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: '**', redirectTo: 'form' }
];