import {
  CollectorsState,
  collectorsAdapter,
  initialCollectorsState,
} from './collectors.reducer';
import * as CollectorsSelectors from './collectors.selectors';

import { Collector } from '@bba/api-interfaces';
import { mockCollector } from '@bba/testing';

describe('Collectors Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCollectorsId = (it) => it['id'];
  const createCollector = (id: string, name = '') =>
    ({ ...mockCollector, id: id } as Collector);

  let state;

  beforeEach(() => {
    state = {
      collectors: collectorsAdapter.setAll(
        [
          createCollector('PRODUCT-AAA'),
          createCollector('PRODUCT-BBB'),
          createCollector('PRODUCT-CCC'),
        ],
        {
          ...initialCollectorsState,
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
      const result = CollectorsSelectors.getSelectedCollector(state);
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
