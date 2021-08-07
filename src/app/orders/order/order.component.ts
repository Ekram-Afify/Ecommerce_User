import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/products/models/product';
import { ProductService } from 'src/app/products/product.service';
import { OrdersService } from '../orders.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CartService } from 'src/app/cart/cart.service';
import { OrderCreateViewModel } from '../models/order-create-view-model';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  products:Product[]=[];
  orderSaved: boolean = false;
  totalPrice:number=0;
  quantity: number=1;
  isAuthorized: boolean=false;
  intailsum: number=0;
  constructor(private _route: ActivatedRoute, private _productService: ProductService,private _cartService: CartService,
             private _orderService: OrdersService,private _router:Router, private _snackBar: MatSnackBar,private _authService: AuthGuardService) { }

  ngOnInit(): void {
    this.isAuthorized=this._authService.gettoken()
    
    this.GetCartItems();
  }

  GetCartItems()
  {
    var cartItems=this._cartService.getItems();

    if(cartItems!=null)
    {
      this.products=cartItems;
      this.totalPrice=0;
      this.products.forEach(prod=>{
        this.CalcTotalPrice(prod.price,prod.selectedQt)
      });
    }
  }
  cancelOrder()
  {
    this._cartService.clearCart();
    this._cartService.changeCartLength(0);
    this._router.navigate(['/']);

  }
  purchase(){  
    debugger 
    if(this.isAuthorized){
    let orderItems:OrderCreateViewModel[]=[];
    this.products.forEach(prod=>
    {
       var item={productId:prod.id, quantity: prod.selectedQt};
       orderItems.push(item)
    }); 

    this._orderService.AddOrder(orderItems).subscribe(x=> {
      if(x){  
        this.openSnackBar('Order has been Created Successfully',':)');
        this._cartService.clearCart();
        this._cartService.changeCartLength(0);
        this._router.navigate(['orders/myorders']);
      }
      else
        this.openSnackBar('Error Occured',':(');
    },error=>{

      alert(error)
    }
    
    )
  }
  else{
    this._router.navigate(['/user/login']);
  }
  }

  openSnackBar(message: any, action: string) {
    this._snackBar.open(message, action);
  }

  CalcTotalPrice(Price:any,quantity:number)
  {
  
    this.totalPrice +=(quantity*Price);
   
  }
  CalcTotalPrice2()
  {
   
  this.totalPrice=0;
    this.products.forEach(prod=>{
      this.totalPrice +=(prod.selectedQt*prod.price);
    });
 
   
  }

  removeFromCart(product: Product) {
    this._cartService.removeProduct(product.id);
    
    this.GetCartItems();
  }
}
