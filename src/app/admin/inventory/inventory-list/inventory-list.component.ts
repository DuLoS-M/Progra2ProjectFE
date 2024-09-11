import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AsyncPipe, CommonModule } from '@angular/common';
import { InventoryService } from '../../../shared/service/inventory.service';
import type { Ingredient } from '../../../shared/types/types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss',
  styles: [
    `
      .outofstock {
        font-weight: 700;
        color: #ff5252;
        text-decoration: line-through;
      }

      .lowstock {
        font-weight: 700;
        color: #ffa726;
      }

      .instock {
        font-weight: 700;
        color: #66bb6a;
      }

      :host ::ng-deep .row-accessories {
        background-color: rgba(0, 0, 0, 0.15) !important;
      }
    `,
  ],
  standalone: true,
  imports: [TableModule, CommonModule, AsyncPipe, RouterLink],
  providers: [InventoryService],
})
export class InventoryListComponent implements OnInit {
  ingredients!: Ingredient[];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.getInventoryList().subscribe((data) => {
      this.ingredients = data;
    });
  }
}
