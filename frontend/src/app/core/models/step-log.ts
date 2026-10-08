export interface StepLog {
  id: number;
  user_id: string;
  log_date: string;
  step_def_id: number;
  done_at: string;
}

export interface ToggleResult {
  done: boolean;
  step_def_id: number;
  log_date: string;
}