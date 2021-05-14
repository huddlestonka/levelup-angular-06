import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';

import { Observable } from 'rxjs';

import { ComicsEffects } from './comics.effects';
import * as ComicsActions from './comics.actions';
import { ComicsService } from '@bba/core-data';

import { mockComicsService, mockComic } from '@bba/testing';
import { Comic } from '@bba/api-interfaces';

describe('ComicsEffects', () => {
  let actions: Observable<any>;
  let effects: ComicsEffects;
  let service: ComicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ComicsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        { provide: ComicsService, useValue: mockComicsService },
      ],
    });

    effects = TestBed.inject(ComicsEffects);
    service = TestBed.inject(ComicsService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadComics$', () => {
    it('should return loadComicsSuccess, on success', () => {
      const comics: Comic[] = [];
      const action = ComicsActions.loadComics();
      const outcome = ComicsActions.loadComicsSuccess({ comics });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: comics });
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadComics$).toBeObservable(expected);
    });

    it('should return loadComicsFailure, on failure', () => {
      const action = ComicsActions.loadComics();
      const error = new Error();
      const outcome = ComicsActions.loadComicsFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadComics$).toBeObservable(expected);
    });
  });

  describe('loadComic$', () => {
    it('should return success with comic', () => {
      const comic = { ...mockComic };
      const action = ComicsActions.loadComic({ comicId: comic.id });
      const outcome = ComicsActions.loadComicSuccess({ comic });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: comic });
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadComic$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const comic = { ...mockComic };
      const action = ComicsActions.loadComic({ comicId: comic.id });
      const error = new Error();
      const outcome = ComicsActions.loadComicFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadComic$).toBeObservable(expected);
    });
  });

  describe('createComic$', () => {
    it('should return success with comic', () => {
      const comic = { ...mockComic };
      const action = ComicsActions.createComic({ comic });
      const outcome = ComicsActions.createComicSuccess({ comic });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: comic });
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createComic$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const comic = { ...mockComic };
      const action = ComicsActions.createComic({ comic });
      const error = new Error();
      const outcome = ComicsActions.createComicFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createComic$).toBeObservable(expected);
    });
  });

  describe('updateComic$', () => {
    it('should return success with comic', () => {
      const comic = { ...mockComic };
      const action = ComicsActions.updateComic({ comic });
      const outcome = ComicsActions.updateComicSuccess({ comic });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: comic });
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateComic$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const comic = { ...mockComic };
      const action = ComicsActions.updateComic({ comic });
      const error = new Error();
      const outcome = ComicsActions.updateComicFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateComic$).toBeObservable(expected);
    });
  });

  describe('deleteComic$', () => {
    it('should return success with comic', () => {
      const comic = { ...mockComic };
      const action = ComicsActions.deleteComic({ comic });
      const outcome = ComicsActions.deleteComicSuccess({ comic });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: comic });
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteComic$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const comic = { ...mockComic };
      const action = ComicsActions.deleteComic({ comic });
      const error = new Error();
      const outcome = ComicsActions.deleteComicFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteComic$).toBeObservable(expected);
    });
  });
});
