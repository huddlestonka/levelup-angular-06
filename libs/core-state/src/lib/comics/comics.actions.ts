import { Comic } from '@bba/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedComic = createAction('[Comics] Reset Selected Comic');
export const resetComics = createAction('[Comics] Reset Comics');

// Select Comic
export const selectComic = createAction(
  '[Comics] Select Comic',
  props<{ selectedId: string }>()
);

// Load Comics
export const loadComics = createAction('[Comics] Load Comics');

export const loadComicsSuccess = createAction(
  '[Comics] Load Comics Success',
  props<{ comics: Comic[] }>()
);

export const loadComicsFailure = createAction(
  '[Comics] Load Comics Failure',
  props<{ error: any }>()
);

// Load Comic
export const loadComic = createAction(
  '[Comics] Load Comic',
  props<{ comicId: string }>()
);

export const loadComicSuccess = createAction(
  '[Comics] Load Comic Success',
  props<{ comic: Comic }>()
);

export const loadComicFailure = createAction(
  '[Comics] Load Comic Failure',
  props<{ error: any }>()
);

// Create Comic
export const createComic = createAction(
  '[Comics] Create Comic',
  props<{ comic: Comic }>()
);

export const createComicSuccess = createAction(
  '[Comics] Create Comic Success',
  props<{ comic: Comic }>()
);

export const createComicFailure = createAction(
  '[Comics] Create Comic Failure',
  props<{ error: any }>()
);

// Update Comic
export const updateComic = createAction(
  '[Comics] Update Comic',
  props<{ comic: Comic }>()
);

export const updateComicSuccess = createAction(
  '[Comics] Update Comic Success',
  props<{ comic: Comic }>()
);

export const updateComicFailure = createAction(
  '[Comics] Update Comic Failure',
  props<{ error: any }>()
);

// Delete Comic
export const deleteComic = createAction(
  '[Comics] Delete Comic',
  props<{ comic: Comic }>()
);

export const deleteComicCancelled = createAction(
  '[Comics] Delete Comic Cancelled'
);

export const deleteComicSuccess = createAction(
  '[Comics] Delete Comic Success',
  props<{ comic: Comic }>()
);

export const deleteComicFailure = createAction(
  '[Comics] Delete Comic Failure',
  props<{ error: any }>()
);
