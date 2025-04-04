import { NgModule } from '@angular/core';
import { RouterModule, Routes, Scroll } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ShowAllProductsComponent } from './Components/show-all-products/show-all-products.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ConfirmOrderComponent } from './Components/confirm-order/confirm-order.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'showproduct/category/:categoryName', component: ShowAllProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'productdetails/:name', component: ProductdetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'confirmorder', component: ConfirmOrderComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
