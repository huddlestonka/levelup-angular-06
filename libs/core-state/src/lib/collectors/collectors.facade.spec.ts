import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { CollectorsEntity } from './collectors.models';
import { CollectorsEffects } from './collectors.effects';
import { CollectorsFacade } from './collectors.facade';

import * as CollectorsSelectors from './collectors.selectors';
import * as CollectorsActions from './collectors.actions';
import {
  COLLECTORS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './collectors.reducer';

interface TestSchema {
  collectors: State;
}

describe('CollectorsFacade', () => {
  let facade: CollectorsFacade;
  let store: Store<TestSchema>;
  const createCollectorsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CollectorsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(COLLECTORS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CollectorsEffects]),
        ],
        providers: [CollectorsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(CollectorsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allCollectors$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allCollectors$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadCollectorsSuccess` to manually update list
     */
    it('allCollectors$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allCollectors$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          CollectorsActions.loadCollectorsSuccess({
            collectors: [
              createCollectorsEntity('AAA'),
              createCollectorsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allCollectors$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
