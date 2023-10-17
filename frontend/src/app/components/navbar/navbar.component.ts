import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public loggedIn: boolean=false;
  public username:any;
  isAdmin: boolean = false; // Set this based on the user type

  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService,
    
    
  
  ) { 
   
  }


  ngOnInit() {
    
    this.Auth.authStatus.subscribe(value => {
      this.loggedIn = value;
      this.username=this.Auth.getUsername();
      this.isAdmin = this.Auth.getUserType() === 'admin';
     
    });
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Auth.logout();
  }
  onAddBookClick() {
    this.router.navigateByUrl('/add-book');
  }

}
