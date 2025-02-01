import { inject } from '@angular/core';
import { CanMatchFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthStateService } from '../data-access/services/auth-state.service';

export const authGuard: CanMatchFn = (
  route,
  segments
): MaybeAsync<GuardResult> => {
  const router = inject(Router);
  return inject(AuthStateService).currentUser$.pipe(
    map((user) => {
      if (user) {
        return true;
      }

      return router.createUrlTree(['/denegado']);
    })
  );
};
