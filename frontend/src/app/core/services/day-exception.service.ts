import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DayException } from '../models/day-exception';

@Injectable({
  providedIn: 'root',
})
export class DayExceptionService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/exceptions`;

  getForRange(userId: string, start: string, end: string): Observable<DayException[]> {
    return this.http.get<DayException[]>(
      `${this.baseUrl}?user_id=${userId}&start=${start}&end=${end}`
    );
  }

  upsert(userId: string, date: string, note: string | null): Observable<DayException> {
    return this.http.post<DayException>(this.baseUrl, {
      user_id: userId,
      exception_date: date,
      note,
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
