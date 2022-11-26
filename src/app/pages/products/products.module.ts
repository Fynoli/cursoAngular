import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button"
import {MatIconModule} from "@angular/material/icon";
import {ProductComponent} from "./product/product.component";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ProductsModule { }
