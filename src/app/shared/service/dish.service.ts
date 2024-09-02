import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private http: HttpClient) {}

  getDishes() {
    this.http.get('dishes').subscribe((data) => {
      console.log(data);
      return data;
    });
  }

  getDish(id: number) {
    return this.http.get(`dishes/${id}`).subscribe((data) => {
      console.log(data);
      return data;
    });
  }

  addDish(dish: any) {
    return this.http.post('dishes', dish).subscribe((data) => {
      console.log(data);
      return data;
    });
  }

  updateDish(dish: any) {
    return this.http.put(`dishes/${dish.id}`, dish).subscribe((data) => {
      console.log(data);
      return data;
    });
  }

  deleteDish(id: number) {
    return this.http.delete(`dishes/${id}`).subscribe((data) => {
      console.log(data);
      return data;
    });
  }
}
