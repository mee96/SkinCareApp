import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { LucideAngularModule, ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';
import { Schedule } from '../../core/services/schedule';
import { DayExceptionService } from '../../core/services/day-exception.service';
import { AuthStore } from '../../core/stores/auth-store';
import { RoutineTypeCode } from '../../core/models/schedule';
import { DayException } from '../../core/models/day-exception';

interface CalendarCell {
  date: string;
  dayNumber: number;
  type: RoutineTypeCode | null;
  hasException: boolean;
}

const MONTH_NAMES = [
  'Gener',
  'Febrer',
  'Març',
  'Abril',
  'Maig',
  'Juny',
  'Juliol',
  'Agost',
  'Setembre',
  'Octubre',
  'Novembre',
  'Desembre',
];

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.css',
})
export class CalendarPage implements OnInit {
  private scheduleApi = inject(Schedule);
  private dayExceptionService = inject(DayExceptionService);
  private authStore = inject(AuthStore);

  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronRightIcon = ChevronRight;
  readonly PencilIcon = Pencil;
  readonly Trash2Icon = Trash2;

  readonly today = new Date().toISOString().slice(0, 10);

  readonly loading = signal(true);
  readonly viewYear = signal(new Date().getFullYear());
  readonly viewMonth = signal(new Date().getMonth());
  readonly days = signal<Map<string, RoutineTypeCode>>(new Map());
  readonly exceptions = signal<Map<string, DayException>>(new Map());
  readonly selectedDate = signal<string | null>(null);
  readonly showExceptionForm = signal<string | null>(null);
  readonly exceptionNote = signal('');

  readonly monthLabel = computed(() => `${MONTH_NAMES[this.viewMonth()]} ${this.viewYear()}`);

  readonly cells = computed<CalendarCell[]>(() => {
    const year = this.viewYear();
    const month = this.viewMonth();
    const daysMap = this.days();
    const excMap = this.exceptions();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: CalendarCell[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      cells.push({
        date,
        dayNumber: day,
        type: daysMap.get(date) ?? null,
        hasException: excMap.has(date),
      });
    }
    return cells;
  });

  readonly leadingBlankCells = computed(() => {
    const firstWeekday = new Date(this.viewYear(), this.viewMonth(), 1).getDay();
    const blanks = (firstWeekday + 6) % 7; // dilluns = primer dia
    return Array.from({ length: blanks }, (_, i) => i);
  });

  readonly showModal = computed(() => this.selectedDate() !== null);

  readonly typeOptions: { code: RoutineTypeCode; label: string; cssClass: string }[] = [
    { code: 'R', label: 'today.types.R', cssClass: 'type-R' },
    { code: 'C', label: 'today.types.C', cssClass: 'type-C' },
    { code: 'H', label: 'today.types.H', cssClass: 'type-H' },
    { code: 'P', label: 'today.types.P', cssClass: 'type-P' },
  ];

  ngOnInit(): void {
    this.loadMonth();
  }

  loadMonth(): void {
    const uid = this.authStore.uid();
    if (!uid) {
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    const year = this.viewYear();
    const month = this.viewMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const start = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    const end = `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

    forkJoin({
      schedule: this.scheduleApi.getForRange(uid, start, end),
      exceptions: this.dayExceptionService.getForRange(uid, start, end),
    }).subscribe({
      next: ({ schedule, exceptions }) => {
        const daysMap = new Map<string, RoutineTypeCode>();
        schedule.forEach((day) => daysMap.set(day.sched_date, day.routine_type_code));

        const excMap = new Map<string, DayException>();
        exceptions.forEach((exception) => excMap.set(exception.exception_date, exception));

        this.days.set(daysMap);
        this.exceptions.set(excMap);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  prevMonth(): void {
    let year = this.viewYear();
    let month = this.viewMonth() - 1;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
    this.viewYear.set(year);
    this.viewMonth.set(month);
    this.loadMonth();
  }

  nextMonth(): void {
    let year = this.viewYear();
    let month = this.viewMonth() + 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
    this.viewYear.set(year);
    this.viewMonth.set(month);
    this.loadMonth();
  }

  openDay(date: string): void {
    this.selectedDate.set(date);
  }

  closeModal(): void {
    this.selectedDate.set(null);
  }

  assignType(code: RoutineTypeCode): void {
    const date = this.selectedDate();
    const uid = this.authStore.uid();
    if (!date || !uid) return;

    this.days.update((map) => {
      const next = new Map(map);
      next.set(date, code);
      return next;
    });

    this.scheduleApi.upsert(uid, date, code).subscribe();
  }

  openExceptionForm(date: string): void {
    this.showExceptionForm.set(date);
    this.exceptionNote.set(this.exceptions().get(date)?.note ?? '');
  }

  closeExceptionForm(): void {
    this.showExceptionForm.set(null);
  }

  saveException(): void {
    const date = this.showExceptionForm();
    const uid = this.authStore.uid();
    if (!date || !uid) return;

    this.dayExceptionService.upsert(uid, date, this.exceptionNote().trim() || null).subscribe({
      next: (exception) => {
        this.exceptions.update((map) => {
          const next = new Map(map);
          next.set(date, exception);
          return next;
        });
        this.showExceptionForm.set(null);
      },
    });
  }

  deleteException(date: string): void {
    const exception = this.exceptions().get(date);
    if (!exception) return;

    this.dayExceptionService.delete(exception.id).subscribe({
      next: () => {
        this.exceptions.update((map) => {
          const next = new Map(map);
          next.delete(date);
          return next;
        });
      },
    });
  }
}
