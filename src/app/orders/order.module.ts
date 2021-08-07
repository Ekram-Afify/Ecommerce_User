import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import {MatFormFieldModule} from '@angular/material/form-field'
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthenticationGuard } from './authentication.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenInterceptor } from './add-token.interceptor';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';


const routes: Routes = [
  { path: 'cart', component: OrderComponent},
  { path: 'myorders', component: MyOrdersComponent,canActivate:[AuthenticationGuard]}
];

@NgModule({
  declarations: [
    OrderComponent,
    MyOrdersComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ]
})
export class OrderModule { }
