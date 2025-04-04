import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Card } from 'src/app/Models/CartOrder';
import { Client, Item, PurchaseRequest, RequestOrder } from 'src/app/Models/PurchaseRequest';
import { Shipping } from 'src/app/Models/shipping';
import { CartService } from 'src/app/Services/CartService/cart.service';
import { OrderService } from 'src/app/Services/OrderService/order.service';
import { PromoCodeService } from 'src/app/Services/PromoCodeService/promo-code.service';
import { PurchaseService } from 'src/app/Services/PurchaseService/purchase.service';
import { ShippingService } from 'src/app/Services/ShippingService/shipping.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalOrder: number = 0;
  totalPrice: number = 0;
  orders: Card[] = [];
  checkoutForm!: FormGroup;
  shippingPrice: number = 0;
  shippingdays: string;
  subtotal: number = 0;
  Shipping: Shipping[] = []

  promoCode: string = '';
  promoDiscount: number = 0;
  promoUsed: boolean = false;  // Track if a promo code has already been applied
  message: string = '';
  loading: boolean = false;
  loadingSubmit: boolean = false;

  constructor(
    private cartService: CartService,
    private purchaseService: PurchaseService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private shippingService: ShippingService,
    private promoCodeService: PromoCodeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.shippingService.fetchShipping().subscribe(data => {
      this.Shipping = data
    });

    this.cartService.getTotalOrders().subscribe(data => {
      this.totalOrder = data;
    });
    this.cartService.getTotalPrice().subscribe(data => {
      this.totalPrice = data + this.shippingPrice;
      this.subtotal = data;
    });
    this.cartService.getOrders().subscribe(data => {
      this.orders = data;
    });

    this.checkoutForm = this.fb.group({
      checkoutEmail: ['', [Validators.required, Validators.email]],
      checkoutPhone: ['', Validators.required],
      checkoutanotherPhone: [''],
      checkoutName: ['', Validators.required],
      checkoutAddress: ['', Validators.required],
      checkoutCity: ['', Validators.required],
      checkoutCheckbox: [true, Validators.requiredTrue]
    });
  }


  onSubmit() {
    if (this.checkoutForm.invalid) {
      // Mark all controls as touched to trigger validation messages
      this.checkoutForm.markAllAsTouched();

      // Find the first invalid control and focus on it
      const invalidControl = document.querySelector('.ng-invalid') as HTMLElement;
      if (invalidControl) {
        invalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        invalidControl.focus();
        alert('Please fill in all required fields.');
      }
      return;
    }
    this.loadingSubmit = true;
    setTimeout(() => {
      const client: Client = {
        username: this.checkoutForm.value.checkoutName,
        email: this.checkoutForm.value.checkoutEmail,
        phoneNumber: this.checkoutForm.value.checkoutPhone,
        phoneNumberOptional: this.checkoutForm.value.checkoutanotherPhone,
        address: this.checkoutForm.value.checkoutAddress,
        city: this.checkoutForm.value.checkoutCity
      };

      const requestOrder: RequestOrder = {
        code: this.generateOrderCode(),
        note: 'Order placed via online checkout',
        cityOfOrder: this.checkoutForm.value.checkoutCity, // Get selected city from form
        totalPrice: this.totalPrice,
        totalQuantity: this.totalOrder,
        promoCode: this.promoCode
      };

      const items: Item[] = this.orders.map(order => ({
        name: order.name,
        colorName: order.color,
        img: order.img,
        size: order.size,
        price: order.priceAfterdiscount,
        quantity: order.quantity
      }));

      const purchaseRequest: PurchaseRequest = {
        client: client,
        requestOrder: requestOrder,
        items: items
      };

      this.purchaseService.createPurchaseRequest(purchaseRequest).subscribe(response => {
        // Store order data in the OrderDataService
        this.orderService.setOrderData({
          client: client,
          requestOrder: requestOrder,
          items: items
        });
        // console.log('Order placed successfully:', response);
        this.cartService.clearCart();
        this.router.navigate(['/confirmorder'], { state: { shippingPrice: this.shippingPrice, shippingdays: this.shippingdays } });
      }, error => {
        console.error('Error placing order:', error);
      });
    }, 2000)

  }



  applyPromoCodes() {
    if (!this.promoCode.trim()) {
      this.message = 'Please enter a promo code.';
      return;
    }

    if (this.promoUsed) {
      this.message = 'Promo code already applied.';
      return;
    }

    this.loading = true;
    setTimeout(() => {
      this.promoCodeService.usePromoCode(this.promoCode.trim()).subscribe(
        (response) => {
          this.loading = false;

          if (response && response.discount > 0) {
            this.promoDiscount = (this.subtotal * response.discount) / 100; // Apply discount only to subtotal
            this.promoUsed = true; // Mark promo code as used
            this.message = `Promo code applied! You saved ${this.promoDiscount.toFixed(2)}.`;

            // Recalculate totalPrice with the current shipping price
            this.totalPrice = this.subtotal - this.promoDiscount + this.shippingPrice;
          } else {
            this.message = 'Invalid or expired promo code.';
            this.promoDiscount = 0;
          }
        },
        (error) => {
          this.loading = false;
          this.message = error.message || 'Error applying promo code.';
          this.promoDiscount = 0;
        }
      );
    }, 2000)

  }

  onCityChange(event: any): void {
    const selectedCity = event.target.value;
    const city = this.Shipping.find(c => c.name === selectedCity);
    if (city) {
      this.shippingPrice = city.price;
      this.shippingdays = city.numberOfDay;

      // Recalculate totalPrice with the promo discount already applied
      this.totalPrice = this.subtotal - this.promoDiscount + this.shippingPrice;
    }
  }



  generateOrderCode(): string {
    return 'ORD-' + Math.floor(Math.random() * 1000000).toString();
  }
}

