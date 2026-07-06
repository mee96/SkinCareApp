import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, SlotId } from '../models/product';

export interface ScanResult {
  name: string | null;
  brand: string | null;
  slot_id: SlotId | null;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/products`;

  getByUser(userId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}?user_id=${userId}`);
  }

  addProduct(userId: string, name: string, brand: string, slotId: SlotId): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, {
      user_id: userId,
      name,
      brand: brand || null,
      slot_id: slotId,
    });
  }

  classifyProduct(name: string, brand: string | null): Observable<{ slot_id: SlotId }> {
    return this.http.post<{ slot_id: SlotId }>(`${this.baseUrl}/classify`, { name, brand });
  }

  scanImage(base64: string, mediaType: string): Observable<ScanResult> {
    return this.http.post<ScanResult>(`${this.baseUrl}/scan-image`, {
      image_base64: base64,
      media_type: mediaType,
    });
  }

  toggleStock(id: number, inStock: boolean): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${id}`, { in_stock: inStock });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}