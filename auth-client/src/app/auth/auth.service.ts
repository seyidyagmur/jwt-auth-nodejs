import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwtDecode from 'jwt-decode';
import { API_URL } from './../app.constants';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
 

 login(credentials): Observable<any> {
 
 	let headers= new HttpHeaders().append('content-type', 'application/json');
 	headers=headers.append('Accept', 'application/json');
  return this.http.post<any>(`${API_URL}auth/login`, JSON.stringify(credentials), { headers: headers })

  }

  signup(credentials): Observable<any> {
  	credentials.roles=["admin"];
	let headers = new HttpHeaders().append('content-type', 'application/json');
	headers = headers.append('Accept', 'application/json');
    return this.http.post<any>(`${API_URL}auth/signup`,  JSON.stringify(credentials),{headers:headers})
   }

  finishAuthentication(token): void {
    localStorage.setItem('token', token)
    this.router.navigate(['profile']);
  }
}
