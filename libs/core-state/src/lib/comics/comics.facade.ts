import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as ComicsActions from './comics.actions';
import * as ComicsFeature from './comics.reducer';
import * as ComicsSelectors from './comics.selectors';

@Injectable()
export class ComicsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ComicsSelectors.getComicsLoaded));
  allComics$ = this.store.pipe(select(ComicsSelectors.getAllComics));
  selectedComics$ = this.store.pipe(select(ComicsSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ComicsActions.init());
  }
}
