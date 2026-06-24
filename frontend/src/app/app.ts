import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule, Sun, Moon, User } from 'lucide-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly isDark = signal(false);
  readonly iconSize = 18;

  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;
  readonly UserIcon = User;

  toggleTheme(): void {
    this.isDark.update((v) => !v);
    document.documentElement.setAttribute(
      'data-theme',
      this.isDark() ? 'dark' : 'light'
    );
  }
}