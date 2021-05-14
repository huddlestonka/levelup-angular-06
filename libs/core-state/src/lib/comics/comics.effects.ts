import { Injectable } from '@angular/core';
import { Comic } from '@bba/api-interfaces';
import { ComicsService } from '@bba/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import * as ComicsActions from './comics.actions';

@Injectable()
export class ComicsEffects {
  @Effect() loadComics$ = this.actions$.pipe(
    ofType(ComicsActions.loadComics),
    fetch({
      run: (action) =>
        this.comicsService
          .all()
          .pipe(
            map((comics: Comic[]) =>
              ComicsActions.loadComicsSuccess({ comics })
            )
          ),
      onError: (action, error) => ComicsActions.loadComicsFailure({ error }),
    })
  );

  @Effect() loadComic$ = this.actions$.pipe(
    ofType(ComicsActions.loadComic),
    fetch({
      run: (action) =>
        this.comicsService
          .find(action.comicId)
          .pipe(
            map((comic: Comic) => ComicsActions.loadComicSuccess({ comic }))
          ),
      onError: (action, error) => ComicsActions.loadComicFailure({ error }),
    })
  );

  @Effect() createComic$ = this.actions$.pipe(
    ofType(ComicsActions.createComic),
    pessimisticUpdate({
      run: (action) =>
        this.comicsService
          .create(action.comic)
          .pipe(
            map((comic: Comic) => ComicsActions.createComicSuccess({ comic }))
          ),
      onError: (action, error) => ComicsActions.createComicFailure({ error }),
    })
  );

  @Effect() updateComic$ = this.actions$.pipe(
    ofType(ComicsActions.updateComic),
    pessimisticUpdate({
      run: (action) =>
        this.comicsService
          .update(action.comic)
          .pipe(
            map((comic: Comic) => ComicsActions.updateComicSuccess({ comic }))
          ),
      onError: (action, error) => ComicsActions.updateComicFailure({ error }),
    })
  );

  @Effect() deleteComic$ = this.actions$.pipe(
    ofType(ComicsActions.deleteComic),
    pessimisticUpdate({
      run: (action) =>
        this.comicsService
          .delete(action.comic)
          .pipe(
            map((comic: Comic) => ComicsActions.deleteComicSuccess({ comic }))
          ),
      onError: (action, error) => ComicsActions.deleteComicFailure({ error }),
    })
  );

  constructor(
    private actions$: Actions,
    private comicsService: ComicsService
  ) {}
}
