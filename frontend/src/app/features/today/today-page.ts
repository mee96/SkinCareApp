import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit } from '@angular/core';
import { LucideAngularModule, Sun, Moon, Check } from 'lucide-angular';
import { Schedule } from '../../core/services/schedule';
import { StepDefApi } from '../../core/services/step-def';
import { StepLogApi } from '../../core/services/step-log';
import { StepDef } from '../../core/models/step-def';
import { AuthStore } from '../../core/stores/auth-store';

interface StepView extends StepDef {
  done: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  R: '💧 Retinal',
  C: '👁️ Contorn',
  H: '🌸 Hidratació',
  P: '🧖 Pegats',
};

@Component({
  selector: 'app-today-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  templateUrl: './today-page.html',
  styleUrl: './today-page.css',
})
export class TodayPage implements OnInit {
  private scheduleApi = inject(Schedule);
  private stepDefApi = inject(StepDefApi);
  private stepLogApi = inject(StepLogApi);
  private authStore = inject(AuthStore);

  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;
  readonly CheckIcon = Check;

  readonly today = new Date().toISOString().slice(0, 10);
  readonly loading = signal(true);
  readonly routineType = signal<string | null>(null);
  readonly steps = signal<StepView[]>([]);

  readonly typeLabel = computed(() => TYPE_LABELS[this.routineType() ?? ''] ?? '');
  readonly amSteps = computed(() => this.steps().filter((s) => s.moment === 'am'));
  readonly pmSteps = computed(() => this.steps().filter((s) => s.moment === 'pm'));
  readonly progress = computed(() => {
    const all = this.steps();
    const done = all.filter((s) => s.done).length;
    return { done, total: all.length };
  });
  readonly progressPct = computed(() => {
    const { done, total } = this.progress();
    return total ? Math.round((done / total) * 100) : 0;
  });

  readonly formattedDate = computed(() => {
    const date = new Date(this.today + 'T00:00:00');
    const formatted = date.toLocaleDateString('ca-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  });

  ngOnInit(): void {
    const uid = this.authStore.uid();
    if (!uid) {
      this.loading.set(false);
      return;
    }

    this.scheduleApi.getForDate(uid, this.today).subscribe({
      next: (days) => {
        const type = days[0]?.routine_type_code ?? null;
        this.routineType.set(type);

        if (!type) {
          this.loading.set(false);
          return;
        }

        this.stepDefApi.getByType(uid, type).subscribe({
          next: (defs) => {
            this.stepLogApi.getForDate(uid, this.today).subscribe({
              next: (logs) => {
                const doneIds = new Set(logs.map((l) => l.step_def_id));
                const merged: StepView[] = defs
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map((d) => ({ ...d, done: doneIds.has(d.id) }));
                this.steps.set(merged);
                this.loading.set(false);
              },
            });
          },
        });
      },
      error: () => this.loading.set(false),
    });
  }

  toggleStep(step: StepView): void {
    const uid = this.authStore.uid();
    if (!uid) return;

    this.stepLogApi.toggle(uid, this.today, step.id).subscribe({
      next: (result) => {
        this.steps.update((list) =>
          list.map((s) => (s.id === step.id ? { ...s, done: result.done } : s))
        );
      },
    });
  }
}