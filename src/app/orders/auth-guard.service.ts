import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private subject = new BehaviorSubject<boolean>(this.hasAccessToken());
  constructor() { }
 
  gettoken(){  
    return !!localStorage.getItem("token");  
    }  

    hasAccessToken(): boolean {
      return (localStorage.getItem("token") != null && JSON.stringify(localStorage.getItem("token")).length > 0)
   } 
   isLogged(): Observable<boolean> {
    return this.subject.asObservable();
  }
  ChangeAuth(logged:boolean) {
    this.subject.next(logged);
  
  }
}
