export type SkinType = 'mixta' | 'grassa' | 'seca' | 'normal' | 'sensible';

export interface User {
  firebase_uid: string;
  email: string;
  display_name: string | null;
  skin_type: SkinType | null;
  created_at: string;
  updated_at: string;
}