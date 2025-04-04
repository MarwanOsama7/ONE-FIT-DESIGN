import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shipping } from 'src/app/Models/shipping';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  fetchShipping(): Observable<Shipping[]> {
    return this.http.get<Shipping[]>(`${this.apiUrl}/user/shipping/findall`);
  }
}
