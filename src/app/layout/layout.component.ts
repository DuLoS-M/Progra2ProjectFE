import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { MenubarModule } from 'primeng/menubar';

import { AvatarModule } from 'primeng/avatar';


@Component({
  selector: 'app-layout',
  standalone: true,
    imports: [
    RouterModule ,
    MenubarModule,
    AvatarModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  menuItems = [
    {label: 'Home', icon: 'pi pi-home', routerLink: '/home'},
    {label: 'About', icon: 'pi pi-info', routerLink: '/about'},
    {label: 'Dish', icon: 'pi pi-list', routerLink: '/dish'},
    {label: 'Inventory', icon: 'pi pi-list', routerLink: '/inventory'},
    {label: 'Orders', icon: 'pi pi-list', routerLink: '/orders'},
    {label: 'News', icon: 'pi pi-list', routerLink: '/news'},
  ];
}
