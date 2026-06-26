import { Routes } from '@angular/router';
import { AppShell } from './shared/shell/app-shell';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login-page').then(m => m.LoginPage) },
  { path: 'registre', loadComponent: () => import('./features/auth/register-page').then(m => m.RegisterPage) },

  {
    path: '',
    component: AppShell,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'avui' },
      { path: 'avui', loadComponent: () => import('./features/today/today-page').then(m => m.TodayPage) },
      { path: 'calendari', redirectTo: 'stock' },
      { path: 'stock', loadComponent: () => import('./features/stock/stock-page').then(m => m.StockPage) },
      { path: 'perfil', loadComponent: () => import('./features/profile/profile-page').then(m => m.ProfilePage) },
      { path: 'aprendre', loadComponent: () => import('./features/learn/learn-page').then(m => m.LearnPage) },
    ],
  },
];