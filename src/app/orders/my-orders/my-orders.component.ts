import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/products/models/product';
import { OrderViewModel } from '../models/order-create-view-model';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders:OrderViewModel[]=[];
  count: number=0;
  totalamount:number=0;
  constructor(private orderService:OrdersService) { }

  ngOnInit(): void {
    this.LoadMyOrders();
  }

  LoadMyOrders()
  {
    this.orderService.getMyOrders().subscribe(res=>{

     this.orders=res;
     this.count=this.orders.length;
     if(this.count>0)
     {
      this.calTotalAmount();
     }
  

    })


  }

  calTotalAmount()
  {
   this.orders.forEach(element => {
    this.totalamount +=element.price;
   });

   
  }

}
