import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule
import { MenubarModule } from 'primeng/menubar';

import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';

import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, MenubarModule, AvatarModule, MenuModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  menuItems = [
    // { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
    // { label: 'About', icon: 'pi pi-info', routerLink: '/about' },
    { label: 'Dish', icon: 'pi pi-list', routerLink: '/dish' },
    { label: 'Inventory', icon: 'pi pi-list', routerLink: '/inventory' },
    { label: 'Orders', icon: 'pi pi-list', routerLink: '/orders' },
    { label: 'News', icon: 'pi pi-list', routerLink: '/news' },
    { label: 'Users', icon: 'pi pi-list', routerLink: '/users' },
  ];

  profileMenuItems: MenuItem[];

  constructor(private router: Router) {
    this.profileMenuItems = [
      {
        label: 'My profile',
        icon: 'pi pi-user',
        command: () => this.router.navigate(['/profile']),
      },
      {
        label: 'Log out',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
