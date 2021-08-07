import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/product.module')
      .then(mod => mod.ProductModule)
  },
  
  {
    path: 'user',
    loadChildren: () => import('./users/users.module')
      .then(mod => mod.UsersModule)
  },
  
  {
    path: 'orders',
    loadChildren: () => import('./orders/order.module')
      .then(mod => mod.OrderModule)
  },

  {
    path: '',
    loadChildren: () => import('./products/product.module')
      .then(mod => mod.ProductModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
