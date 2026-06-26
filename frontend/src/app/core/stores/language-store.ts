import { Injectable, signal, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'ca' | 'es' | 'en' | 'ko';

@Injectable({
  providedIn: 'root',
})
export class LanguageStore {
  private translate = inject(TranslateService);

  readonly current = signal<Lang>('ca');

  setLanguage(lang: Lang): void {
    this.current.set(lang);
    this.translate.use(lang);
  }
}