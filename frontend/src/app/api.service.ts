import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  productSource = new BehaviorSubject<any>([]);
  currentProducts = this.productSource.asObservable();
  productsTemp: any = [];
  getProducts() {
    this.http
      .get(environment.apiUrl + '/api/v1/products')
      .subscribe((data: any) => {
        this.productSource.next(data);
        this.productsTemp = data; // Store a copy of the products for clearing search
      });
  }

  searchProducts(searchText: string) {
    this.http
      .get(environment.apiUrl + '/api/v1/products', {
        params: { keyword: searchText },
      })
      .subscribe((data: any) => {
        this.productSource.next(data);
      });
  }

  clearSearch(searchText: string) {
    if (searchText == '') {
      this.productSource.next(this.productsTemp);
    }
  }

  getSingleProduct(id: string): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/v1/product/' + id);
  }
}
