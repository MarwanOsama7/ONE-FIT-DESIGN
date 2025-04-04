import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/Category';
import { CartService } from 'src/app/Services/CartService/cart.service';
import { CategoryService } from 'src/app/Services/CategoryService/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories: Category[] = [];
  isMenuOpen = false;  // Track the menu state
  openCategory: number | null = null; // Keep track of the currently open category
  cartCount: number ;

  constructor(private categoryService: CategoryService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.getcardstatus();
  }
  toggleCategory(index: number): void {
    // Set the clicked category as open, and close others
    this.openCategory = this.openCategory === index ? null : index;
  }

  // Function to toggle the menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;  // Toggle the menu open/close state
  }
  // Method to load categories from the API
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  getcardstatus() {
    this.cartService.getTotalOrders().subscribe(size => {
      this.cartCount = size;
    });
  }
}