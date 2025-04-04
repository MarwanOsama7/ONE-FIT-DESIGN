import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/Models/CartOrder';
import { CartService } from 'src/app/Services/CartService/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalOrder: number = 0;
  totalPrice: number = 0;
  orders: Card[] = [];

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    // Subscribe to cart data updates
    this.cartService.getTotalOrders().subscribe(
      data => {
        this.totalOrder = data;
      }
    );
    this.cartService.getTotalPrice().subscribe(
      data => {
        this.totalPrice = data;
      }
    );

    // Initialize orders list
    this.cartService.getOrders().subscribe(
      data => {
        this.orders = data;
      }
    );
  }

  addorder(order: Card) {
    this.cartService.addToCard(order);
  }

  removeorder(order: Card) {
    this.cartService.removeorder(order);
  }
  // In your component TypeScript file

  increaseQuantity(order: Card): void {
    order.quantity++;
    this.updateOrder(order);
  }

  decreaseQuantity(order: Card): void {
    if (order.quantity > 1) {
      order.quantity--;
      this.updateOrder(order);
    } else {
      // Optionally handle removal of the order
      this.removeOrder(order);
    }
  }

  onQuantityChange(order: Card): void {
    if (order.quantity < 1) {
      order.quantity = 1; // Ensure quantity is at least 1
    }
    this.updateOrder(order);
  }

  private updateOrder(order: Card): void {
    this.cartService.updateOrder(order);
  }

  public removeOrder(order: Card): void {
    this.cartService.remove(order);
  }
 
  onCheckout() {
    this.router.navigate(['/checkout']);
    // if (this.isLogin()) {
    //   this.router.navigate(['/checkout']);
    // } else {
    //   this.router.navigate(['/signin'],{ queryParams: { returnUrl: '/checkout' } });
    // }
  }
}
