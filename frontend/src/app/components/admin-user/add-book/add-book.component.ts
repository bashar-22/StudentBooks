import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { SuccessMessageService } from 'src/app/services/success-message.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  languages: string[] = ['English', 'Spanish', 'French', 'German','Italian', 'Other']; // Define the languages array
  newBook: any = {
    serial_number: null
  }; // Object to hold the new book data
  errorMessages: string[] = [];
  constructor(
    private jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private successMessageService: SuccessMessageService,
    private Auth: AuthService,
    
    ) {
    
  }
  ngOnInit() {
   this.Auth.redirectIfNotAdmin();

   }
  addBook(bookForm: NgForm) {
    if (bookForm.invalid) {
      // Form has validation errors, don't proceed with submission
      return;
    }

    const token = this.Token.get();
    
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    

    // Send the newBook data to the backend using your service
    this.jarwis.addBook(headers,this.newBook).subscribe(
      (response: any) => {
        // Handle successful response if needed
        this.successMessageService.setSuccessMessage('Book added successfully');
        this.router.navigateByUrl('/books');
        this.errorMessages=[];
      },
      (error:any) => {

        if (error.status === 401) {
          this.Auth.logout();
         }
       
        // Handle error if needed
        if (error.error && error.error.errors) {
          this.errorMessages = Object.values(error.error.errors).flat().map((errorValue) => String(errorValue));
        } else {
          this.errorMessages = ['An error occurred. Please try again later.'];
        }
      }
    );
  
   
  }
  

}
