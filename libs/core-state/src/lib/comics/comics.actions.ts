import { createAction, props } from '@ngrx/store';
import { ComicsEntity } from './comics.models';

export const init = createAction('[Comics Page] Init');

export const loadComicsSuccess = createAction(
  '[Comics/API] Load Comics Success',
  props<{ comics: ComicsEntity[] }>()
);

export const loadComicsFailure = createAction(
  '[Comics/API] Load Comics Failure',
  props<{ error: any }>()
);
