import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errorMessage: string;

  constructor(private auth: AuthService) { }

   onLoginSubmit(credentials) {
    this.auth.login(credentials)
      .subscribe(
		response => { console.log(response);},
        error => this.errorMessage = error.message
      );
  }

   onSignupSubmit(credentials) {
    this.auth.signup(credentials)
      .subscribe(
        response => {console.log},
        error => this.errorMessage = error.message
      );
  }


}
