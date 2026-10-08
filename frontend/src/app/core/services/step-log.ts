import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StepLog, ToggleResult } from '../models/step-log';

@Injectable({
  providedIn: 'root',
})
export class StepLogApi {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/step-logs`;

  getForDate(userId: string, date: string): Observable<StepLog[]> {
    return this.http.get<StepLog[]>(`${this.baseUrl}?user_id=${userId}&log_date=${date}`);
  }

  toggle(userId: string, date: string, stepDefId: number): Observable<ToggleResult> {
    return this.http.post<ToggleResult>(`${this.baseUrl}/toggle`, {
      user_id: userId,
      log_date: date,
      step_def_id: stepDefId,
    });
  }
}