import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ComicsEffects } from './comics.effects';
import * as ComicsActions from './comics.actions';

describe('ComicsEffects', () => {
  let actions: Observable<any>;
  let effects: ComicsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ComicsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ComicsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ComicsActions.init() });

      const expected = hot('-a-|', {
        a: ComicsActions.loadComicsSuccess({ comics: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
