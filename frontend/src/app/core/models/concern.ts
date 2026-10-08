export type ConcernType =
  | 'grans' | 'rosacea' | 'arrugues' | 'iluminacio'
  | 'taques' | 'poros' | 'deshidratacio';

export interface Concern {
  id: number;
  user_id: string;
  concern_type: ConcernType;
  priority: number;
  created_at: string;
}