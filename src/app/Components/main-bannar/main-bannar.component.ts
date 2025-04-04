import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/Category';
import { CartService } from 'src/app/Services/CartService/cart.service';
import { CategoryService } from 'src/app/Services/CategoryService/category.service';

@Component({
  selector: 'app-main-bannar',
  templateUrl: './main-bannar.component.html',
  styleUrls: ['./main-bannar.component.css']
})
export class MainBannarComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCategories();
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
}
