import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LanguageStore, Lang } from '../../core/stores/language-store';

interface LangOption {
  code: Lang;
  label: string;
}

const LANG_OPTIONS: LangOption[] = [
  { code: 'ca', label: 'CA' },
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'ko', label: '한국어' },
];

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './language-switcher.html',
  styleUrls: ['./icon-btn.css', './language-switcher.css'],
})
export class LanguageSwitcher {
  private languageStore = inject(LanguageStore);

  readonly options = LANG_OPTIONS;
  readonly current = this.languageStore.current;
  readonly open = signal(false);

  toggleOpen(): void {
    this.open.update((v) => !v);
  }

  select(lang: Lang): void {
    this.languageStore.setLanguage(lang);
    this.open.set(false);
  }
}