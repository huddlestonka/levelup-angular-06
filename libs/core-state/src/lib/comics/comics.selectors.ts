import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  COMICS_FEATURE_KEY,
  State,
  ComicsPartialState,
  comicsAdapter,
} from './comics.reducer';

// Lookup the 'Comics' feature state managed by NgRx
export const getComicsState = createFeatureSelector<ComicsPartialState, State>(
  COMICS_FEATURE_KEY
);

const { selectAll, selectEntities } = comicsAdapter.getSelectors();

export const getComicsLoaded = createSelector(
  getComicsState,
  (state: State) => state.loaded
);

export const getComicsError = createSelector(
  getComicsState,
  (state: State) => state.error
);

export const getAllComics = createSelector(getComicsState, (state: State) =>
  selectAll(state)
);

export const getComicsEntities = createSelector(
  getComicsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getComicsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getComicsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
