import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Concern, ConcernType } from '../models/concern';

@Injectable({
  providedIn: 'root',
})
export class ConcernApi {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/concerns`;

  getByUser(userId: string): Observable<Concern[]> {
    return this.http.get<Concern[]>(`${this.baseUrl}?user_id=${userId}`);
  }

  add(userId: string, type: ConcernType): Observable<Concern> {
    return this.http.post<Concern>(this.baseUrl, { user_id: userId, concern_type: type });
  }

  remove(concernId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${concernId}`);
  }
}