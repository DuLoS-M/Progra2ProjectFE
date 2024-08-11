import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule


@Component({
  selector: 'app-layout',
  standalone: true,
    imports: [
    RouterModule // Ensure RouterModule is imported
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
