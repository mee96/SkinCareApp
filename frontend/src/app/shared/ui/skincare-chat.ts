import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, MessageCircle, X, Send } from 'lucide-angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SkincareChatService } from '../../core/services/skincare-chat.service';
import { AuthStore } from '../../core/stores/auth-store';
import { ChatMessage } from '../../core/models/chat-message';

@Component({
  selector: 'app-skincare-chat',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './skincare-chat.html',
  styleUrl: './skincare-chat.css',
})
export class SkincareChat {
  private chatService = inject(SkincareChatService);
  private authStore = inject(AuthStore);
  private translate = inject(TranslateService);

  readonly MessageCircleIcon = MessageCircle;
  readonly XIcon = X;
  readonly SendIcon = Send;

  readonly isOpen = signal(false);
  readonly messages = signal<ChatMessage[]>([]);
  readonly input = signal('');
  readonly loading = signal(false);

  toggle(): void {
    this.isOpen.update((open) => !open);

    if (this.isOpen() && this.messages().length === 0) {
      this.messages.set([
        { role: 'assistant', content: this.translate.instant('chat.welcome') },
      ]);
    }
  }

  send(): void {
    const uid = this.authStore.uid();
    const text = this.input().trim();
    if (!text || !uid || this.loading()) return;

    const history = this.messages();
    this.messages.update((list) => [...list, { role: 'user', content: text }]);
    this.input.set('');
    this.loading.set(true);

    this.chatService.sendMessage(uid, text, history).subscribe({
      next: (result) => {
        this.messages.update((list) => [...list, { role: 'assistant', content: result.response }]);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
