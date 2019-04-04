import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { LoginComponent } from './pages/login/login.component';
import { NewBookComponent } from './pages/new-book/new-book.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './auth/authguard.service';
import { RoleGuard } from './auth/roleguard.service';
import { LoginGuard } from './auth/loginguard.service';
const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
	{ path: 'book', component: BookComponent, canActivate: [AuthGuard] },
	{ path: 'book/new', component: NewBookComponent, canActivate: [RoleGuard] },
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
