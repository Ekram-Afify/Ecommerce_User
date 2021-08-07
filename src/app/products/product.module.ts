import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import {MatCardModule} from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list'
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
   { path: '', component: ProductsComponent },
   { path: 'product-details/:id', component: ProductDetailsComponent }
];


@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    FormsModule,
    MatIconModule,

    RouterModule.forChild(routes),
    PaginationModule.forRoot()
  ]
})
export class ProductModule { }
