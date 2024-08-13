// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './admin/auth/login.component';
import { InventoryListComponent } from './admin/inventory/inventory-list/inventory-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // other components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
})
export class AppModule { }