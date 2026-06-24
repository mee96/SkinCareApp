import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StepDef } from '../models/step-def';

@Injectable({
  providedIn: 'root',
})
export class StepDefApi {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/step-defs`;

  getByType(userId: string, routineTypeCode: string): Observable<StepDef[]> {
    return this.http.get<StepDef[]>(
      `${this.baseUrl}?user_id=${userId}&routine_type_code=${routineTypeCode}`
    );
  }
}