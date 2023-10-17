import { Component } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';
import * as $AB from 'jquery';
import 'bootstrap'; 
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent {

  public form = {
    email: null
  };
  constructor(
    private Jarvis: JarwisService,
   
  ) { }
  ngOnInit() {
  }
  onSubmit() {
    $('#sendingToast').toast('show'); // Show the sending toast
    //this.startToastTimer(); 
    this.Jarvis.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleResponseError(error)
    );
  }
  handleResponse(res: any) {
    $('#responseToast .toast-body').text(res.data);
    $('#responseToast').toast('show');

    this.form.email = null;
  }
  handleResponseError(error: any) {
    
    $('#sendingToast').toast('hide'); // Hide the sending toast
    
    $('#errorToast .toast-body').text(error.error.error);
    $('#errorToast').toast('show');
  }

}
