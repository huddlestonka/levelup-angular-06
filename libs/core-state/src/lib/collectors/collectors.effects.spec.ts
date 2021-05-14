import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';

import { Observable } from 'rxjs';

import { CollectorsEffects } from './collectors.effects';
import * as CollectorsActions from './collectors.actions';
import { CollectorsService } from '@bba/core-data';

import { mockCollectorsService, mockCollector } from '@bba/testing';
import { Collector } from '@bba/api-interfaces';

describe('CollectorsEffects', () => {
  let actions: Observable<any>;
  let effects: CollectorsEffects;
  let service: CollectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CollectorsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        { provide: CollectorsService, useValue: mockCollectorsService },
      ],
    });

    effects = TestBed.inject(CollectorsEffects);
    service = TestBed.inject(CollectorsService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadCollectors$', () => {
    it('should return loadCollectorsSuccess, on success', () => {
      const collectors: Collector[] = [];
      const action = CollectorsActions.loadCollectors();
      const outcome = CollectorsActions.loadCollectorsSuccess({ collectors });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: collectors });
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadCollectors$).toBeObservable(expected);
    });

    it('should return loadCollectorsFailure, on failure', () => {
      const action = CollectorsActions.loadCollectors();
      const error = new Error();
      const outcome = CollectorsActions.loadCollectorsFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadCollectors$).toBeObservable(expected);
    });
  });

  describe('loadCollector$', () => {
    it('should return success with collector', () => {
      const collector = { ...mockCollector };
      const action = CollectorsActions.loadCollector({
        collectorId: collector.id,
      });
      const outcome = CollectorsActions.loadCollectorSuccess({ collector });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: collector });
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadCollector$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const collector = { ...mockCollector };
      const action = CollectorsActions.loadCollector({
        collectorId: collector.id,
      });
      const error = new Error();
      const outcome = CollectorsActions.loadCollectorFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadCollector$).toBeObservable(expected);
    });
  });

  describe('createCollector$', () => {
    it('should return success with collector', () => {
      const collector = { ...mockCollector };
      const action = CollectorsActions.createCollector({ collector });
      const outcome = CollectorsActions.createCollectorSuccess({ collector });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: collector });
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createCollector$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const collector = { ...mockCollector };
      const action = CollectorsActions.createCollector({ collector });
      const error = new Error();
      const outcome = CollectorsActions.createCollectorFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createCollector$).toBeObservable(expected);
    });
  });

  describe('updateCollector$', () => {
    it('should return success with collector', () => {
      const collector = { ...mockCollector };
      const action = CollectorsActions.updateCollector({ collector });
      const outcome = CollectorsActions.updateCollectorSuccess({ collector });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: collector });
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateCollector$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const collector = { ...mockCollector };
      const action = CollectorsActions.updateCollector({ collector });
      const error = new Error();
      const outcome = CollectorsActions.updateCollectorFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateCollector$).toBeObservable(expected);
    });
  });

  describe('deleteCollector$', () => {
    it('should return success with collector', () => {
      const collector = { ...mockCollector };
      const action = CollectorsActions.deleteCollector({ collector });
      const outcome = CollectorsActions.deleteCollectorSuccess({ collector });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: collector });
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteCollector$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const collector = { ...mockCollector };
      const action = CollectorsActions.deleteCollector({ collector });
      const error = new Error();
      const outcome = CollectorsActions.deleteCollectorFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteCollector$).toBeObservable(expected);
    });
  });
});
