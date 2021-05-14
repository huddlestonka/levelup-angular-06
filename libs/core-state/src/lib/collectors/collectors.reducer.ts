import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CollectorsActions from './collectors.actions';
import { CollectorsEntity } from './collectors.models';

export const COLLECTORS_FEATURE_KEY = 'collectors';

export interface State extends EntityState<CollectorsEntity> {
  selectedId?: string | number; // which Collectors record has been selected
  loaded: boolean; // has the Collectors list been loaded
  error?: string | null; // last known error (if any)
}

export interface CollectorsPartialState {
  readonly [COLLECTORS_FEATURE_KEY]: State;
}

export const collectorsAdapter: EntityAdapter<CollectorsEntity> = createEntityAdapter<CollectorsEntity>();

export const initialState: State = collectorsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const collectorsReducer = createReducer(
  initialState,
  on(CollectorsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CollectorsActions.loadCollectorsSuccess, (state, { collectors }) =>
    collectorsAdapter.setAll(collectors, { ...state, loaded: true })
  ),
  on(CollectorsActions.loadCollectorsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return collectorsReducer(state, action);
}
