export type SlotId =
  | 'oil-cleanser' | 'water-cleanser' | 'toner' | 'essence' | 'treatment-serum'
  | 'retinoid' | 'eye' | 'moisturizer' | 'exfoliant' | 'spf';

export interface Product {
  id: number;
  user_id: string;
  name: string;
  brand: string | null;
  slot_id: SlotId;
  in_stock: boolean;
  opened_at: string | null;
  created_at: string;
}