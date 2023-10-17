import { Component } from '@angular/core';

import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
//import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public error:string|null = null;
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
   
   
  ) { }

  public form = {
    email: null,
    password: null
  };

  onSubmit() {
  
    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponse(data),
      error =>this.handleError(error),
      
    );
    
  }
  handleResponse(data:any) {
    this.Token.handle(data.access_token);
    this.Auth.setUsername(data.username);
   
    this.Auth.setUserType(data.user_type);

    this.Auth.changeAuthStatus(true);
   
    // if everything is ok then after login navigate to profile
    this.router.navigateByUrl('/profile');
   
  }
  handleError(error:any) {
    
   
  if(error.status===401)
  {
    this.error = error.error.error;
  }
  else if(error.status===500)
  {
    this.error="Connection Error, please try again later!";
  }
  else
  {
    this.error="An error occured, please try again later!";
  }
   
  }

  

}
