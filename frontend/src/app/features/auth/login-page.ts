import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthStore } from '../../core/stores/auth-store';

@Component({
  selector: 'app-login-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrls: ['../../shared/ui/auth-card.css', './login-page.css'],
})
export class LoginPage {
  private authStore = inject(AuthStore);
  private router = inject(Router);

  readonly email = signal('');
  readonly password = signal('');
  readonly error = signal<string | null>(null);
  readonly loading = signal(false);

  async loginWithEmail(): Promise<void> {
    this.error.set(null);
    this.loading.set(true);
    try {
      await this.authStore.loginWithEmail(this.email(), this.password());
      this.router.navigateByUrl('/avui');
    } catch (e) {
      this.error.set('Email o contrasenya incorrectes.');
    } finally {
      this.loading.set(false);
    }
  }

  async loginWithGoogle(): Promise<void> {
    this.error.set(null);
    this.loading.set(true);
    try {
      await this.authStore.loginWithGoogle();
      this.router.navigateByUrl('/avui');
    } catch (e) {
      this.error.set('No s\'ha pogut iniciar sessió amb Google.');
    } finally {
      this.loading.set(false);
    }
  }
}