import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../auth/api.service';
import { map } from 'rxjs/operators';


@Injectable()
export class CommonService {

	constructor(private apiService: ApiService) { }

	public getBooks(): Observable<any> {
		return this.apiService.apiGetReq('books')
			.pipe(map(res => {
				return res;
			}));
	}

	public addBook(data): Observable<any> {
		return this.apiService.apiPostReq('books', data)
			.pipe(map(res => {
				return res;
			}));
	}

	public logout():Observable<any>{
		return this.apiService.apiGetReq('auth/logout')
			.pipe(map(res => {
				return res;
			}));
	}
}
