import { Comic } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ComicsActions from './comics.actions';

export const COMICS_FEATURE_KEY = 'comics';

export interface ComicsState extends EntityState<Comic> {
  selectedId?: string | number; // which Comics record has been selected
  loaded: boolean; // has the Comics list been loaded
  error?: string | null; // last known error (if any)
}

export interface ComicsPartialState {
  readonly [COMICS_FEATURE_KEY]: ComicsState;
}

export const comicsAdapter: EntityAdapter<Comic> = createEntityAdapter<Comic>();

export const initialComicsState: ComicsState = comicsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const onFailure = (state, { error }) => ({ ...state, error });

const _comicsReducer = createReducer(
  initialComicsState,
  on(ComicsActions.selectComic, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(ComicsActions.resetSelectedComic, (state) =>
    Object.assign({}, state, { selectedId: null })
  ),
  on(ComicsActions.resetComics, (state) => comicsAdapter.removeAll(state)),
  // Load comics
  on(ComicsActions.loadComics, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ComicsActions.loadComicsSuccess, (state, { comics }) =>
    comicsAdapter.setAll(comics, { ...state, loaded: true })
  ),
  on(ComicsActions.loadComicsFailure, onFailure),
  // Load comic
  on(ComicsActions.loadComic, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ComicsActions.loadComicSuccess, (state, { comic }) =>
    comicsAdapter.upsertOne(comic, { ...state, loaded: true })
  ),
  on(ComicsActions.loadComicFailure, onFailure),
  // Add comic
  on(ComicsActions.createComicSuccess, (state, { comic }) =>
    comicsAdapter.addOne(comic, state)
  ),
  on(ComicsActions.createComicFailure, onFailure),
  // Update comic
  on(ComicsActions.updateComicSuccess, (state, { comic }) =>
    comicsAdapter.updateOne({ id: comic.id, changes: comic }, state)
  ),
  on(ComicsActions.updateComicFailure, onFailure),
  // Delete comic
  on(ComicsActions.deleteComicSuccess, (state, { comic }) =>
    comicsAdapter.removeOne(comic.id, state)
  ),
  on(ComicsActions.deleteComicFailure, onFailure)
);

export function comicsReducer(state: ComicsState | undefined, action: Action) {
  return _comicsReducer(state, action);
}
