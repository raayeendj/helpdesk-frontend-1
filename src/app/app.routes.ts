import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { TicketFormComponent } from './tickets/ticket-form/ticket-form';
import { LoginComponent } from './login/login';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // app.routes.ts
{
  path: 'home',
  loadComponent: () => import('./home/home').then(m => m.HomeComponent),
},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },

  // Tickets
  { path: 'tickets/new', component: TicketFormComponent },
  {
  path: 'contact',
  loadComponent: () => import('./contact/contact').then(m => m.ContactComponent),
},
  
  // ✅ Route SANS ID pour afficher le détail (version vide ou générique)
  {
    path: 'tickets/detail',
    loadComponent: () =>
      import('./ticket-detail/ticket-detail').then((m) => m.TicketDetailComponent),
  },

  // Agents - redirect to new management interface
  {
    path: 'agents',
    redirectTo: '/agent-management',
    pathMatch: 'full'
  },

  // Agent Management
  {
    path: 'agent-management',
    loadComponent: () =>
      import('./agent-management/agent-management').then((m) => m.AgentManagementComponent),
  },

  // Page 404
  { path: '**', redirectTo: '/dashboard' },
];