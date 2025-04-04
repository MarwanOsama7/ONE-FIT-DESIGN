import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

interface PromoCodeResponse {
  message: string;
  discount: number;
}

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  usePromoCode(code: string): Observable<PromoCodeResponse> {
    return this.http.post<PromoCodeResponse>(`${this.apiUrl}/usepromoCode/${code}`, null).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message || 'An error occurred.'));
  }
}
