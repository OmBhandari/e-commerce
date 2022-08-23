import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { OrdersComponent } from './orders/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DashboardComponent,
    CategoriesComponent,
    CategoryComponent,
    ProductsComponent,
    ProductComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule
  ]
})
export class AdminModule { }
