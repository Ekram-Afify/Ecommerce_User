import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { AuthGuardService } from 'src/app/orders/auth-guard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()
  isAuthorized:boolean=false;
  cartQTY: any;
  constructor(private router: Router,private _authService: AuthGuardService,private _cartService: CartService,private _router: Router) { }

  ngOnInit(): void {
    //this.isAuthorized=this._authService.gettoken();

    
    this._cartService.getCartLength().subscribe(res => {
      this.cartQTY = res;
  });
   this._authService.isLogged().subscribe(logged => {
    this.isAuthorized = logged;
    
});

  }
  login(){
    
    this.router.navigate(['/user/login']);
  }
 
  GoToCart() {

    this._router.navigate(['/orders/cart'])
  }
  logout(){
    this.cartQTY=0;
    this.isAuthorized=false;
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    this.router.navigate(['/user/login']);
  }
  
}
