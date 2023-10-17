import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { SuccessMessageService } from 'src/app/services/success-message.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent {
  bookId: number=0;
  editedBook: any = {};
  errorMessages: string[] = [];
  languages: string[] = ['English', 'Spanish', 'French', 'German','Italian', 'Other']; // Define the languages array
  constructor(private route: ActivatedRoute, 
    private http: HttpClient,
    private Token: TokenService,
    private jarwis: JarwisService,
    private router: Router,
    private successMessageService: SuccessMessageService,
    private activatedRoute: ActivatedRoute,
    private Auth: AuthService,
    
    ) {}

    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.bookId = params['id'];
        this.loadBookDetails();
      });

      this.Auth.redirectIfNotAdmin();
    }
  
    loadBookDetails()
  {
    this.activatedRoute.data.subscribe(data => {
     this.editedBook=data['editBookResolver'];
     
    });
  }
  updateBook(bookForm: NgForm)
  {
    if (bookForm.invalid) {
      // Form has validation errors, don't proceed with submission
      return;
    }

    const token = this.Token.get();
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.jarwis.updateBook(headers, this.bookId, this.editedBook).subscribe(
      (response: any) => {
        // Handle successful response if needed
        const successMessage = response['message'];
    if (successMessage) {
    this.successMessageService.setSuccessMessage(successMessage);
    }

        this.router.navigateByUrl('/books');
        this.errorMessages=[];
      },
      (error: any) => {
       
       // Handle error if needed
       if (error.status === 401) {
        this.Auth.logout();
       }

       if (error.error && error.error.errors) {
        this.errorMessages = Object.values(error.error.errors).flat().map((errorValue) => String(errorValue));
      } else {
        this.errorMessages = ['An error occurred. Please try again later.'];
      }
      }
    );

  }

 
  
}
