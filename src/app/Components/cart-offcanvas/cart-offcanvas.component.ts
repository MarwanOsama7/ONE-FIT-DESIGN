import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offcanvas } from 'bootstrap';
import { Card } from 'src/app/Models/CartOrder';
import { CartService } from 'src/app/Services/CartService/cart.service';

@Component({
  selector: 'app-cart-offcanvas',
  templateUrl: './cart-offcanvas.component.html',
  styleUrls: ['./cart-offcanvas.component.css']
})
export class CartOffcanvasComponent implements OnInit {
  orders: Card[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getOrders().subscribe(data => {
      this.orders = data;
    });
    this.cartService.getTotalPrice().subscribe(data => {
      this.totalPrice = data;
    });
  }

  increaseQuantity(order: Card): void {
    order.quantity++;
    this.updateOrder(order);
  }

  decreaseQuantity(order: Card): void {
    if (order.quantity > 1) {
      order.quantity--;
      this.updateOrder(order);
    }
  }

  onQuantityChange(order: Card): void {
    if (order.quantity < 1) {
      order.quantity = 1; // Ensure minimum quantity is 1
    }
    this.updateOrder(order);
  }

  private updateOrder(order: Card): void {
    this.cartService.updateOrder(order);
  }

  onCheckout() {
    this.closeOffcanvas();

    // Ensure body and html are scrollable
    document.body.style.overflow = 'auto';
    document.body.style.position = '';
    document.documentElement.style.overflow = 'auto';

    this.router.navigate(['/checkout']);

    // if (this.auth.isLogin()) {
    //   this.closeOffcanvas(); // Close the offcanvas and reset body scroll
    //   this.router.navigate(['/checkout']);
    // } else {
    //   this.closeOffcanvas();
    //   this.router.navigate(['/signin'], { queryParams: { returnUrl: '/checkout' } });
    // }
  }
  
  viewCart() {
    this.closeOffcanvas();

    // Ensure body and html are scrollable
    document.body.style.overflow = 'auto';
    document.body.style.position = '';
    document.documentElement.style.overflow = 'auto';

    this.router.navigate(['/cart']);
  }

  closeOffcanvas() {
    const offcanvasEl = document.getElementById('offcanvasRight');

    // Hide the offcanvas component
    if (offcanvasEl) {
      const bsOffcanvas = Offcanvas.getInstance(offcanvasEl) || new Offcanvas(offcanvasEl);
      bsOffcanvas.hide();
    }

    // Manually remove any remaining backdrop element
    const backdrops = document.querySelectorAll('.offcanvas-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());

    // Remove any classes Bootstrap might add to disable scroll
    document.body.style.overflow = '';
    document.body.classList.remove('offcanvas-open', 'modal-open'); // Ensure no Bootstrap class interferes
    document.documentElement.style.overflow = ''; // In case `html` is affected
  }


}