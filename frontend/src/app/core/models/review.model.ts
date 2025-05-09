export interface Review {
  id: string;
  productId?: string;
  newsId?: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: Date;
}