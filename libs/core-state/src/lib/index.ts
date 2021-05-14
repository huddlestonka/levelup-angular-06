import { Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

import * as fromCollectors from './collectors/collectors.reducer';
import * as fromComics from './comics/comics.reducer';

import * as CollectorsSelectors from './collectors/collectors.selectors';
import * as ComicsSelectors from './comics/comics.selectors';
import { Collector, Comic } from '@bba/api-interfaces';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

// ---------------------------------------
// Core State and Reducers
// ---------------------------------------

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  [fromCollectors.COLLECTORS_FEATURE_KEY]: fromCollectors.CollectorsState;
  [fromComics.COMICS_FEATURE_KEY]: fromComics.ComicsState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  [fromCollectors.COLLECTORS_FEATURE_KEY]: fromCollectors.collectorsReducer,
  [fromComics.COMICS_FEATURE_KEY]: fromComics.comicsReducer,
};

// -------------------------------------------------------------------
// Common Selectors
// -------------------------------------------------------------------
export const getCollectorComics = createSelector(
  CollectorsSelectors.getAllCollectors,
  ComicsSelectors.getAllComics,
  (collectors: Collector[], comics: Comic[]) => {
    return collectors.map((collector) => ({
      ...collector,
      comics: comics.filter((comics) => comics.collectorId === collector.id),
    }));
  }
);
