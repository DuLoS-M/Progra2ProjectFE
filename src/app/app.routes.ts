import { Routes } from '@angular/router';
import { LoginComponent } from './admin/auth/login.component';
import { DishFormComponent } from './admin/dish-form/dish-form.component';
import { DishListComponent } from './admin/dish-list/dish-list.component';
import { InventoryFormComponent } from './admin/inventory/inventory-form/inventory-form.component';
import { InventoryListComponent } from './admin/inventory/inventory-list/inventory-list.component';
import { NewsFormComponent } from './admin/news/news-form/news-form.component';
import { NewsListComponent } from './admin/news/news-list/news-list.component';
import { OrderListComponent } from './admin/orders/order-list/order-list.component';
import { OrdersDetailComponent } from './admin/orders/orders-detail/orders-detail.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'dish/create', component: DishFormComponent },
            { path: 'dish', component: DishListComponent },
            { path: 'dish/create', component: DishFormComponent },
            { path: 'inventory/form', component: InventoryFormComponent },
            { path: 'inventory', component: InventoryListComponent },
            { path: 'news/form', component: NewsFormComponent },
            { path: 'news', component: NewsListComponent },
            { path: 'orders', component: OrderListComponent },
            { path: 'orders/:id', component: OrdersDetailComponent },
            { path: 'profile', component: ProfileComponent },
        ]
    },
    { path: '**', redirectTo: 'login' }
];