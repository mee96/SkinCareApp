import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RoutineTypeCode, ScheduleDay } from '../models/schedule';

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

  getForRange(userId: string, start: string, end: string): Observable<ScheduleDay[]> {
    return this.http.get<ScheduleDay[]>(
      `${this.baseUrl}?user_id=${userId}&start=${start}&end=${end}`
    );
  }

  upsert(userId: string, date: string, routineTypeCode: RoutineTypeCode): Observable<ScheduleDay> {
    return this.http.post<ScheduleDay>(this.baseUrl, {
      user_id: userId,
      sched_date: date,
      routine_type_code: routineTypeCode,
    });
  }
}