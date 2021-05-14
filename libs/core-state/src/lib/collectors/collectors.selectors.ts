import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  COLLECTORS_FEATURE_KEY,
  State,
  CollectorsPartialState,
  collectorsAdapter,
} from './collectors.reducer';

// Lookup the 'Collectors' feature state managed by NgRx
export const getCollectorsState = createFeatureSelector<
  CollectorsPartialState,
  State
>(COLLECTORS_FEATURE_KEY);

const { selectAll, selectEntities } = collectorsAdapter.getSelectors();

export const getCollectorsLoaded = createSelector(
  getCollectorsState,
  (state: State) => state.loaded
);

export const getCollectorsError = createSelector(
  getCollectorsState,
  (state: State) => state.error
);

export const getAllCollectors = createSelector(
  getCollectorsState,
  (state: State) => selectAll(state)
);

export const getCollectorsEntities = createSelector(
  getCollectorsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCollectorsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCollectorsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
