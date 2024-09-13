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

export interface News {
  id?: number;
  title: string;
  content: string;
  photoUrl?: string | File;
  // publishedAt: Date;
  // updatedAt: Date;
}
