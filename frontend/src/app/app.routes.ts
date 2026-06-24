import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'stock' },
  { path: 'stock', loadComponent: () => import('./features/stock/stock-page').then(m => m.StockPage) },
  { path: 'avui', redirectTo: 'stock' },
  { path: 'calendari', redirectTo: 'stock' },
  { path: 'perfil', redirectTo: 'stock' },
  { path: 'aprendre', redirectTo: 'stock' },
];