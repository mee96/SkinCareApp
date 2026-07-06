import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/products`;

  getByUser(userId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}?user_id=${userId}`);
  }

  toggleStock(id: number, inStock: boolean): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${id}`, { in_stock: inStock });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}