import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { AuthGuardService } from 'src/app/orders/auth-guard.service';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  isAuthorized: any;

  constructor( private _cartService: CartService,private _productService: ProductService, private _route: ActivatedRoute,private _router: Router,private _authService: AuthGuardService ) { }

  ngOnInit(): void {
    this.isAuthorized=this._authService.gettoken()
    let productId = this._route.snapshot.paramMap.get('id');
    if(productId)
    {
      this.GetProduct(+productId);
    }
   
  
  }

  GetProduct(id:number){
    this._productService.getProductById(id).subscribe(res=>{
      this.product = res;
      console.log(this.product)
    });
      this.checkCartItem(this.product);  
  }


  AddToCard(product: Product)
  {  
    product.addedtocart=true;
    product.selectedQt=1;
    this._cartService.addProduct(product)
   
   

  }


  
removeFromCart(product: Product) {
  product.addedtocart = false;
  this._cartService.removeProduct(product.id);
 
}

 checkCartItem(prod:Product)
 {
   let cartItems=this._cartService.getItems();
   
     if( cartItems.find(i=>i.id==prod.id))
     {
      prod.addedtocart=true;
     }

 }
 Back()
 {
  this._router.navigate(['/']);
 }

}
