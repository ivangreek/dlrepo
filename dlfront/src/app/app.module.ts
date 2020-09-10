import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from './navbar/navbar.component';
import { LandmarkListComponent } from'./landmark-list/landmark-list.component';
import { MatCardModule } from '@angular/material/card';
import { LandmarkDetailsComponent } from './landmark-details/landmark-details.component';
import { LandmarkFormComponent } from './landmark-form/landmark-form.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MapComponent } from './map/map.component';
import { NgxMatFileInputModule  } from '@angular-material-components/file-input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { FullImageDialogComponent } from './full-image-dialog/full-image-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandmarkListComponent,
    LandmarkDetailsComponent,
    LandmarkFormComponent,
    LoginComponent,
    MapComponent,
    FullImageDialogComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatFileInputModule,
    FlexLayoutModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
