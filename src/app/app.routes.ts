import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { TicketFormComponent } from './tickets/ticket-form/ticket-form';
import { LoginComponent } from './login/login';
import { adminGuard, agentGuard, authGuard } from './auth/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // app.routes.ts
{
  path: 'home',
  loadComponent: () => import('./home/home').then(m => m.HomeComponent),
},
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [adminGuard]
  },
  { 
    path: 'agent-dashboard', 
    loadComponent: () => import('./dashboard/agent-dashboard').then(m => m.AgentDashboardComponent),
    canActivate: [agentGuard]
  },

  // Tickets
  { path: 'tickets/new', component: TicketFormComponent, canActivate: [authGuard] },
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

  // Reports
  {
    path: 'reports',
    loadComponent: () => import('./reports/reports.component').then(m => m.ReportsComponent),
    children: [
      {
        path: 'last-7-days',
        loadComponent: () => import('./reports/last-7-days.component').then(m => m.Last7DaysComponent),
      },
      {
        path: 'ticket-satisfaction',
        loadComponent: () => import('./reports/ticket-satisfaction.component').then(m => m.TicketSatisfactionComponent),
      },
      {
        path: 'generate-report',
        loadComponent: () => import('./reports/generate-report.component').then(m => m.GenerateReportComponent),
      },
      {
        path: '',
        redirectTo: 'last-7-days',
        pathMatch: 'full'
      }
    ]
  },

  // Profile
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
  },

  // Settings
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent),
    children: [
      {
        path: 'email-notifications',
        loadComponent: () => import('./settings/email-notifications.component').then(m => m.EmailNotificationsComponent),
      },
      {
        path: 'mailboxes',
        loadComponent: () => import('./settings/mailboxes.component').then(m => m.MailboxesComponent),
        children: [
          {
            path: 'email-forwarding',
            loadComponent: () => import('./settings/email-forwarding.component').then(m => m.EmailForwardingComponent),
          },
          {
            path: 'company-name',
            loadComponent: () => import('./settings/company-name.component').then(m => m.CompanyNameComponent),
          },
          {
            path: 'default-mailbox',
            loadComponent: () => import('./settings/default-mailbox.component').then(m => m.DefaultMailboxComponent),
          },
          {
            path: '',
            redirectTo: 'email-forwarding',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'email-notifications',
        pathMatch: 'full'
      }
    ]
  },

  // Page 404
  { path: '**', redirectTo: '/dashboard' },
];