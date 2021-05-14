import { Collector } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CollectorsActions from './collectors.actions';

export const COLLECTORS_FEATURE_KEY = 'collectors';

export interface CollectorsState extends EntityState<Collector> {
  selectedId?: string | number; // which Collectors record has been selected
  loaded: boolean; // has the Collectors list been loaded
  error?: string | null; // last known error (if any)
}

export interface CollectorsPartialState {
  readonly [COLLECTORS_FEATURE_KEY]: CollectorsState;
}

export const collectorsAdapter: EntityAdapter<Collector> = createEntityAdapter<Collector>();

export const initialCollectorsState: CollectorsState = collectorsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const onFailure = (state, { error }) => ({ ...state, error });

const _collectorsReducer = createReducer(
  initialCollectorsState,
  on(CollectorsActions.selectCollector, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(CollectorsActions.resetSelectedCollector, (state) =>
    Object.assign({}, state, { selectedId: null })
  ),
  on(CollectorsActions.resetCollectors, (state) =>
    collectorsAdapter.removeAll(state)
  ),
  // Load collectors
  on(CollectorsActions.loadCollectors, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CollectorsActions.loadCollectorsSuccess, (state, { collectors }) =>
    collectorsAdapter.setAll(collectors, { ...state, loaded: true })
  ),
  on(CollectorsActions.loadCollectorsFailure, onFailure),
  // Load collector
  on(CollectorsActions.loadCollector, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CollectorsActions.loadCollectorSuccess, (state, { collector }) =>
    collectorsAdapter.upsertOne(collector, { ...state, loaded: true })
  ),
  on(CollectorsActions.loadCollectorFailure, onFailure),
  // Add collector
  on(CollectorsActions.createCollectorSuccess, (state, { collector }) =>
    collectorsAdapter.addOne(collector, state)
  ),
  on(CollectorsActions.createCollectorFailure, onFailure),
  // Update collector
  on(CollectorsActions.updateCollectorSuccess, (state, { collector }) =>
    collectorsAdapter.updateOne({ id: collector.id, changes: collector }, state)
  ),
  on(CollectorsActions.updateCollectorFailure, onFailure),
  // Delete collector
  on(CollectorsActions.deleteCollectorSuccess, (state, { collector }) =>
    collectorsAdapter.removeOne(collector.id, state)
  ),
  on(CollectorsActions.deleteCollectorFailure, onFailure)
);

export function collectorsReducer(
  state: CollectorsState | undefined,
  action: Action
) {
  return _collectorsReducer(state, action);
}
