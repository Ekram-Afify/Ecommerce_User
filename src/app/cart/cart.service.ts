import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product } from '../products/models/product';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subject = new BehaviorSubject<number>(this.getItems().length);
  //endPoint = 'http://localhost:60108/user';

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } ; 

  addProduct(product: Product) {
           
    let cart = this.getItems();
    console.log(cart)
    if (cart.filter(x => x.id == product.id).length <= 0) {
        
      let item ={id:product.id,price:product.price,description:product.description,
        name:product.name,image:product.image,newPrice:product.price,
        discountPercentage:0,addedtocart:product.addedtocart,
        selectedQt:product.selectedQt,stockQuantity:product.stockQuantity} as Product;
        cart.push(item);
    }
    else {
        
      
        this.removeProduct(product.id);
    }
    this.saveCart(cart);
}

  public saveCart(cart: Product[]): void {
        
    localStorage.setItem("cart", JSON.stringify(cart));
    let cart2 = this.getItems();
    console.log(cart2)
    this.changeCartLength(cart.length);
    
}
removeProduct(id: number) {

  debugger
  let cart = this.getItems();
  let itemIndex = cart.findIndex(x => x.id == id);
  if (itemIndex >= 0) {
      cart.splice(itemIndex, 1);
      this.saveCart(cart);
  }
}
changeCartLength(number:number) {
  this.subject.next(number);

}
getCartLength(): Observable<number> {
  return this.subject.asObservable();
}
getItems(): Product[] {

  let cartItems : Product[]=[];
  var items=localStorage.getItem("cart");

  if (items != null  && items !=""){
     
      cartItems =   JSON.parse(items!=null?items:"");;
  }

  return cartItems;

}

clearCart()
{
  localStorage.removeItem("cart");
}
  httpError(error:any) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }

}
