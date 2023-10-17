import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Token: TokenService,private router: Router) { }
 



  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  
  }

  setUsername(username:any) {
    localStorage.setItem('username', username);
   
  }
  clearUsername()
  {
    localStorage.removeItem('username');
  }
  getUsername() {
    
   return localStorage.getItem('username');
    
  }
  setUserType(userType:any) {
    localStorage.setItem('userType', userType);
   
  }
  getUserType() {
    
    return localStorage.getItem('userType');
     
   }
   clearUserType()
   {
     localStorage.removeItem('userType');
   }

  logout() {
  
    this.Token.remove();
    // not logged in anymore
    this.clearUsername();
    this.clearUserType();
    this.changeAuthStatus(false);
    this.router.navigateByUrl('/login');

}
redirectIfNotAdmin()
{


  if(this.getUserType()!=='admin')
  {
    this.router.navigateByUrl('/profile');
  }
}
   
}
