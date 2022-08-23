import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:"", component:DashboardComponent},
  {path:"category/:id", component:CategoryComponent},
  {path:"categories", component:CategoriesComponent},
  {path:"product/:id", component:ProductComponent},
  {path:"products", component:ProductsComponent},
  {path:"orders", component:OrdersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
