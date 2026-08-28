export interface DayException {
  id: number;
  user_id: string;
  exception_date: string;
  note: string | null;
  custom_steps: string | null;
  created_at: string;
  updated_at: string;
}
