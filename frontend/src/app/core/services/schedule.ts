import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ScheduleDay } from '../models/schedule';

@Injectable({
  providedIn: 'root',
})
export class Schedule {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/schedule`;

  getForDate(userId: string, date: string): Observable<ScheduleDay[]> {
    return this.http.get<ScheduleDay[]>(
      `${this.baseUrl}?user_id=${userId}&start=${date}&end=${date}`
    );
  }
}