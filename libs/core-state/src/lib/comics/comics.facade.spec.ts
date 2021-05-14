import { TestBed } from '@angular/core/testing';
import { ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ComicsFacade } from './comics.facade';
import * as ComicsActions from './comics.actions';
import { initialComicsState } from './comics.reducer';

import { mockComic } from '@bba/testing';

describe('ComicsFacade', () => {
  let facade: ComicsFacade;
  let actionSubject;
  const mockActionsSubject = new ActionsSubject();
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ComicsFacade,
        provideMockStore({ initialState: initialComicsState }),
        { provide: ActionsSubject, useValue: mockActionsSubject },
      ],
    });

    facade = TestBed.inject(ComicsFacade);
    actionSubject = TestBed.inject(ActionsSubject);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should have mutations', (done) => {
    const action = ComicsActions.createComic({ comic: mockComic });
    actionSubject.next(action);

    facade.mutations$.subscribe((result) => {
      expect(result).toBe(action);
      done();
    });
  });

  describe('should dispatch', () => {
    it('select on select(comic.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.selectComic(mockComic.id);

      const action = ComicsActions.selectComic({ selectedId: mockComic.id });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadComics on loadComics()', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadComics();

      const action = ComicsActions.loadComics();

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadComic on loadComic(comic.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadComic(mockComic.id);

      const action = ComicsActions.loadComic({ comicId: mockComic.id });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('createComic on createComic(comic)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.createComic(mockComic);

      const action = ComicsActions.createComic({ comic: mockComic });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('updateComic on updateComic(comic)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.updateComic(mockComic);

      const action = ComicsActions.updateComic({ comic: mockComic });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('delete on delete(model)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.deleteComic(mockComic);

      const action = ComicsActions.deleteComic({ comic: mockComic });

      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
