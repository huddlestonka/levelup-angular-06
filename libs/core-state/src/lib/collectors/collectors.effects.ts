import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as CollectorsFeature from './collectors.reducer';
import * as CollectorsActions from './collectors.actions';

@Injectable()
export class CollectorsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectorsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CollectorsActions.loadCollectorsSuccess({ collectors: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return CollectorsActions.loadCollectorsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
