import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

	constructor(private auth: AuthService, private router: Router) { }

	canActivate() {
		if (this.auth.isAuthenticated()) {
			this.router.navigate(['']);
		} else {
			return true;
		}
	}
}