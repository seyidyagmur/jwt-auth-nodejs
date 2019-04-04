import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwtDecode from 'jwt-decode';
import { API_URL } from './../app.constants';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { 
  }
 

 login(credentials): Observable<any> {
 
 	let headers= new HttpHeaders().append('content-type', 'application/json');
 	headers=headers.append('Accept', 'application/json');
  return this.http.post<any>(`${API_URL}auth/login`, JSON.stringify(credentials), { headers: headers })
    .pipe(map(res=>{
      if(res.token){
      this.finishAuthentication(res.token);
      }
    return res;
    }))

  }

  signup(credentials): Observable<any> {
  	credentials.roles=["admin"];
	let headers = new HttpHeaders().append('content-type', 'application/json');
	headers = headers.append('Accept', 'application/json');
    return this.http.post<any>(`${API_URL}auth/signup`,  JSON.stringify(credentials),{headers:headers})
    .pipe(map(res => {
      if (res.token) {
        this.finishAuthentication(res.token);
      }
      return res;
    }))
   }

  finishAuthentication(token): void {
    localStorage.setItem('token', token)
    this.router.navigate(['profile']);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !this.isTokenExpired(this.getToken());
  }

  isAdmin(): boolean {
    return jwtDecode(this.getToken()).role === 'admin';
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getUseRole(): string {
    return jwtDecode(this.getToken()).role;
  }

  private isTokenExpired(token: string , offsetSeconds?: number): boolean {
    if (token === null || token === '') {
      return true;
    }
    let date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (date === null) {
      return true;
    }

    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }
  public getTokenExpirationDate(token: string): Date | null {
    let decoded: any;
    decoded = jwtDecode(token);
    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  } 
}
