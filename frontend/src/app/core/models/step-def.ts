import { SlotId } from './product';

export type Moment = 'am' | 'pm';

export interface StepDef {
  id: number;
  user_id: string;
  routine_type_code: string;
  moment: Moment;
  slot_id: SlotId;
  product_id: number | null;
  sort_order: number;
  is_optional: boolean;
}