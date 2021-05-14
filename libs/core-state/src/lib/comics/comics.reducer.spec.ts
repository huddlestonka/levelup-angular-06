import { ComicsEntity } from './comics.models';
import * as ComicsActions from './comics.actions';
import { State, initialState, reducer } from './comics.reducer';

describe('Comics Reducer', () => {
  const createComicsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ComicsEntity);

  beforeEach(() => {});

  describe('valid Comics actions', () => {
    it('loadComicsSuccess should return set the list of known Comics', () => {
      const comics = [
        createComicsEntity('PRODUCT-AAA'),
        createComicsEntity('PRODUCT-zzz'),
      ];
      const action = ComicsActions.loadComicsSuccess({ comics });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
