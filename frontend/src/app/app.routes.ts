import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'stock' },
  { path: 'stock', loadComponent: () => import('./features/stock/stock-page').then(m => m.StockPage) },
  { path: 'avui', loadComponent: () => import('./features/today/today-page').then(m => m.TodayPage) },
  { path: 'calendari', redirectTo: 'stock' },
  { path: 'perfil', redirectTo: 'stock' },
  { path: 'aprendre', redirectTo: 'stock' },
];