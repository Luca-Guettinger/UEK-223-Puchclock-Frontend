import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './_components/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TokenInterceptor} from './_interceptors/TokenInterceptor';
import {RegisterComponent} from './_components/register/register.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './_components/logout/logout.component';
import { NotFoundComponent } from './_components/not-found/not-found.component';
import { CategoryComponent } from './_components/category/category.component';
import { EntryComponent } from './_components/entry/entry.component';
import { HomeComponent } from './_components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    NotFoundComponent,
    CategoryComponent,
    HomeComponent,
    EntryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [
    MatDatepickerModule,
    MatSnackBar,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
