import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { AuthGuardService } from 'src/app/orders/auth-guard.service';
import { PagingModel } from '../models/paging';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isAuthorized:boolean=false;
  pageNumber: number = 1;
  categoryId: number = -1;
  pagination: PagingModel | undefined ;
  constructor( private _cartService: CartService,private _productService: ProductService, private _router: Router,private _authService: AuthGuardService ) { }

  ngOnInit(): void {
    
   this.isAuthorized=this._authService.gettoken()
    this.loadProducts(this.pageNumber, this.categoryId);
  }

  loadProducts(pageNumber: number, category:number){
    this._productService.getProducts(pageNumber,category).subscribe(res => {
      this.products = res.items;
      this.pagination = {currentPage: res.currentPage, totalPages: res.totalPages, totalItems:res.totalItems};
      console.log(this.pagination);
      this.checkCartItems();
    })
  }

  ViewDetails(id:number)
  {
    this._router.navigate(['/product-details/'+id]);
  }

  AddToCard(product: Product)
  {  
    product.addedtocart=true;
    product.selectedQt=1;
    this._cartService.addProduct(product)
    // if( this.isAuthorized)
    // {
     
    // }
    // else{
    //   this._router.navigate(['/user/login']);
    // }
   

  }


  
removeFromCart(product: Product) {
  product.addedtocart = false;
  this._cartService.removeProduct(product.id);
 
}
  pageChanged(event:any){
    this.pageNumber = event.page;
    this.loadProducts(this.pageNumber,this.categoryId);
    
  }

 checkCartItems()
 {
   let cartItems=this._cartService.getItems();
   this.products.forEach(prod => {
     if( cartItems.find(i=>i.id==prod.id))
     {
      prod.addedtocart=true;
     }
    
   });
 }

}
