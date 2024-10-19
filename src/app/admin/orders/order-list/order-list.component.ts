import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Order } from '../../../shared/types/types';
import { MessageService } from 'primeng/api';
import { OrderService } from '../../../shared/service/order.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [MessageService],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private messageService: MessageService
  ) {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  searchOrders(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value;
    if (searchTerm) {
      this.orderService.searchOrders(searchTerm).subscribe((orders) => {
        this.orders = orders;
      });
    } else {
      this.loadOrders();
    }
  }

  cancelOrder(orderId: number): void {
    this.orderService.updateOrderStatus(orderId, 'CANCELLED').subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Order cancelled successfully',
      });
      this.loadOrders();
    });
  }

  deliverOrder(orderId: number): void {
    this.orderService.updateOrderStatus(orderId, 'COMPLETED').subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Order completed successfully',
      });
      this.loadOrders();
    });
  }
}
