// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { serviceAuthUser } from '../../service/serviceAuth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(serviceAuthUser);

  if (auth.isLoggedIn()) {
    return true;
  }else{
    return inject(Router).createUrlTree(['/login']);
  }

};
