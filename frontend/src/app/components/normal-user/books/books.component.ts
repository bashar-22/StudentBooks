import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { SuccessMessageService } from 'src/app/services/success-message.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaders } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { ReserveBookDialogComponent } from '../../admin-user/reserve-book-dialog/reserve-book-dialog.component';
import { ReturnBookDialogComponent } from '../../admin-user/return-book-dialog/return-book-dialog.component';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private successMessageService: SuccessMessageService,
    private errorMessageService:ErrorMessageService,
    private Auth: AuthService,
    private dialog: MatDialog,
   
  ) {
  
   }

   public books: any[] = []; 
   successMessage: string | null = null;
 
   errorMessage: string | null = null;
   currentPage = 1;
   totalPages = 1;
   searchTerm = ''; // Property to store the search term
   isAdmin: boolean = false;
   
  

   ngOnInit() {
   
    this.Auth.authStatus.subscribe(value => {
  
      this.isAdmin = this.Auth.getUserType() === 'admin';
      
     
    });
    
    this.startShowBooks();

  }
  private startShowBooks() {
    this.successMessageService.successMessageStream.subscribe(message => {
      this.successMessage = message;
     
      setTimeout(() => {
        this.successMessage = null;
        this.successMessageService.setSuccessMessage(null);
      }, 2000);
    });

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
   this.Jarwis.getBooks(headers,this.currentPage ,this.searchTerm).subscribe(
    (response: any) => {
      this.books = response.data;  // Assign the 'data' property to the 'books' array
      this.totalPages = response.last_page;
      this.currentPage = response.current_page;
     
    },
    (error: any) => {
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

  searchBooks() {
    // Reset the current page when performing a new search
    this.currentPage = 1;

    this.getBooksData();
  }

  isReservationValid(reservationExpirationDate: Date): boolean {
    var currentDate = new Date();
    var expirDate=new Date(reservationExpirationDate);
   
    return expirDate> currentDate || (reservationExpirationDate === null );
  }


  deleteBook(bookId:number) {
    const token = this.Token.get();
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
      this.Jarwis.deleteBook(headers,bookId).subscribe((response: any) => {
        // Handle successful response if needed
        this.successMessageService.setSuccessMessage('Book deleted successfully');
        this.startShowBooks();
      
        
      },
      (error:any) => {
        // Handle error if needed
      
        if(error.status===401)
        {
         this.Auth.logout();

        }else if(error.status===403)
        {
          this.errorMessageService.setErrorMessage (error.error.error);
        }
        else if (error.error && error.error.errors) {
        this.errorMessageService.setErrorMessage(Object.values(error.error.errors).flat().map((errorValue) => String(errorValue)).join('\n'));
        } else {
          this.errorMessageService.setErrorMessage ('An error occurred. Please try again later.');
        }
        
        }
      );
  }
  reserveBook(bookId:number)
  {
    
    const dialogRef = this.dialog.open(ReserveBookDialogComponent, {
      width: '450px', // Customize the dialog width
      data: { bookId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result==='success') {
       // reload the books 
       this.startShowBooks();
      }
    });
   
  }
  returnBook(bookId:number)
  {
  
    const dialogRef = this.dialog.open(ReturnBookDialogComponent, {
      width: '450px', // Customize the dialog width
      data: { bookId }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result==='success') {
       // reload the books 
       this.startShowBooks();
      }
    });
  }

 

}
