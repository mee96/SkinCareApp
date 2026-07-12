export interface WishlistItem {
  id: number;
  user_id: string;
  product_name: string;
  brand: string | null;
  slot_id: string | null;
  added_at: string;
}
