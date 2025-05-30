import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/v1/products');
  }

  searchProducts(searchText: string): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/v1/products', {
      params: { keyword: searchText },
    });
  }
}
