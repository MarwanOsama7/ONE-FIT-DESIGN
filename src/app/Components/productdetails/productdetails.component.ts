import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/Models/CartOrder';
import { CartService } from 'src/app/Services/CartService/cart.service';
import { ProductService } from 'src/app/Services/ProductService/product.service';

interface Size {
  sizeValue: string;
  stockQuantity: number;
  variantId: string;
}

interface ProductSize {
  colorId: number;
  colorName: string;
  sizes: Size[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  priceAfterDiscount: number;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  images: { colorId: number; imageUrl: string }[];
  productSizes: ProductSize[];
}

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  productId!: number;
  productName = '';
  price!: number;
  priceAfterDiscount!: number;
  metaTitle = '';
  metaDescription = '';
  images: string[] = [];
  sizes: Size[] = [];
  colors: any[] = [];
  firstItem?: string;
  remainingItems: string[] = [];
  selectedImage = '';
  selectedSize = '';
  selectedColor: { colorId: number; colorName: string; images: string[]; sizes: Size[] } | null = null;
  number: number = 1;
  selectedVariantId: string = '';

  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  quantity = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    const productName = this.route.snapshot.paramMap.get('name') || '';
    const variantIdFromUrl: string | undefined = this.route.snapshot.queryParamMap.get('variant') || undefined;

