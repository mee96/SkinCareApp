import { Routes } from '@angular/router';
import { AppShell } from './shared/app-shell';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login-page').then(m => m.LoginPage) },

  {
    path: '',
    component: AppShell,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'avui' },
      { path: 'avui', loadComponent: () => import('./features/today/today-page').then(m => m.TodayPage) },
      { path: 'calendari', redirectTo: 'stock' },
      { path: 'stock', loadComponent: () => import('./features/stock/stock-page').then(m => m.StockPage) },
      { path: 'perfil', loadComponent: () => import('./features/profile/profile-page').then(m => m.ProfilePage) },
      { path: 'aprendre', redirectTo: 'stock' },
    ],
  },
];