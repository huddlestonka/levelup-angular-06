import * as ComicsActions from './comics.actions';
import {
  ComicsState,
  initialComicsState,
  comicsReducer,
} from './comics.reducer';
import { mockComic, mockEmptyComic } from '@bba/testing';

describe('Comics Reducer', () => {
  let comics;

  beforeEach(() => {
    comics = [
      { ...mockComic, id: '0' },
      { ...mockComic, id: '1' },
      { ...mockComic, id: '2' },
    ];
  });

  describe('valid Comics actions', () => {
    it('loadComics should set loaded to false', () => {
      const action = ComicsActions.loadComics();
      const expectedState = {
        ...initialComicsState,
        error: null,
      };

      const result: ComicsState = comicsReducer(initialComicsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadComicsSuccess should set the list of known Comics', () => {
      const action = ComicsActions.loadComicsSuccess({ comics });
      const expectedState = {
        ...initialComicsState,
        loaded: true,
        entities: {
          0: comics[0],
          1: comics[1],
          2: comics[2],
        },
        ids: comics.map((comic) => comic.id),
      };

      const result: ComicsState = comicsReducer(initialComicsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadComicsFailure should set error to error', () => {
      const error = new Error();
      const action = ComicsActions.loadComicsFailure({ error });
      const expectedState = {
        ...initialComicsState,
        error,
      };

      const result: ComicsState = comicsReducer(initialComicsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadComic should set loaded to false', () => {
      const action = ComicsActions.loadComic({ comicId: mockComic.id });
      const expectedState = {
        ...initialComicsState,
        loaded: false,
        error: null,
      };

      const result: ComicsState = comicsReducer(initialComicsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadComicSuccess should set loaded to true', () => {
      const action = ComicsActions.loadComicSuccess({ comic: mockComic });
      const expectedState = {
        ...initialComicsState,
        loaded: true,
        entities: {
          0: mockComic,
        },
        ids: [mockComic.id],
      };

      const result: ComicsState = comicsReducer(initialComicsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadComicFailure should set error to error', () => {
      const error = new Error();
      const action = ComicsActions.loadComicFailure({ error });
      const expectedState = {
        ...initialComicsState,
        error,
      };

      const result: ComicsState = comicsReducer(initialComicsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('updateComicSuccess should modify comic', () => {
      const prepAction = ComicsActions.loadComicSuccess({
        comic: { ...mockEmptyComic, id: mockComic.id },
      });
      const prepState: ComicsState = comicsReducer(
        initialComicsState,
        prepAction
      );

      const expectedState = {
        ...initialComicsState,
        loaded: true,
        entities: {
          0: mockComic,
        },
        ids: [mockComic.id],
      };

      const action = ComicsActions.updateComicSuccess({ comic: mockComic });
      const result: ComicsState = comicsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('updateComicFailure should set error to error', () => {
      const error = new Error();
      const action = ComicsActions.updateComicFailure({ error });
      const expectedState = {
        ...initialComicsState,
        error,
      };

      const result: ComicsState = comicsReducer(initialComicsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('createComicSuccess should add comic', () => {
      const action = ComicsActions.createComicSuccess({ comic: mockComic });
      const expectedState = {
        ...initialComicsState,
        loaded: false,
        entities: {
          0: mockComic,
        },
        ids: [mockComic.id],
      };

      const result: ComicsState = comicsReducer(initialComicsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('createComicFailure should set error to error', () => {
      const error = new Error();
      const action = ComicsActions.createComicFailure({ error });
      const expectedState = {
        ...initialComicsState,
        error,
      };

      const result: ComicsState = comicsReducer(initialComicsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteComicSuccess should add comic', () => {
      const prepAction = ComicsActions.loadComicSuccess({
        comic: mockComic,
      });
      const prepState: ComicsState = comicsReducer(
        initialComicsState,
        prepAction
      );

      const expectedState = {
        ...initialComicsState,
        loaded: true,
      };

      const action = ComicsActions.deleteComicSuccess({ comic: mockComic });
      const result: ComicsState = comicsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteComicFailure should set error to error', () => {
      const error = new Error();
      const action = ComicsActions.deleteComicFailure({ error });
      const expectedState = {
        ...initialComicsState,
        error,
      };

      const result: ComicsState = comicsReducer(initialComicsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('selectComic should set selectedId', () => {
      const action = ComicsActions.selectComic({ selectedId: mockComic.id });
      const expectedState = {
        ...initialComicsState,
        selectedId: mockComic.id,
      };

      const result: ComicsState = comicsReducer(initialComicsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('resetSelectedComic should reset selectedId', () => {
      const prepAction = ComicsActions.selectComic({
        selectedId: mockComic.id,
      });
      const prepState = comicsReducer(initialComicsState, prepAction);

      const action = ComicsActions.resetSelectedComic();
      const expectedState = {
        ...initialComicsState,
        selectedId: null,
      };

      const result: ComicsState = comicsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('resetComics should reset comics', () => {
      const prepAction = ComicsActions.loadComicsSuccess({ comics });
      const prepState: ComicsState = comicsReducer(
        initialComicsState,
        prepAction
      );

      const expectedState = {
        ...initialComicsState,
        loaded: true,
      };

      const action = ComicsActions.resetComics();
      const result: ComicsState = comicsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result: ComicsState = comicsReducer(initialComicsState, action);

      expect(result).toBe(initialComicsState);
    });
  });
});
