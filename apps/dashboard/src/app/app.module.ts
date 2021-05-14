import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { CollectorsComponent } from './collectors/collectors.component';
import { CollectorDetailsComponent } from './collectors/collector-details/collector-details.component';
import { CollectorsListComponent } from './collectors/collectors-list/collectors-list.component';
import { ComicsComponent } from './comics/comics.component';
import { ComicDetailsComponent } from './comics/comic-details/comic-details.component';
import { ComicsListComponent } from './comics/comics-list/comics-list.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '@bba/material';
import { RoutingModule } from './routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreStateModule } from '@bba/core-state';

@NgModule({
  declarations: [
    AppComponent,
    CollectorsComponent,
    CollectorDetailsComponent,
    CollectorsListComponent,
    ComicsComponent,
    ComicDetailsComponent,
    ComicsListComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    FormsModule,
    CoreStateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
