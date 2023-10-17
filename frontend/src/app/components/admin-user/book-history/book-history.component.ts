import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-book-history',
  templateUrl: './book-history.component.html',
  styleUrls: ['./book-history.component.css']
})
export class BookHistoryComponent {
  email: string = ''; // Bind to email input field
  fromDate: string = '';
  toDate:string='';
  public books: any[] = []; 

   errorMessage: string | null = null;
   currentPage = 1;
   totalPages = 1;

   constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private errorMessageService:ErrorMessageService,
    private Auth: AuthService,
  ) {
  
   }
   
   ngOnInit() {
    this.Auth.redirectIfNotAdmin();
    this.startShowBooksInLogs();
    

   }

   private startShowBooksInLogs() {
    // for error message
    this.errorMessageService.errorMessageStream.subscribe(message => {
      this.errorMessage = message;
      if (this.errorMessage) {
        setTimeout(() => {
          this.errorMessage = null;
          this.errorMessageService.setErrorMessage(null);
        }, 2000); // Hide the message after 2 seconds
      }
    });
  
    this.getBooksData();
  }


  getBooksData()
  {

   const token = this.Token.get();
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
   this.Jarwis.searchLogs(headers,this.currentPage ,this.email,this.fromDate,this.toDate).subscribe(
    (response: any) => {
      this.books = response.data;  // Assign the 'data' property to the 'books' array
      this.totalPages = response.last_page;
      this.currentPage = response.current_page;
     
    },
    (error: any) => {
      console.log(error);
      if(error.status===401)
      {
      this.Auth.logout();

      }  
      if (error.error && error.error.errors) {
        this.errorMessageService.setErrorMessage(Object.values(error.error.errors).flat().map((errorValue) => String(errorValue)).join('\n'));
        } else {
          this.errorMessageService.setErrorMessage ('An error occurred. Please try again later.');
        }
    }
   );
   
  }
  searchInLogs()
  {
    this.currentPage = 1;
    this.getBooksData();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
        this.getBooksData();
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getBooksData();
    }
  }
}
