export interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  ingredients: string[];
  price: number;
  imageUrl: string;
  isRecommended?: boolean;
  isVeg: boolean;
}
