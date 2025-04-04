import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Models/Category';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  // Method to get all categories
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + '/category/findall');
  }

  getCategoryTypeNamesByCategoryName(categoryName: string): Observable<string[]> {
    const url = `${this.apiUrl}/names/byCategoryName`;
    return this.http.get<string[]>(`${url}?categoryName=${encodeURIComponent(categoryName)}`);
  }
}
