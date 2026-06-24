export type RoutineTypeCode = 'R' | 'C' | 'H' | 'P';

export interface ScheduleDay {
  id: number;
  user_id: string;
  sched_date: string;
  routine_type_code: RoutineTypeCode;
}