import { createAction, props } from '@ngrx/store';
import { CollectorsEntity } from './collectors.models';

export const init = createAction('[Collectors Page] Init');

export const loadCollectorsSuccess = createAction(
  '[Collectors/API] Load Collectors Success',
  props<{ collectors: CollectorsEntity[] }>()
);

export const loadCollectorsFailure = createAction(
  '[Collectors/API] Load Collectors Failure',
  props<{ error: any }>()
);