    if (productName) {
      this.productService.getProductByName(productName).subscribe((products: Product[]) => {
        if (products.length) {
          this.initializeProduct(products[0], variantIdFromUrl);
        }
      });
    }
  }


  private initializeProduct(product: Product, variantIdFromUrl?: string): void {
    this.productId = product.id;
    this.productName = product.name;
    this.metaTitle = product.metaTitle;
    this.metaDescription = product.metaDescription;
    this.updateMetaTags();

    if (product.description) {
      const items = product.description.split('\\n');
      this.firstItem = items.shift();
      this.remainingItems = items;
    }

    this.price = product.price;
    this.priceAfterDiscount = product.priceAfterDiscount;
    this.processProductImages(product);
    this.processProductSizes(product);

    // If variantId is provided, select the corresponding color and size
    if (variantIdFromUrl) {
      this.selectVariant(variantIdFromUrl);
    }
  }

  private selectVariant(variantId: string): void {
    for (const color of this.colors) {
      const matchingSize = color.sizes.find((size: { variantId: string; }) => size.variantId === variantId);
      if (matchingSize) {
        this.selectedColor = color;
        this.selectedSize = matchingSize.sizeValue;
        this.selectedVariantId = matchingSize.variantId;
        this.selectedImage = color.images[0] || ''; // Select first image of the color
        // console.log('Variant selected:', this.selectedVariantId, 'Color:', this.selectedColor.colorName, 'Size:', this.selectedSize);
        return;
      }
    }
    console.warn('Variant ID not found:', variantId);
  }


  private processProductImages(product: Product): void {
    const colorImageMap: { [key: number]: string[] } = {};
    product.images.forEach(image => {
      if (!colorImageMap[image.colorId]) {
        colorImageMap[image.colorId] = [];
      }
      colorImageMap[image.colorId].push(image.imageUrl);
    });

    this.colors = Object.keys(colorImageMap).map(colorId => {
      const productSize = product.productSizes.find(ps => ps.colorId === +colorId);
      return {
        colorId: +colorId,
        colorName: productSize?.colorName || '',
        images: colorImageMap[+colorId],
        sizes: productSize?.sizes || []
      };
    });

    this.selectedColor = this.colors[0] || null;
    this.selectedImage = this.selectedColor?.images[0] || '';
    if (this.selectedColor) this.updateSizesForColor(this.selectedColor.colorId);
  }

  private processProductSizes(product: Product): void {
    this.images = product.images.map(image => image.imageUrl);
  }

  updateMetaTags(): void {
    this.title.setTitle(this.metaTitle);
    this.meta.updateTag({ name: 'description', content: this.metaDescription });
  }

  selectColor(color: any): void {
    this.selectedColor = color;
    this.selectedImage = color.images[0];
    const firstImageIndex = this.images.findIndex((image) => image === color.images[0]);

    if (firstImageIndex !== -1) {
      const thumbnails = document.querySelector('.thumbnails') as HTMLElement;
      const thumbnailWidth = thumbnails.scrollWidth / this.images.length;
      const scrollToPosition = firstImageIndex * thumbnailWidth;

      thumbnails.scrollTo({
        left: scrollToPosition,
        behavior: 'smooth',
      });
    }

    this.updateSizesForColor(color.colorId);
  }

  updateSizesForColor(colorId: number): void {
    const selectedColor = this.colors.find((color) => color.colorId === colorId);
    if (selectedColor && selectedColor.sizes.length > 0) {
      // console.log('Selected Sizes:', selectedColor.sizes);
      this.sizes = selectedColor.sizes;
      this.selectedSize = this.sizes[0].sizeValue;
      this.checkAndSelectAvailableSize();
    } else {
      this.sizes = [];
      this.selectedSize = '';
      this.selectedVariantId = ''; // Clear variant ID if no sizes
    }
  }

  selectSize(size: Size): void {
    if (size.stockQuantity > 0) {
      this.selectedSize = size.sizeValue;
      this.selectedVariantId = size.variantId;

      // Update the URL with the variant ID
      const productNameFromRoute = this.route.snapshot.paramMap.get('name');
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { variant: this.selectedVariantId },
        queryParamsHandling: 'merge' // This preserves existing query params
      });
    } else {
      this.selectedVariantId = '';
    }
  }


  checkAndSelectAvailableSize(): void {
    this.selectedSize = this.sizes.find(size => size.stockQuantity > 0)?.sizeValue || '';
    this.selectedVariantId = this.sizes.find(size => size.stockQuantity > 0)?.variantId || '';
  }

  get isOutOfStock(): boolean {
    return this.sizes.every(size => size.stockQuantity === 0);
  }

  addToCart(): void {
    if (this.selectedVariantId) {
      const order: Card = this.createOrder();
      this.cartService.addToCard(order);
      // console.log('Added to cart with variant:', this.selectedVariantId);
    } else {
      console.warn('Please select a size before adding to cart.');
    }
  }

  buyNow(): void {
    if (this.selectedVariantId) {
      const order: Card = this.createOrder();
      this.cartService.addToCard(order);
      const productNameFromRoute = this.route.snapshot.paramMap.get('name');
      // console.log('Navigating with variant ID:', this.selectedVariantId); // Added console log
      this.router.navigate([`/product/${productNameFromRoute}`], {
        queryParams: { variant: this.selectedVariantId },
      });
    } else {
      console.warn('Please select a size before buying.');
    }
  }

  private createOrder(): Card {
    return {
      id: this.productId,
      name: this.productName,
      price: this.price,
      priceAfterdiscount: this.priceAfterDiscount,
      quantity: this.number,
      color: this.selectedColor?.colorName || '',
      size: this.selectedSize || '',
      img: this.selectedImage
    };
  }

  increment(): void {
    this.number++;
  }

  decrement(): void {
    if (this.number > 1) {
      this.number--;
    }
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  scrollThumbnails(direction: 'left' | 'right') {
    const thumbnails = document.querySelector('.thumbnails') as HTMLElement;
    const scrollAmount = direction === 'left' ? -100 : 100;
    thumbnails.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  startScroll(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    const target = event.target as HTMLElement;
    const thumbnailsContainer = target.closest('.thumbnails') as HTMLElement;

    if (event instanceof MouseEvent) {
      this.startX = event.pageX - thumbnailsContainer.offsetLeft;
    } else {
      this.startX = (event as TouchEvent).touches[0].pageX - thumbnailsContainer.offsetLeft;
    }
    this.scrollLeft = thumbnailsContainer.scrollLeft;
  }

  onScroll(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;

    const target = event.target as HTMLElement;
    const thumbnailsContainer = target.closest('.thumbnails') as HTMLElement;

    let x;
    if (event instanceof MouseEvent) {
      x = event.pageX - thumbnailsContainer.offsetLeft;
    } else {
      x = (event as TouchEvent).touches[0].pageX - thumbnailsContainer.offsetLeft;
    }

    const walk = (x - this.startX) * 2;
    thumbnailsContainer.scrollLeft = this.scrollLeft - walk;
  }

  endScroll() {
    this.isDragging = false;
  }
}