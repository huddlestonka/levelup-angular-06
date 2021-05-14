import { CollectorsEntity } from './collectors.models';
import { State, collectorsAdapter, initialState } from './collectors.reducer';
import * as CollectorsSelectors from './collectors.selectors';

describe('Collectors Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCollectorsId = (it) => it['id'];
  const createCollectorsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CollectorsEntity);

  let state;

  beforeEach(() => {
    state = {
      collectors: collectorsAdapter.setAll(
        [
          createCollectorsEntity('PRODUCT-AAA'),
          createCollectorsEntity('PRODUCT-BBB'),
          createCollectorsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Collectors Selectors', () => {
    it('getAllCollectors() should return the list of Collectors', () => {
      const results = CollectorsSelectors.getAllCollectors(state);
      const selId = getCollectorsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CollectorsSelectors.getSelected(state);
      const selId = getCollectorsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getCollectorsLoaded() should return the current 'loaded' status", () => {
      const result = CollectorsSelectors.getCollectorsLoaded(state);

      expect(result).toBe(true);
    });

    it("getCollectorsError() should return the current 'error' state", () => {
      const result = CollectorsSelectors.getCollectorsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
