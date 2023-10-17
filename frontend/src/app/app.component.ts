import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Library';

  constructor(private router: Router, private titleService: Title, private Token: TokenService) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
    // this will redirect the user to profile if they are loggedin 
     if(this.Token.loggedIn())
    {
     
      this.router.navigateByUrl('/profile');
    }

   }

  isRootRoute(): boolean {
    return this.router.url === '/';
  }
}
