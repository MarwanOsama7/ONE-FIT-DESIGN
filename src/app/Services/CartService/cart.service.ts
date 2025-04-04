import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from 'src/app/Models/CartOrder';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private orders: Card[] = [];
  private totalorders: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private totalprice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private ordersSubject: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  private storageKey = 'cartOrders';

  constructor() {
    this.loadCartFromStorage();
  }
  // In your CartService file

  updateOrder(updatedOrder: Card): void {
    const existingOrder = this.orders.find(order =>
      order.id === updatedOrder.id &&
      order.color === updatedOrder.color &&
      order.size === updatedOrder.size
    );

    if (existingOrder) {
      existingOrder.quantity = updatedOrder.quantity;
    } else {
      // If the order does not exist in the cart, you might want to add it or handle it differently
      this.orders.push(updatedOrder);
    }

    this.saveCartToStorage();
    this.calculate();
  }

  addToCard(order: Card) {
    let existorder: Card | undefined;

    // Check if there is an order with the same id and matching properties
    if (this.orders.length > 0) {
      existorder = this.orders.find(temp =>
        temp.id === order.id &&
        temp.color === order.color &&
        temp.size === order.size
      );
    }

    if (existorder) {
      // Increment the quantity by the provided order quantity
      existorder.quantity += order.quantity;
    } else {
      // Set the provided order quantity
      order.quantity = order.quantity > 0 ? order.quantity : 1; // Default to 1 if quantity is not set
      this.orders.push(order);
    }

    this.saveCartToStorage();
    this.calculate();
  }


  removeorder(order: Card) {
    let existorder: Card | undefined;

    // Check if there is an order with the same id and matching properties
    if (this.orders.length > 0) {
      existorder = this.orders.find(temp =>
        temp.id === order.id &&
        temp.color === order.color &&
        temp.size === order.size
      );
    }

    if (existorder) {
      // Decrement the quantity by 1
      existorder.quantity -= 1;

      // Remove the order if quantity reaches zero
      if (existorder.quantity <= 0) {
        this.remove(existorder);
      } else {
        this.saveCartToStorage();
        this.calculate();
      }
    }
  }


  remove(order: Card) {
    const index = this.orders.findIndex(temp => temp.color === order.color);
    if (index > -1) {
      this.orders.splice(index, 1);
      this.saveCartToStorage();
      this.calculate();
    }
  }

  private saveCartToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.orders));
  }

  private loadCartFromStorage(): void {
    const cartData = localStorage.getItem(this.storageKey);
    if (cartData) {
      this.orders = JSON.parse(cartData);
      this.ordersSubject.next(this.orders);
      this.calculate();
    }
  }

  private calculate() {
    let totalElementsOrders: number = 0;
    let totalElementsPrice: number = 0;

    for (let temp of this.orders) {
      totalElementsOrders += temp.quantity;
      totalElementsPrice += temp.quantity * temp.priceAfterdiscount; // Use priceAfterdiscount instead
    }

    this.totalorders.next(totalElementsOrders);
    this.totalprice.next(totalElementsPrice);
    this.ordersSubject.next(this.orders); // Update the observable with the latest orders
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
    this.orders = [];
    this.ordersSubject.next(this.orders);
    this.totalorders.next(0);
    this.totalprice.next(0);
  }

  // Expose observables for total orders, total price, and orders
  getTotalOrders() {
    return this.totalorders.asObservable();
  }

  getTotalPrice() {
    return this.totalprice.asObservable();
  }

  getOrders() {
    return this.ordersSubject.asObservable();
  }
}
