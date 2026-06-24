import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, SkinType } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/users`;

  getById(uid: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${uid}`);
  }

  updateSkinType(uid: string, skinType: SkinType): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${uid}`, { skin_type: skinType });
  }
}