export interface ProductReview {
  id: number;
  user_id: string;
  product_id: number;
  rating: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
