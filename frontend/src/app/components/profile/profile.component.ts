import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(
    private Auth: AuthService,

  ) { }
  userType: any; 
  ngOnInit() {
    
    // Access the userType property from the AuthService
    this.userType = this.Auth.getUserType();

  }

}
