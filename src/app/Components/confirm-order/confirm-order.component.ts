import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseRequest } from 'src/app/Models/PurchaseRequest';
import { OrderService } from 'src/app/Services/OrderService/order.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  currentDate: Date = new Date(); // Set current date
  orderData!: PurchaseRequest | null;
  shippingPrice: number = 0; // Variable to hold the shipping price
  shippingdays: string | null = null;
  subtotal: number = 0;

  constructor(private orderDataService: OrderService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    // Retrieve state data passed during navigation
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { shippingPrice: number; shippingdays: string };

    if (state) {
      this.shippingPrice = state.shippingPrice || 0;
      this.shippingdays = state.shippingdays || null;
    }

    // After retrieving the shipping price, calculate subtotal
    this.calculateSubtotal();

    // Subscribe to order data service to get order details
    this.orderDataService.orderData$.subscribe(data => {
      this.orderData = data;

      // Calculate subtotal after order data is available
      this.calculateSubtotal();
    });
  }
  calculateSubtotal(): void {
    if (this.orderData) {
      this.subtotal = this.orderData.requestOrder.totalPrice - this.shippingPrice;
    }
  }
}
