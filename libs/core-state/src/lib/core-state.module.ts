import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCollectors from './collectors/collectors.reducer';
import { CollectorsEffects } from './collectors/collectors.effects';
import { CollectorsFacade } from './collectors/collectors.facade';
import * as fromComics from './comics/comics.reducer';
import { ComicsEffects } from './comics/comics.effects';
import { ComicsFacade } from './comics/comics.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCollectors.COLLECTORS_FEATURE_KEY,
      fromCollectors.reducer
    ),
    EffectsModule.forFeature([CollectorsEffects]),
    StoreModule.forFeature(fromComics.COMICS_FEATURE_KEY, fromComics.reducer),
    EffectsModule.forFeature([ComicsEffects]),
  ],
  providers: [CollectorsFacade, ComicsFacade],
})
export class CoreStateModule {}
