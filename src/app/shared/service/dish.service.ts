import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private http: HttpClient) {}

  getDishes() {
    const dishes: any = this.http.get('http://localhost:8080/dishes');
    console.log('getDishes');
    return dishes;
  }

  getDish(id: number) {
    return this.http.get(`/dishes/${id}`);
  }

  addDish(dish: any) {
    return this.http.post('/dishes', dish);
  }

  updateDish(dish: any) {
    return this.http.put(`dishes/${dish.id}`, dish);
  }

  deleteDish(id: number) {
    return this.http.delete(`dishes/${id}`);
  }
}
