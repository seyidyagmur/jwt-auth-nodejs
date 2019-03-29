import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabsModule, AlertModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { LoginComponent } from './pages/login/login.component';
import { NewBookComponent } from './pages/new-book/new-book.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
  AppComponent,
	HomeComponent,
  BookComponent,
  LoginComponent,
  NewBookComponent,
  ProfileComponent
  ],
  imports: [
	  CommonModule,
	  FormsModule,
    BrowserModule,
    AppRoutingModule,
	TabsModule.forRoot(),
	AlertModule.forRoot()
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
