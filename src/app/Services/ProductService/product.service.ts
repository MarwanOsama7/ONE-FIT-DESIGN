import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponseProduct, Product, ProductDetails, ProductReturn, ProductReturns } from 'src/app/Models/Product';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getNewArrivals(categoryName: string): Observable<Product[]> {
    const params = new HttpParams().set('categoryName', categoryName);
    return this.http.get<Product[]>(`${this.apiUrl}/product/newarrivals`, { params });
  }

  getProductsByCategoryName(categoryName: string, page: number, size: number): Observable<PaginatedResponseProduct> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('categoryName', categoryName);
      
    return this.http.get<PaginatedResponseProduct>(`${this.apiUrl}/productpaginate/findallbycategoryname`, { params });
  }

  getProductsByCategoryTypeNames(categoryTypeNames: string[], page: number, size: number): Observable<PaginatedResponseProduct> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const categoryTypeNamesQuery = categoryTypeNames.join(','); // Join categoryTypeNames into a comma-separated string
    params = params.set('categoryTypeName', categoryTypeNamesQuery);

    return this.http.get<PaginatedResponseProduct>(`${this.apiUrl}/productpaginate/findallbycategorytypename`, { params });
  }

  getProductByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/findbyname/${name}`);
  }
}
