import { TestBed } from '@angular/core/testing';
import { ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CollectorsFacade } from './collectors.facade';
import * as CollectorsActions from './collectors.actions';
import { initialCollectorsState } from './collectors.reducer';

import { mockCollector } from '@bba/testing';

describe('CollectorsFacade', () => {
  let facade: CollectorsFacade;
  let actionSubject;
  const mockActionsSubject = new ActionsSubject();
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectorsFacade,
        provideMockStore({ initialState: initialCollectorsState }),
        { provide: ActionsSubject, useValue: mockActionsSubject },
      ],
    });

    facade = TestBed.inject(CollectorsFacade);
    actionSubject = TestBed.inject(ActionsSubject);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should have mutations', (done) => {
    const action = CollectorsActions.createCollector({
      collector: mockCollector,
    });
    actionSubject.next(action);

    facade.mutations$.subscribe((result) => {
      expect(result).toBe(action);
      done();
    });
  });

  describe('should dispatch', () => {
    it('select on select(collector.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.selectCollector(mockCollector.id);

      const action = CollectorsActions.selectCollector({
        selectedId: mockCollector.id,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadCollectors on loadCollectors()', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadCollectors();

      const action = CollectorsActions.loadCollectors();

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadCollector on loadCollector(collector.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadCollector(mockCollector.id);

      const action = CollectorsActions.loadCollector({
        collectorId: mockCollector.id,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('createCollector on createCollector(collector)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.createCollector(mockCollector);

      const action = CollectorsActions.createCollector({
        collector: mockCollector,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('updateCollector on updateCollector(collector)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.updateCollector(mockCollector);

      const action = CollectorsActions.updateCollector({
        collector: mockCollector,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('delete on delete(model)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.deleteCollector(mockCollector);

      const action = CollectorsActions.deleteCollector({
        collector: mockCollector,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
