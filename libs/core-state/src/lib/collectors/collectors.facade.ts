import { Injectable } from '@angular/core';
import { Collector } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { getCollectorComics } from '..';
import * as CollectorsActions from './collectors.actions';
import * as fromCollectors from './collectors.reducer';
import * as CollectorsSelectors from './collectors.selectors';

@Injectable({
  providedIn: 'root',
})
export class CollectorsFacade {
  loaded$ = this.store.pipe(select(CollectorsSelectors.getCollectorsLoaded));
  allCollectors$ = this.store.pipe(
    select(CollectorsSelectors.getAllCollectors)
  );
  selectedCollector$ = this.store.pipe(
    select(CollectorsSelectors.getSelectedCollector)
  );
  collectorComics$ = this.store.pipe(select(getCollectorComics));

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === CollectorsActions.createCollector({} as any).type ||
        action.type === CollectorsActions.updateCollector({} as any).type ||
        action.type === CollectorsActions.deleteCollector({} as any).type
    )
  );

  constructor(
    private store: Store<fromCollectors.CollectorsPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectCollector(selectedId: string) {
    this.dispatch(CollectorsActions.selectCollector({ selectedId }));
  }

  loadCollectors() {
    this.dispatch(CollectorsActions.loadCollectors());
  }

  loadCollector(collectorId: string) {
    this.dispatch(CollectorsActions.loadCollector({ collectorId }));
  }

  createCollector(collector: Collector) {
    this.dispatch(
      CollectorsActions.createCollector({
        collector: Object.assign({}, collector, { id: uuidv4() }),
      })
    );
  }

  updateCollector(collector: Collector) {
    this.dispatch(CollectorsActions.updateCollector({ collector }));
  }

  deleteCollector(collector: Collector) {
    this.dispatch(CollectorsActions.deleteCollector({ collector }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
