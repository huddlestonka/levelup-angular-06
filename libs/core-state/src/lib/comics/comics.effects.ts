import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ComicsFeature from './comics.reducer';
import * as ComicsActions from './comics.actions';

@Injectable()
export class ComicsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComicsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ComicsActions.loadComicsSuccess({ comics: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ComicsActions.loadComicsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
