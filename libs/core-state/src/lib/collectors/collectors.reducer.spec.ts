import * as CollectorsActions from './collectors.actions';
import {
  CollectorsState,
  initialCollectorsState,
  collectorsReducer,
} from './collectors.reducer';
import { mockCollector, mockEmptyCollector } from '@bba/testing';

describe('Collectors Reducer', () => {
  let collectors;

  beforeEach(() => {
    collectors = [
      { ...mockCollector, id: '0' },
      { ...mockCollector, id: '1' },
      { ...mockCollector, id: '2' },
    ];
  });

  describe('valid Collectors actions', () => {
    it('loadCollectors should set loaded to false', () => {
      const action = CollectorsActions.loadCollectors();
      const expectedState = {
        ...initialCollectorsState,
        error: null,
      };

      const result: CollectorsState = collectorsReducer(
        initialCollectorsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadCollectorsSuccess should set the list of known Collectors', () => {
      const action = CollectorsActions.loadCollectorsSuccess({ collectors });
      const expectedState = {
        ...initialCollectorsState,
        loaded: true,
        entities: {
          0: collectors[0],
          1: collectors[1],
          2: collectors[2],
        },
        ids: collectors.map((collector) => collector.id),
      };

      const result: CollectorsState = collectorsReducer(
        initialCollectorsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadCollectorsFailure should set error to error', () => {
      const error = new Error();
      const action = CollectorsActions.loadCollectorsFailure({ error });
      const expectedState = {
        ...initialCollectorsState,
        error,
      };

      const result: CollectorsState = collectorsReducer(
        initialCollectorsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadCollector should set loaded to false', () => {
      const action = CollectorsActions.loadCollector({
        collectorId: mockCollector.id,
      });
      const expectedState = {
        ...initialCollectorsState,
        loaded: false,
        error: null,
      };

      const result: CollectorsState = collectorsReducer(
        initialCollectorsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadCollectorSuccess should set loaded to true', () => {
      const action = CollectorsActions.loadCollectorSuccess({
        collector: mockCollector,
      });
      const expectedState = {
        ...initialCollectorsState,
        loaded: true,
        entities: {
          0: mockCollector,
        },
        ids: [mockCollector.id],
      };

      const result: CollectorsState = collectorsReducer(
        initialCollectorsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadCollectorFailure should set error to error', () => {
      const error = new Error();
      const action = CollectorsActions.loadCollectorFailure({ error });
      const expectedState = {
        ...initialCollectorsState,
        error,
      };

      const result: CollectorsState = collectorsReducer(
        initialCollectorsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('updateCollectorSuccess should modify collector', () => {
      const prepAction = CollectorsActions.loadCollectorSuccess({
        collector: { ...mockEmptyCollector, id: mockCollector.id },
      });
      const prepState: CollectorsState = collectorsReducer(
        initialCollectorsState,
        prepAction
      );

      const expectedState = {
        ...initialCollectorsState,
        loaded: true,
        entities: {
          0: mockCollector,
        },
        ids: [mockCollector.id],
      };

      const action = CollectorsActions.updateCollectorSuccess({
        collector: mockCollector,
      });
      const result: CollectorsState = collectorsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('updateCollectorFailure should set error to error', () => {
      const error = new Error();
      const action = CollectorsActions.updateCollectorFailure({ error });
      const expectedState = {
        ...initialCollectorsState,
        error,
      };

      const result: CollectorsState = collectorsReducer(
        initialCollectorsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('createCollectorSuccess should add collector', () => {
      const action = CollectorsActions.createCollectorSuccess({
        collector: mockCollector,
      });
      const expectedState = {
        ...initialCollectorsState,
        loaded: false,
        entities: {
          0: mockCollector,
        },
        ids: [mockCollector.id],
      };

      const result: CollectorsState = collectorsReducer(
        initialCollectorsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('createCollectorFailure should set error to error', () => {
      const error = new Error();
      const action = CollectorsActions.createCollectorFailure({ error });
      const expectedState = {
        ...initialCollectorsState,
        error,
      };

      const result: CollectorsState = collectorsReducer(
        initialCollectorsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteCollectorSuccess should add collector', () => {
      const prepAction = CollectorsActions.loadCollectorSuccess({
        collector: mockCollector,
      });
      const prepState: CollectorsState = collectorsReducer(
        initialCollectorsState,
        prepAction
      );

      const expectedState = {
        ...initialCollectorsState,
        loaded: true,
      };

      const action = CollectorsActions.deleteCollectorSuccess({
        collector: mockCollector,
      });
      const result: CollectorsState = collectorsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteCollectorFailure should set error to error', () => {
      const error = new Error();
      const action = CollectorsActions.deleteCollectorFailure({ error });
      const expectedState = {
        ...initialCollectorsState,
        error,
      };

      const result: CollectorsState = collectorsReducer(
        initialCollectorsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('selectCollector should set selectedId', () => {
      const action = CollectorsActions.selectCollector({
        selectedId: mockCollector.id,
      });
      const expectedState = {
        ...initialCollectorsState,
        selectedId: mockCollector.id,
      };

      const result: CollectorsState = collectorsReducer(
        initialCollectorsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('resetSelectedCollector should reset selectedId', () => {
      const prepAction = CollectorsActions.selectCollector({
        selectedId: mockCollector.id,
      });
      const prepState = collectorsReducer(initialCollectorsState, prepAction);

      const action = CollectorsActions.resetSelectedCollector();
      const expectedState = {
        ...initialCollectorsState,
        selectedId: null,
      };

      const result: CollectorsState = collectorsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('resetCollectors should reset collectors', () => {
      const prepAction = CollectorsActions.loadCollectorsSuccess({
        collectors,
      });
      const prepState: CollectorsState = collectorsReducer(
        initialCollectorsState,
        prepAction
      );

      const expectedState = {
        ...initialCollectorsState,
        loaded: true,
      };

      const action = CollectorsActions.resetCollectors();
      const result: CollectorsState = collectorsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result: CollectorsState = collectorsReducer(
        initialCollectorsState,
        action
      );

      expect(result).toBe(initialCollectorsState);
    });
  });
});
