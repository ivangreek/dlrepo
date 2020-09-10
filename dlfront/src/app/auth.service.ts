import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser$: BehaviorSubject<Parse.User>;
  
  constructor( ) { 
    this.currentUser$ = new BehaviorSubject(Parse.User.current());
  }

  login(username: string, password: string) {
    return Parse.User.logIn(username, password).then(user=>{
      this.currentUser$.next(user);
      return new Promise((resolve) => {
        resolve(user);
      });
    });
  }

  logOut(){
    Parse.User.logOut().then(()=>{
      this.currentUser$.next(Parse.User.current());
    });
  }

  getCurrentUser$(): Observable<Parse.User>{
    return this.currentUser$.asObservable();
  }

  public get currentUserValue(): Parse.User {
    return this.currentUser$.value;
  }

  public get isAuthenticated(): boolean {
    return (this.currentUser$.value != null);
  }
}
