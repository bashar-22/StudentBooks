import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from '../../../services/jarwis.service';
import * as $AB from 'jquery';
import 'bootstrap'; 
import * as bootstrap from 'bootstrap';


interface ErrorObject {
  email?: string[];
  password?: string[];
  password_confirmation?:string[];

}
@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent {
  public error:ErrorObject= {};
  public form = {
    email : null,
    password : null,
    password_confirmation:null,
    resetToken :null
  }

  isModalVisible = false;
  constructor(
    private route:ActivatedRoute,
    private Jarwis: JarwisService,
    private router:Router,
   
  ) { 
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token']
    });
  }

  onSubmit(){
    this.Jarwis.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
   }

  
 

  handleError(error:any){
    this.error = error.error.errors;
   
  }

  handleResponse(data:any) {
   
    ($('#confirmationModal') as any) .modal('show');
  }

  redirectToLogin() {
    this.router.navigateByUrl('/login');
    ($('#confirmationModal') as any).modal('hide');
  }

  ngOnInit() {
  }
}
