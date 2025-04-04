import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseRequest, RequestOrder } from 'src/app/Models/PurchaseRequest';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private globalApi = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  createPurchaseRequest(purchaseRequest: PurchaseRequest): Observable<RequestOrder> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RequestOrder>(`${this.globalApi}/user/purchase-requests`, purchaseRequest, { headers });
  }

  // getRequestOrdersByUser(): Observable<RequestOrders[]> {
  //   const email = this.auth.getEmail(); // Retrieve email from session storage
  //   let params = new HttpParams().set('email', email || '');
  //   return this.http.get<RequestOrders[]>(`${this.globalApi}/user/request-orders/by-created-by`, { params });
  // }
}
