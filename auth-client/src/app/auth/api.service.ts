import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL } from './../app.constants';

@Injectable()
export class ApiService {

	constructor(private http: HttpClient) {

	}

	apiPostReq(url, data): Observable<any> {
		return this.http.post(`${API_URL}${url}`, JSON.stringify(data), this.addHeaders())
	}
	apiGetReq(url): Observable<any>{
		 return this.http.get(`${API_URL}${url}`, this.addHeaders());
	}

	addHeaders() {
		var token = localStorage.getItem('token');
		let headers = new HttpHeaders().set("Authorization", 'Bearer ' + token);
		headers = headers.append('content-type', 'application/json');

		return {
			headers:headers
		};
	}
}