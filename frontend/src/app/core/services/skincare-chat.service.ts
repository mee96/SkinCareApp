import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root',
})
export class SkincareChatService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/chat`;

  sendMessage(
    userId: string,
    message: string,
    history: ChatMessage[],
  ): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(`${this.baseUrl}/skincare`, {
      user_id: userId,
      message,
      history,
    });
  }
}
