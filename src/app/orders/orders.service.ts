import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product } from '../products/models/product';
import { OrderCreateViewModel, OrderViewModel } from './models/order-create-view-model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  
  endPoint = 'http://localhost:60108/order';

  constructor(private httpClient: HttpClient) { 

  
  }



  AddOrder(order:OrderCreateViewModel[]): Observable<boolean> {
    debugger;
    return this.httpClient.post<boolean>(this.endPoint + '/add',order,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token") as string
      })
    }  
  )
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }
 
  getMyOrders(): Observable<OrderViewModel[]> {
    return this.httpClient.get<OrderViewModel[]>(this.endPoint + '/GetOrders',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token") as string
      })
    }  )
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
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
  //  console.log(msg);
    return throwError(msg);
  }
}
