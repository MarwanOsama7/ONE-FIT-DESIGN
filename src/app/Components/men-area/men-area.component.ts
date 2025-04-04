import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/ProductService/product.service';
declare var $: any;

@Component({
  selector: 'app-men-area',
  templateUrl: './men-area.component.html',
  styleUrls: ['./men-area.component.css']
})
export class MenAreaComponent implements OnInit, AfterViewInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadNewArrivals();
  }

  ngAfterViewInit(): void {
    this.initializeCarousel();
  }

  loadNewArrivals(): void {
    this.productService.getNewArrivals('Men').subscribe(
      (data) => {
        this.products = data;
        this.cdr.detectChanges(); // Trigger view update
        this.initializeCarousel(); // Reinitialize the carousel after data load
      },
      (error) => {
        console.error('Error fetching new arrivals:', error);
      }
    );
  }

  initializeCarousel(): void {
    $('.owl-men-item').owlCarousel('destroy'); // Destroy any existing instance
    setTimeout(() => {
      $('.owl-men-item').owlCarousel({
        items: 3,
        loop: true,
        margin: 10,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1, // 1 item for small screens
          },
          768: {
            items: 2, // 2 items for medium screens
          },
          1024: {
            items: 3, // 3 items for large screens
          },
        },
      });
    }, 0); // Small delay ensures DOM is fully updated
  }
}
