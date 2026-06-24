import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit } from '@angular/core';
import { Schedule } from '../../core/services/schedule';
import { StepDefApi } from '../../core/services/step-def';
import { StepLogApi } from '../../core/services/step-log';
import { StepDef } from '../../core/models/step-def';

interface StepView extends StepDef {
  done: boolean;
}

const USER_ID = 'test-uid-001'; // TODO: vindrà de l'AuthStore quan tinguem login

@Component({
  selector: 'app-today-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './today-page.html',
  styleUrl: './today-page.css',
})
export class TodayPage implements OnInit {
  private scheduleApi = inject(Schedule);
  private stepDefApi = inject(StepDefApi);
  private stepLogApi = inject(StepLogApi);

  readonly today = new Date().toISOString().slice(0, 10);
  readonly loading = signal(true);
  readonly routineType = signal<string | null>(null);
  readonly steps = signal<StepView[]>([]);

  readonly amSteps = computed(() => this.steps().filter((s) => s.moment === 'am'));
  readonly pmSteps = computed(() => this.steps().filter((s) => s.moment === 'pm'));
  readonly progress = computed(() => {
    const all = this.steps();
    const done = all.filter((s) => s.done).length;
    return { done, total: all.length };
  });

  ngOnInit(): void {
    this.scheduleApi.getForDate(USER_ID, this.today).subscribe({
      next: (days) => {
        const type = days[0]?.routine_type_code ?? null;
        this.routineType.set(type);

        if (!type) {
          this.loading.set(false);
          return;
        }

        this.stepDefApi.getByType(USER_ID, type).subscribe({
          next: (defs) => {
            this.stepLogApi.getForDate(USER_ID, this.today).subscribe({
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
    this.stepLogApi.toggle(USER_ID, this.today, step.id).subscribe({
      next: (result) => {
        this.steps.update((list) =>
          list.map((s) => (s.id === step.id ? { ...s, done: result.done } : s))
        );
      },
    });
  }
}