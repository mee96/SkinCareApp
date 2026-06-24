import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit } from '@angular/core';
import { UserApi } from '../../core/services/user';
import { ConcernApi } from '../../core/services/concern';
import { SkinType } from '../../core/models/user';
import { Concern, ConcernType } from '../../core/models/concern';

const USER_ID = 'test-uid-001'; // TODO: vindrà de l'AuthStore

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
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {
  private userApi = inject(UserApi);
  private concernApi = inject(ConcernApi);

  readonly loading = signal(true);
  readonly skinType = signal<SkinType | null>(null);
  readonly concerns = signal<Concern[]>([]);

  readonly skinTypeOptions = SKIN_TYPES;
  readonly concernOptions = CONCERN_TYPES;

  readonly activeConcernTypes = computed(
    () => new Set(this.concerns().map((c) => c.concern_type))
  );

  ngOnInit(): void {
    this.userApi.getById(USER_ID).subscribe({
      next: (user) => {
        this.skinType.set(user.skin_type);
        this.concernApi.getByUser(USER_ID).subscribe({
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
    this.skinType.set(type); // actualització immediata a la UI
    this.userApi.updateSkinType(USER_ID, type).subscribe();
  }

  toggleConcern(type: ConcernType): void {
    const existing = this.concerns().find((c) => c.concern_type === type);

    if (existing) {
      this.concerns.update((list) => list.filter((c) => c.id !== existing.id));
      this.concernApi.remove(existing.id).subscribe();
    } else {
      this.concernApi.add(USER_ID, type).subscribe({
        next: (newConcern) => {
          this.concerns.update((list) => [...list, newConcern]);
        },
      });
    }
  }
}