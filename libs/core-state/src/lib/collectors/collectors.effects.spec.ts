import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CollectorsEffects } from './collectors.effects';
import * as CollectorsActions from './collectors.actions';

describe('CollectorsEffects', () => {
  let actions: Observable<any>;
  let effects: CollectorsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CollectorsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CollectorsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CollectorsActions.init() });

      const expected = hot('-a-|', {
        a: CollectorsActions.loadCollectorsSuccess({ collectors: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
