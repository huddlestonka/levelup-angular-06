import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as CollectorsActions from './collectors.actions';
import * as CollectorsFeature from './collectors.reducer';
import * as CollectorsSelectors from './collectors.selectors';

@Injectable()
export class CollectorsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(CollectorsSelectors.getCollectorsLoaded));
  allCollectors$ = this.store.pipe(
    select(CollectorsSelectors.getAllCollectors)
  );
  selectedCollectors$ = this.store.pipe(
    select(CollectorsSelectors.getSelected)
  );

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(CollectorsActions.init());
  }
}
