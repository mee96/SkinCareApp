import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../stores/auth-store';

export const authGuard: CanActivateFn = async () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  
  while (authStore.loading()) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  if (authStore.isAuthenticated()) {
    return true;
  }

  router.navigateByUrl('/login');
  return false;
};