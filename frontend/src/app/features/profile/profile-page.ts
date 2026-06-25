import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApi } from '../../core/services/user';
import { ConcernApi } from '../../core/services/concern';
import { AuthStore } from '../../core/stores/auth-store';
import { SkinType } from '../../core/models/user';
import { Concern, ConcernType } from '../../core/models/concern';

const SKIN_TYPES: { value: SkinType; label: string }[] = [
  { value: 'mixta', label: 'Mixta' },
  { value: 'grassa', label: 'Grassa' },
  { value: 'seca', label: 'Seca' },
  { value: 'normal', label: 'Normal' },
  { value: 'sensible', label: 'Sensible' },
];

const CONCERN_TYPES: { value: ConcernType; label: string; emoji: string }[] = [
  { value: 'grans', label: 'Grans', emoji: '🔴' },
  { value: 'rosacea', label: 'Rosàcia', emoji: '🌹' },
  { value: 'arrugues', label: 'Arrugues', emoji: '〜' },
  { value: 'iluminacio', label: 'Il·luminació', emoji: '✨' },
  { value: 'taques', label: 'Taques', emoji: '🟤' },
  { value: 'poros', label: 'Porus', emoji: '🔵' },
  { value: 'deshidratacio', label: 'Deshidratació', emoji: '💧' },
];

@Component({
  selector: 'app-profile-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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