import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WishlistItem } from '../models/wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/wishlist`;

  getByUser(userId: string): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(`${this.baseUrl}?user_id=${userId}`);
  }

  add(
    userId: string,
    productName: string,
    brand: string | null,
    slotId: string | null,
  ): Observable<WishlistItem> {
    return this.http.post<WishlistItem>(this.baseUrl, {
      user_id: userId,
      product_name: productName,
      brand,
      slot_id: slotId,
    });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
