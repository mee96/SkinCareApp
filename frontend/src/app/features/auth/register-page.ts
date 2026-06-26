import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthStore } from '../../core/stores/auth-store';
import { UserApi } from '../../core/services/user';
import { ConcernApi } from '../../core/services/concern';
import { SkinType } from '../../core/models/user';
import { ConcernType } from '../../core/models/concern';

const SKIN_TYPES: { value: SkinType }[] = [
  { value: 'mixta' },
  { value: 'grassa' },
  { value: 'seca' },
  { value: 'normal' },
  { value: 'sensible' },
];

const CONCERN_TYPES: { value: ConcernType; emoji: string }[] = [
  { value: 'grans', emoji: '🔴' },
  { value: 'rosacea', emoji: '🌹' },
  { value: 'arrugues', emoji: '〜' },
  { value: 'iluminacio', emoji: '✨' },
  { value: 'taques', emoji: '🟤' },
  { value: 'poros', emoji: '🔵' },
  { value: 'deshidratacio', emoji: '💧' },
];

@Component({
  selector: 'app-register-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, TranslatePipe],
  templateUrl: './register-page.html',
  styleUrls: ['../../shared/ui/auth-card.css', '../../shared/ui/chips.css', './register-page.css'],
})
export class RegisterPage {
  private authStore = inject(AuthStore);
  private userApi = inject(UserApi);
  private concernApi = inject(ConcernApi);
  private router = inject(Router);

  readonly skinTypeOptions = SKIN_TYPES;
  readonly concernOptions = CONCERN_TYPES;

  readonly displayName = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly skinType = signal<SkinType | null>(null);
  readonly selectedConcerns = signal<Set<ConcernType>>(new Set());

  readonly error = signal<string | null>(null);
  readonly loading = signal(false);

  readonly canSubmit = computed(
    () => this.displayName().trim().length > 0 && this.skinType() !== null
  );

  selectSkinType(type: SkinType): void {
    this.skinType.set(type);
  }

  toggleConcern(type: ConcernType): void {
    this.selectedConcerns.update((set) => {
      const next = new Set(set);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });
  }

  async registerWithEmail(): Promise<void> {
    if (!this.canSubmit()) {
      this.error.set('auth.errors.missingFields');
      return;
    }
    this.error.set(null);
    this.loading.set(true);
    try {
      const firebaseUser = await this.authStore.registerWithEmail(this.email(), this.password());
      await this.completeOnboarding(firebaseUser.uid, firebaseUser.email ?? this.email());
      this.router.navigateByUrl('/avui');
    } catch {
      this.error.set('auth.errors.registerFailed');
    } finally {
      this.loading.set(false);
    }
  }

  async registerWithGoogle(): Promise<void> {
    if (!this.canSubmit()) {
      this.error.set('auth.errors.missingFields');
      return;
    }
    this.error.set(null);
    this.loading.set(true);
    try {
      const firebaseUser = await this.authStore.loginWithGoogle();
      await this.completeOnboarding(firebaseUser.uid, firebaseUser.email ?? '');
      this.router.navigateByUrl('/avui');
    } catch {
      this.error.set('auth.errors.googleRegisterFailed');
    } finally {
      this.loading.set(false);
    }
  }

  private async completeOnboarding(uid: string, email: string): Promise<void> {
    // 1) crea l'usuari al backend (o el deixa estar si ja existia)
    await new Promise<void>((resolve, reject) => {
      this.userApi.getById(uid).subscribe({
        next: () => resolve(),
        error: () => {
          this.userApi.create(uid, email).subscribe({
            next: () => resolve(),
            error: (err) => reject(err),
          });
        },
      });
    });

    // 2) desa el nom d'usuari
    await new Promise<void>((resolve) => {
      this.userApi.updateDisplayName(uid, this.displayName().trim()).subscribe({
        next: () => resolve(),
        error: () => resolve(),
      });
    });

    // 3) desa el tipus de pell
    const type = this.skinType();
    if (type) {
      await new Promise<void>((resolve) => {
        this.userApi.updateSkinType(uid, type).subscribe({ next: () => resolve(), error: () => resolve() });
      });
    }

    // 4) desa cada preocupació seleccionada
    const concerns = Array.from(this.selectedConcerns());
    for (const concernType of concerns) {
      await new Promise<void>((resolve) => {
        this.concernApi.add(uid, concernType).subscribe({ next: () => resolve(), error: () => resolve() });
      });
    }
  }
}