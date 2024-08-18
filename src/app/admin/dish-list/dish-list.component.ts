import { Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dish-list',
  standalone: true,
  imports: [DataViewModule,ButtonModule, CommonModule, RouterLink],
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.scss'
})
export class DishListComponent {
   products: any[] = [];

  ngOnInit() {
    this.products = [
      { name: 'Dish 1', category: 'Category 1', rating: 4.5, price: 10, inventoryStatus: 'INSTOCK' },
      { name: 'Dish 2', category: 'Category 2', rating: 3.8, price: 15, inventoryStatus: 'OUTOFSTOCK' },
      // Add more products as needed
    ];
  }
}
