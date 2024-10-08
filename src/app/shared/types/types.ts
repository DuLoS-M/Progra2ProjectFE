export interface Ingredient {
  id?: number;
  name: string;
  quantity: number;
  unit: string;
}

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface LoginUser {
  email: string;
  password: string;
  role: string;
}

export interface News {
  id?: number;
  title: string;
  content: string;
  photoUrl?: string | File;
  // publishedAt: Date;
  // updatedAt: Date;
}

export interface Dish {
  id?: number;
  name: string;
  description: string;
  price: number;
  photoUrl?: string | File;
  ingredients: Ingredient[];
  dishIngredients?: any[];
}
