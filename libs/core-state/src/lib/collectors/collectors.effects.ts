import { Injectable } from '@angular/core';
import { Collector } from '@bba/api-interfaces';
import { CollectorsService } from '@bba/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import * as CollectorsActions from './collectors.actions';

@Injectable()
export class CollectorsEffects {
  @Effect() loadCollectors$ = this.actions$.pipe(
    ofType(CollectorsActions.loadCollectors),
    fetch({
      run: (action) =>
        this.collectorsService
          .all()
          .pipe(
            map((collectors: Collector[]) =>
              CollectorsActions.loadCollectorsSuccess({ collectors })
            )
          ),
      onError: (action, error) =>
        CollectorsActions.loadCollectorsFailure({ error }),
    })
  );

  @Effect() loadCollector$ = this.actions$.pipe(
    ofType(CollectorsActions.loadCollector),
    fetch({
      run: (action) =>
        this.collectorsService
          .find(action.collectorId)
          .pipe(
            map((collector: Collector) =>
              CollectorsActions.loadCollectorSuccess({ collector })
            )
          ),
      onError: (action, error) =>
        CollectorsActions.loadCollectorFailure({ error }),
    })
  );

  @Effect() createCollector$ = this.actions$.pipe(
    ofType(CollectorsActions.createCollector),
    pessimisticUpdate({
      run: (action) =>
        this.collectorsService
          .create(action.collector)
          .pipe(
            map((collector: Collector) =>
              CollectorsActions.createCollectorSuccess({ collector })
            )
          ),
      onError: (action, error) =>
        CollectorsActions.createCollectorFailure({ error }),
    })
  );

  @Effect() updateCollector$ = this.actions$.pipe(
    ofType(CollectorsActions.updateCollector),
    pessimisticUpdate({
      run: (action) =>
        this.collectorsService
          .update(action.collector)
          .pipe(
            map((collector: Collector) =>
              CollectorsActions.updateCollectorSuccess({ collector })
            )
          ),
      onError: (action, error) =>
        CollectorsActions.updateCollectorFailure({ error }),
    })
  );

  @Effect() deleteCollector$ = this.actions$.pipe(
    ofType(CollectorsActions.deleteCollector),
    pessimisticUpdate({
      run: (action) =>
        this.collectorsService
          .delete(action.collector)
          .pipe(
            map((collector: Collector) =>
              CollectorsActions.deleteCollectorSuccess({ collector })
            )
          ),
      onError: (action, error) =>
        CollectorsActions.deleteCollectorFailure({ error }),
    })
  );

  constructor(
    private actions$: Actions,
    private collectorsService: CollectorsService
  ) {}
}
