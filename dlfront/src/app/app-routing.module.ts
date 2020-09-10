import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandmarkListComponent } from './landmark-list/landmark-list.component';
import { LandmarkDetailsComponent } from './landmark-details/landmark-details.component';
import { LoginComponent } from './login/login.component';
import { LandmarkFormComponent } from './landmark-form/landmark-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: LandmarkListComponent },
  { path: 'landmark/:landmarkId', component: LandmarkDetailsComponent},
  { path: 'landmark/:landmarkId/edit', component: LandmarkFormComponent},
  { path: 'landmark-new', component: LandmarkFormComponent},
  { path: 'login', component: LoginComponent},
  { path: '404', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
