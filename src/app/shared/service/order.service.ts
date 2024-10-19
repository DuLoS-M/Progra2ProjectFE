import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`orders`);
  }

  searchOrders(searchTerm: string): Observable<Order[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<Order[]>(`orders/search`, { params });
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`orders/${orderId}/status`, { status });
  }
}
