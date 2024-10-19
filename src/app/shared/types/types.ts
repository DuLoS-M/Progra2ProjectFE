export interface Ingredient {
  id?: number;
  name: string;
  quantity: number;
  unit: string;
}

export interface User {
  id?: number | string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  nit: string;
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

export interface OrderDetail {
  id: number;
  dishId: number;
  dishName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  customerName: string;
  orderDate: string; // Use string to represent date in ISO format
  totalAmount: number;
  status: string;
  orderDetails: OrderDetail[];
  userName: string;
  userEmail: string;
  orderNumber: number;
}
