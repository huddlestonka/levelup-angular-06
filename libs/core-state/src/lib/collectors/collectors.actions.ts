import { Collector } from '@bba/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedCollector = createAction(
  '[Collectors] Reset Selected Collector'
);
export const resetCollectors = createAction('[Collectors] Reset Collectors');

// Select Collector
export const selectCollector = createAction(
  '[Collectors] Select Collector',
  props<{ selectedId: string }>()
);

// Load Collectors
export const loadCollectors = createAction('[Collectors] Load Collectors');

export const loadCollectorsSuccess = createAction(
  '[Collectors] Load Collectors Success',
  props<{ collectors: Collector[] }>()
);

export const loadCollectorsFailure = createAction(
  '[Collectors] Load Collectors Failure',
  props<{ error: any }>()
);

// Load Collector
export const loadCollector = createAction(
  '[Collectors] Load Collector',
  props<{ collectorId: string }>()
);

export const loadCollectorSuccess = createAction(
  '[Collectors] Load Collector Success',
  props<{ collector: Collector }>()
);

export const loadCollectorFailure = createAction(
  '[Collectors] Load Collector Failure',
  props<{ error: any }>()
);

// Create Collector
export const createCollector = createAction(
  '[Collectors] Create Collector',
  props<{ collector: Collector }>()
);

export const createCollectorSuccess = createAction(
  '[Collectors] Create Collector Success',
  props<{ collector: Collector }>()
);

export const createCollectorFailure = createAction(
  '[Collectors] Create Collector Failure',
  props<{ error: any }>()
);

// Update Collector
export const updateCollector = createAction(
  '[Collectors] Update Collector',
  props<{ collector: Collector }>()
);

export const updateCollectorSuccess = createAction(
  '[Collectors] Update Collector Success',
  props<{ collector: Collector }>()
);

export const updateCollectorFailure = createAction(
  '[Collectors] Update Collector Failure',
  props<{ error: any }>()
);

// Delete Collector
export const deleteCollector = createAction(
  '[Collectors] Delete Collector',
  props<{ collector: Collector }>()
);

export const deleteCollectorCancelled = createAction(
  '[Collectors] Delete Collector Cancelled'
);

export const deleteCollectorSuccess = createAction(
  '[Collectors] Delete Collector Success',
  props<{ collector: Collector }>()
);

export const deleteCollectorFailure = createAction(
  '[Collectors] Delete Collector Failure',
  props<{ error: any }>()
);
