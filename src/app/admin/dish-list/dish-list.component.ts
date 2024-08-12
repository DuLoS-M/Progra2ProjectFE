import { Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-dish-list',
  standalone: true,
  imports: [DataViewModule],
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.scss'
})
export class DishListComponent {

}
