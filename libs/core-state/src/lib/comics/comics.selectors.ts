import { Comic } from '@bba/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  COMICS_FEATURE_KEY,
  ComicsState,
  comicsAdapter,
} from './comics.reducer';

// Lookup the 'Comics' feature state managed by NgRx
export const getComicsState = createFeatureSelector<ComicsState>(
  COMICS_FEATURE_KEY
);

const { selectAll, selectEntities } = comicsAdapter.getSelectors();

export const getComicsLoaded = createSelector(
  getComicsState,
  (state: ComicsState) => state.loaded
);

export const getComicsError = createSelector(
  getComicsState,
  (state: ComicsState) => state.error
);

export const getAllComics = createSelector(
  getComicsState,
  (state: ComicsState) => selectAll(state)
);

export const getComicsEntities = createSelector(
  getComicsState,
  (state: ComicsState) => selectEntities(state)
);

export const getSelectedComicId = createSelector(
  getComicsState,
  (state: ComicsState) => state.selectedId
);

export const getSelectedComic = createSelector(
  getComicsEntities,
  getSelectedComicId,
  (entities, selectedId) => {
    const emptyComic: Comic = {
      id: '',
      title: '',
      description: '',
      genre: '',
      collectorId: '',
    };

    return selectedId ? entities[selectedId] : emptyComic;
  }
);
