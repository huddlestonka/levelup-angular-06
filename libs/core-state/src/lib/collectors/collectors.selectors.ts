import { Collector } from '@bba/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  COLLECTORS_FEATURE_KEY,
  CollectorsState,
  collectorsAdapter,
} from './collectors.reducer';

// Lookup the 'Collectors' feature state managed by NgRx
export const getCollectorsState = createFeatureSelector<CollectorsState>(
  COLLECTORS_FEATURE_KEY
);

const { selectAll, selectEntities } = collectorsAdapter.getSelectors();

export const getCollectorsLoaded = createSelector(
  getCollectorsState,
  (state: CollectorsState) => state.loaded
);

export const getCollectorsError = createSelector(
  getCollectorsState,
  (state: CollectorsState) => state.error
);

export const getAllCollectors = createSelector(
  getCollectorsState,
  (state: CollectorsState) => selectAll(state)
);

export const getCollectorsEntities = createSelector(
  getCollectorsState,
  (state: CollectorsState) => selectEntities(state)
);

export const getSelectedCollectorId = createSelector(
  getCollectorsState,
  (state: CollectorsState) => state.selectedId
);

export const getSelectedCollector = createSelector(
  getCollectorsEntities,
  getSelectedCollectorId,
  (entities, selectedId) => {
    const emptyCollector: Collector = {
      id: '',
      firstName: '',
      lastName: '',
      favoriteGenre: '',
      timeCollecting: '',
    };

    return selectedId ? entities[selectedId] : emptyCollector;
  }
);
