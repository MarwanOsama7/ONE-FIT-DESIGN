import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PurchaseRequest } from 'src/app/Models/PurchaseRequest';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderDataSubject = new BehaviorSubject<PurchaseRequest | null>(null);
  orderData$ = this.orderDataSubject.asObservable();

  setOrderData(orderData: PurchaseRequest) {
    this.orderDataSubject.next(orderData);
  }
}
