
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'coffee' | 'tea' | 'dessert' | 'savory';
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum Category {
  Coffee = 'coffee',
  Tea = 'tea',
  Dessert = 'dessert',
  Savory = 'savory'
}
