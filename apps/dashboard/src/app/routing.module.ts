import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectorsComponent } from './collectors/collectors.component';
import { HomeComponent } from './home/home.component';
import { ComicsComponent } from './comics/comics.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'comics', component: ComicsComponent },
  { path: 'collectors', component: CollectorsComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
