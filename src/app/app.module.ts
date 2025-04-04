import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';  // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
// Http
import { HttpClientModule } from '@angular/common/http'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { MainBannarComponent } from './Components/main-bannar/main-bannar.component';
import { HomeComponent } from './Components/home/home.component';
import { MenAreaComponent } from './Components/men-area/men-area.component';
import { WomenAreaComponent } from './Components/women-area/women-area.component';
import { ExploreComponent } from './Components/explore/explore.component';
import { SubscribingComponent } from './Components/subscribing/subscribing.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ShowAllProductsComponent } from './Components/show-all-products/show-all-products.component';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { CartOffcanvasComponent } from './Components/cart-offcanvas/cart-offcanvas.component';
import { NavbarCheckoutComponent } from './Components/checkout/navbar-checkout/navbar-checkout.component';
import { ConfirmOrderComponent } from './Components/confirm-order/confirm-order.component';
import { IconsComponent } from './Components/icons/icons.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainBannarComponent,
    HomeComponent,
    MenAreaComponent,
    WomenAreaComponent,
    ExploreComponent,
    SubscribingComponent,
    FooterComponent,
    ShowAllProductsComponent,
    ProductdetailsComponent,
    CartComponent,
    CheckoutComponent,
    CartOffcanvasComponent,
    NavbarCheckoutComponent,
    ConfirmOrderComponent,
    IconsComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
