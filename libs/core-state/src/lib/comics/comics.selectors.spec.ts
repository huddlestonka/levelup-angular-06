import {
  ComicsState,
  comicsAdapter,
  initialComicsState,
} from './comics.reducer';
import * as ComicsSelectors from './comics.selectors';

import { Comic } from '@bba/api-interfaces';
import { mockComic } from '@bba/testing';

describe('Comics Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getComicsId = (it) => it['id'];
  const createComic = (id: string, name = '') =>
    ({ ...mockComic, id: id } as Comic);

  let state;

  beforeEach(() => {
    state = {
      comics: comicsAdapter.setAll(
        [
          createComic('PRODUCT-AAA'),
          createComic('PRODUCT-BBB'),
          createComic('PRODUCT-CCC'),
        ],
        {
          ...initialComicsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Comics Selectors', () => {
    it('getAllComics() should return the list of Comics', () => {
      const results = ComicsSelectors.getAllComics(state);
      const selId = getComicsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ComicsSelectors.getSelectedComic(state);
      const selId = getComicsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getComicsLoaded() should return the current 'loaded' status", () => {
      const result = ComicsSelectors.getComicsLoaded(state);

      expect(result).toBe(true);
    });

    it("getComicsError() should return the current 'error' state", () => {
      const result = ComicsSelectors.getComicsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
