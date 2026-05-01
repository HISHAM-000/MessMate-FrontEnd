export interface Mess {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  address: string;
  ownerId?: number;
}
