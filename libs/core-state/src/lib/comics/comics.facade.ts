import { Injectable } from '@angular/core';
import { Comic } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import * as ComicsActions from './comics.actions';
import * as fromComics from './comics.reducer';
import * as ComicsSelectors from './comics.selectors';

@Injectable({
  providedIn: 'root',
})
export class ComicsFacade {
  loaded$ = this.store.pipe(select(ComicsSelectors.getComicsLoaded));
  allComics$ = this.store.pipe(select(ComicsSelectors.getAllComics));
  selectedComic$ = this.store.pipe(select(ComicsSelectors.getSelectedComic));

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === ComicsActions.createComic({} as any).type ||
        action.type === ComicsActions.updateComic({} as any).type ||
        action.type === ComicsActions.deleteComic({} as any).type
    )
  );

  constructor(
    private store: Store<fromComics.ComicsPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectComic(selectedId: string) {
    this.dispatch(ComicsActions.selectComic({ selectedId }));
  }

  loadComics() {
    this.dispatch(ComicsActions.loadComics());
  }

  loadComic(comicId: string) {
    this.dispatch(ComicsActions.loadComic({ comicId }));
  }

  createComic(comic: Comic) {
    this.dispatch(
      ComicsActions.createComic({
        comic: Object.assign({}, comic, { id: uuidv4() }),
      })
    );
  }

  updateComic(comic: Comic) {
    this.dispatch(ComicsActions.updateComic({ comic }));
  }

  deleteComic(comic: Comic) {
    this.dispatch(ComicsActions.deleteComic({ comic }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
