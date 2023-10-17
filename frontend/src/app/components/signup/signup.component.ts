import { Component } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface ErrorObject {
  name?: string[];
  email?: string[];
  password?: string[];
  // Add more fields as needed
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public error:ErrorObject= {};
  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
   
  ) { }



  onSubmit() {
    console.log(this.form.name);
    this.Jarwis.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error =>this.handleError(error),
      
    );
  }
  handleError(error:any) {
    console.log(error);
    this.error = error.error.errors;
   
  }

  handleResponse(data:any) {

     // set the username
     this.Auth.setUsername(data.username);
     this.Auth.setUserType(data.user_type);
    this.Auth.changeAuthStatus(true);
   
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }


}
