import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductReview } from '../models/product-review';

@Injectable({
  providedIn: 'root',
})
export class ProductReviewService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/reviews`;

  getForProduct(productId: number, userId: string): Observable<ProductReview> {
    return this.http.get<ProductReview>(`${this.baseUrl}/${productId}?user_id=${userId}`);
  }

  save(
    userId: string,
    productId: number,
    rating: number,
    notes: string,
  ): Observable<ProductReview> {
    return this.http.post<ProductReview>(this.baseUrl, {
      user_id: userId,
      product_id: productId,
      rating,
      notes,
    });
  }
}
