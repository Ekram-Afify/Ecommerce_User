import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Product } from './models/product';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  endPoint = 'http://localhost:60108/product';

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getProducts(pageNumber:number, category:number): Observable<any> {    
    return this.httpClient.get<any>(this.endPoint + '/getproducts?pageNumber='+pageNumber+'&categoryId='+category+'&pageSize=20')
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

   getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.endPoint + '/GetProductById/'+id)
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
    console.log(msg);
    return throwError(msg);
  }
}
