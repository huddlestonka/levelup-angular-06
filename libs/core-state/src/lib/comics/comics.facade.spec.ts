import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ComicsEntity } from './comics.models';
import { ComicsEffects } from './comics.effects';
import { ComicsFacade } from './comics.facade';

import * as ComicsSelectors from './comics.selectors';
import * as ComicsActions from './comics.actions';
import {
  COMICS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './comics.reducer';

interface TestSchema {
  comics: State;
}

describe('ComicsFacade', () => {
  let facade: ComicsFacade;
  let store: Store<TestSchema>;
  const createComicsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ComicsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(COMICS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ComicsEffects]),
        ],
        providers: [ComicsFacade],
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
      facade = TestBed.inject(ComicsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allComics$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allComics$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadComicsSuccess` to manually update list
     */
    it('allComics$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allComics$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          ComicsActions.loadComicsSuccess({
            comics: [createComicsEntity('AAA'), createComicsEntity('BBB')],
          })
        );

        list = await readFirst(facade.allComics$);
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
