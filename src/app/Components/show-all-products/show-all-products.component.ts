import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResponseProduct } from 'src/app/Models/Product';
import { CategoryService } from 'src/app/Services/CategoryService/category.service';
import { ProductService } from 'src/app/Services/ProductService/product.service';

@Component({
  selector: 'app-show-all-products',
  templateUrl: './show-all-products.component.html',
  styleUrls: ['./show-all-products.component.css']
})
export class ShowAllProductsComponent implements OnInit {
  Products: PaginatedResponseProduct;
  filteredProducts: any[] = []; // To hold the filtered products
  randomImageUrls: { [key: string]: string } = {};
  categoryName: string;
  currentPage: number = 0;
  pageSize: number = 10;
  pageNumbers: number[] = [];
  categoryTypeNames: string[] = [];
  selectedCategoryTypes: string[] = []; // Track selected category types
  totalResults: number = 0;

  constructor(private productService: ProductService, private route: ActivatedRoute, private categoryTypeService: CategoryService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['categoryName']) {
        this.categoryName = params['categoryName'];
        this.fetchCategoryTypeNames();
        this.loadProductsByCategory(); // Initial product load
      }
    });
  }

  getRandomImageUrl(productId: string): string {
    return this.randomImageUrls[productId] || ''; // Fallback if no image
  }

  assignRandomImageUrls(): void {
    this.filteredProducts.forEach(product => {
      if (product.image && product.image.length > 0) {
        const randomIndex = Math.floor(Math.random() * product.image.length);
        this.randomImageUrls[product.id] = product.image[randomIndex].imageUrl;
      } else {
        this.randomImageUrls[product.id] = ''; // Fallback image
      }
    });
  }

  loadProductsByCategory(page: number = 0): void {
    if (this.selectedCategoryTypes.length > 0) {
      this.productService.getProductsByCategoryTypeNames(this.selectedCategoryTypes, this.currentPage, this.pageSize)
        .subscribe(data => {
          this.Products = data;
          this.filteredProducts = this.Products.content;
          this.totalResults = this.Products.page.totalElements; // Get total number of products

          this.assignRandomImageUrls();
          this.updatePageNumbers();
        });
    } else {
      this.productService.getProductsByCategoryName(this.categoryName, this.currentPage, this.pageSize)
        .subscribe(data => {
          this.Products = data;
          this.filteredProducts = this.Products.content;
          this.totalResults = this.Products.page.totalElements; // Get total number of products
          this.assignRandomImageUrls();
          this.updatePageNumbers();
        });
    }
  }
  fetchCategoryTypeNames(): void {
    this.categoryTypeService.getCategoryTypeNamesByCategoryName(this.categoryName)
      .subscribe({
        next: (names) => this.categoryTypeNames = names,
        error: (error) => console.error('Error fetching category type names:', error)
      });
  }

  onCategoryTypeChange(event: any, categoryTypeName: string): void {
    if (event.target.checked) {
      this.selectedCategoryTypes.push(categoryTypeName);
    } else {
      this.selectedCategoryTypes = this.selectedCategoryTypes.filter(name => name !== categoryTypeName);
    }
    this.loadProductsByCategory(); // Reload products whenever a category type is selected/deselected
  }
  // pagination
  updatePageNumbers(): void {
    if (this.Products) {
      this.pageNumbers = Array.from({ length: this.Products.page.totalPages }, (_, i) => i + 1);
    }
  }

  changePage(page: number): void {
    this.currentPage = page - 1;

    this.loadProductsByCategory(this.currentPage);

  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage++;

      this.loadProductsByCategory(this.currentPage);

    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage--;

      this.loadProductsByCategory(this.currentPage);

    }
  }

  hasNextPage(): boolean {
    return this.currentPage < (this.Products?.page.totalPages || 1) - 1;
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 0;
  }


  
}
