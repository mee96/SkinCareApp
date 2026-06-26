import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { UserApi } from '../../core/services/user';
import { ConcernApi } from '../../core/services/concern';
import { AuthStore } from '../../core/stores/auth-store';
import { SkinType } from '../../core/models/user';
import { Concern, ConcernType } from '../../core/models/concern';

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
  selector: 'app-profile-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  templateUrl: './profile-page.html',
  styleUrls: ['../../shared/ui/chips.css', './profile-page.css'],
})
export class ProfilePage implements OnInit {
  private userApi = inject(UserApi);
  private concernApi = inject(ConcernApi);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  readonly loading = signal(true);
  readonly skinType = signal<SkinType | null>(null);
  readonly concerns = signal<Concern[]>([]);
  readonly displayName = signal<string | null>(null);

  readonly skinTypeOptions = SKIN_TYPES;
  readonly concernOptions = CONCERN_TYPES;

  readonly activeConcernTypes = computed(
    () => new Set(this.concerns().map((c) => c.concern_type))
  );

  readonly email = computed(() => this.authStore.email());

  ngOnInit(): void {
    const uid = this.authStore.uid();
    if (!uid) {
      this.loading.set(false);
      return;
    }

    this.userApi.getById(uid).subscribe({
      next: (user) => {
        this.displayName.set(user.display_name);
        this.skinType.set(user.skin_type);
        this.concernApi.getByUser(uid).subscribe({
          next: (concerns) => {
            this.concerns.set(concerns);
            this.loading.set(false);
          },
        });
      },
      error: () => this.loading.set(false),
    });
  }

  selectSkinType(type: SkinType): void {
    const uid = this.authStore.uid();
    if (!uid) return;

    this.skinType.set(type);
    this.userApi.updateSkinType(uid, type).subscribe();
  }

  toggleConcern(type: ConcernType): void {
    const uid = this.authStore.uid();
    if (!uid) return;

    const existing = this.concerns().find((c) => c.concern_type === type);

    if (existing) {
      this.concerns.update((list) => list.filter((c) => c.id !== existing.id));
      this.concernApi.remove(existing.id).subscribe();
    } else {
      this.concernApi.add(uid, type).subscribe({
        next: (newConcern) => {
          this.concerns.update((list) => [...list, newConcern]);
        },
      });
    }
  }

  async logout(): Promise<void> {
    await this.authStore.logout();
    this.router.navigateByUrl('/login');
  }
}