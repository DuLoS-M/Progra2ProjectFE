import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Dish } from '../../shared/types/types';
import { DishService } from '../../shared/service/dish.service';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-dish-list',
  standalone: true,
  imports: [
    DataViewModule,
    ButtonModule,
    CommonModule,
    RouterLink,
    CardModule,
    ChipModule,
  ],
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.scss',
})
export class DishListComponent implements OnInit {
  constructor(private dishService: DishService) {}
  dishes: Dish[] = [];

  editDish(id: any) {}

  deleteDish(id: any) {
    this.dishService.deleteDish(id).subscribe(() => {
      this.dishes = this.dishes.filter((dish) => dish.id !== id);
    });
  }

  ngOnInit() {
    this.dishService.getDishList().subscribe((dishes) => {
      this.dishes = dishes;
    });
  }
}
