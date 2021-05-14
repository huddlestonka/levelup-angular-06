import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ComicsActions from './comics.actions';
import { ComicsEntity } from './comics.models';

export const COMICS_FEATURE_KEY = 'comics';

export interface State extends EntityState<ComicsEntity> {
  selectedId?: string | number; // which Comics record has been selected
  loaded: boolean; // has the Comics list been loaded
  error?: string | null; // last known error (if any)
}

export interface ComicsPartialState {
  readonly [COMICS_FEATURE_KEY]: State;
}

export const comicsAdapter: EntityAdapter<ComicsEntity> = createEntityAdapter<ComicsEntity>();

export const initialState: State = comicsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const comicsReducer = createReducer(
  initialState,
  on(ComicsActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(ComicsActions.loadComicsSuccess, (state, { comics }) =>
    comicsAdapter.setAll(comics, { ...state, loaded: true })
  ),
  on(ComicsActions.loadComicsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return comicsReducer(state, action);
}
