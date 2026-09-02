import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule, Sun, Moon, User } from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../ui/language-switcher';
import { SkincareChat } from '../ui/skincare-chat';

@Component({
  selector: 'app-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule, LanguageSwitcher, SkincareChat, TranslatePipe],
  templateUrl: './app-shell.html',
  styleUrls: ['../ui/icon-btn.css', './app-shell.css'],
})
export class AppShell {
  readonly isDark = signal(false);
  readonly iconSize = 18;

  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;
  readonly UserIcon = User;

  toggleTheme(): void {
    this.isDark.update((v) => !v);
    document.documentElement.setAttribute('data-theme', this.isDark() ? 'dark' : 'light');
  }
}