import { CollectorsEntity } from './collectors.models';
import * as CollectorsActions from './collectors.actions';
import { State, initialState, reducer } from './collectors.reducer';

describe('Collectors Reducer', () => {
  const createCollectorsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CollectorsEntity);

  beforeEach(() => {});

  describe('valid Collectors actions', () => {
    it('loadCollectorsSuccess should return set the list of known Collectors', () => {
      const collectors = [
        createCollectorsEntity('PRODUCT-AAA'),
        createCollectorsEntity('PRODUCT-zzz'),
      ];
      const action = CollectorsActions.loadCollectorsSuccess({ collectors });

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
