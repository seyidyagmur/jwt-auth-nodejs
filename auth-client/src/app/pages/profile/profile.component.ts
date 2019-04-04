import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { AuthService } from '../../auth/auth.service';

import { Profile } from '../../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	payload: Object;

	profile: Profile;
	constructor(private auth: AuthService) {
  }

  ngOnInit() {

	  this.profile = jwtDecode(this.auth.getToken());
	  this.payload = jwtDecode(this.auth.getToken());

  }

}
