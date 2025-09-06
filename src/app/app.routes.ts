import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { TicketFormComponent } from './tickets/ticket-form/ticket-form';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tickets/new', component: TicketFormComponent },
  {
    path: 'tickets/detail/:id',
    loadComponent: () =>
      import('./ticket-detail/ticket-detail').then(
        (m) => m.TicketDetailComponent
      ),
  },
  {
    path: 'agents',
    loadComponent: () =>
      import('./agents/agents').then((m) => m.AgentsComponent),
  },
];
