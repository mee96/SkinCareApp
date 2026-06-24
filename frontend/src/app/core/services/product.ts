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
}